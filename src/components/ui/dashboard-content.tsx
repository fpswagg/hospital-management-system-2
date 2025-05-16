/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { LoadingData } from '~/contexts/loading';
import type { ElementField } from '~/lib/types';

export interface ContentPropsType {
    title: string;
    addTitle?: string;
    addButton?: string;
    apiRoute?: string;
    entityData?: Record<string, [string, string][]>;
    list: any[];
    setList: (any: []) => void;
    fetchList: () => Promise<void>;
    elementFields: ElementField[];
    getElementFieldTexts: (
        element: any,
        entityData: Record<string, [string, string][]>
    ) => string[];
}

export default function ContentPage({
    title,
    addTitle,
    addButton,
    apiRoute = title.toLowerCase(),
    entityData: _entityData,
    list,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setList,
    fetchList: _fetchList,
    elementFields,
    getElementFieldTexts,
}: ContentPropsType) {
    const defaultData = Object.fromEntries(
        elementFields.map(function (field) {
            if (
                field.type === 'date' ||
                field.type === 'datetime' ||
                field.type === 'time'
            )
                return [
                    field.keyName,
                    field.defaultValue !== undefined
                        ? new Date(field.defaultValue).toISOString()
                        : undefined,
                ];
            else return [field.keyName, field.defaultValue];
        })
    );

    const [data, setData] = useState(defaultData);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | boolean>(false);
    const [entityData, setEntityData] = useState<
        Record<string, [string, string][]>
    >(_entityData ?? {});
    const router = useRouter();
    const { load } = LoadingData();

    const fetchList = (callback?: (error?: any) => void | boolean) => {
        setError(false);
        setFetching(true);
        void _fetchList()
            .then(() => {
                if (callback) {
                    const result = callback();
                    if (result) return;
                }
                setFetching(false);
            })
            .catch((error) => {
                console.error('Error: ', error);
                if (callback) {
                    const result = callback(error);
                    if (result) return;
                }
                setFetching(false);
                setError(`Could not fetch ${title}`);
            });
    };

    const setField = (
        name: string,
        value: (typeof elementFields)[number]['defaultValue']
    ) => setData({ ...data, [name]: value });

    const getField = (name: string) => data[name];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchList, []);

    useEffect(function () {
        const __entityData = {} as Record<string, [string, string][]>;

        void Promise.all(
            elementFields
                .filter((f) => f.type === 'entity')
                .map(async function (field) {
                    const res = await fetch(`/api/${field.entity}s`);
                    const data = (await res.json()) as any[];

                    __entityData[field.entity] = data.map((elt) => [
                        elt.id,
                        elt[field.labelField ?? 'name'],
                    ]);
                })
        ).then(() => setEntityData(__entityData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = load(
        () =>
            fetch(`/api/${apiRoute}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }),
        {
            then(response) {
                if (response.ok) {
                    fetchList((error) => !error && setData(defaultData));
                    setError(false);
                } else setError('Failed to add');
            },
            catch: () => setError('Failed to add'),
        }
    );

    const handleDelete = (id: string) =>
        load(() => fetch(`/api/${apiRoute}/${id}`, { method: 'DELETE' }), {
            then: (response) => {
                if (response.ok) {
                    fetchList((error) => !error && setData(defaultData));
                    setError(false);
                } else setError('Failed to delete');
            },
            catch: () => setError('Failed to delete'),
        })();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

            {error && (
                <h1 className="text-red-500 opacity-90 text-center cursor-default">
                    {error || 'An Error Occurred!'}
                </h1>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="cursor-default">
                        {addTitle ??
                            `Add a New ${title.substring(0, title.length - 1)}`}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        className="grid gap-4 md:grid-cols-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreate();
                        }}
                    >
                        {elementFields.map((field, index) =>
                            field.type === 'entity' ? (
                                <div
                                    className="flex flex-col space-y-2"
                                    key={index}
                                >
                                    <Label htmlFor={field.keyName}>
                                        {field.name}
                                    </Label>
                                    <select
                                        id={field.keyName}
                                        value={String(
                                            getField(field.keyName) ?? ''
                                        )}
                                        onChange={(e) =>
                                            setField(
                                                field.keyName,
                                                e.target.value || undefined
                                            )
                                        }
                                        required={!!field.required}
                                        className="border rounded px-3 py-2 appearance-none cursor-pointer"
                                        disabled={
                                            !entityData[field.entity] ||
                                            entityData[field.entity]!.length ===
                                                0
                                        }
                                    >
                                        {field.placeholder && (
                                            <option value="">
                                                {field.placeholder}
                                            </option>
                                        )}
                                        {(!entityData[field.entity] ||
                                            entityData[field.entity]!.length ===
                                                0) && (
                                            <option value="">...</option>
                                        )}
                                        {(entityData[field.entity] ?? []).map(
                                            ([choice, label]) => (
                                                <option
                                                    value={choice}
                                                    key={choice}
                                                >
                                                    {label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            ) : field.type === 'choice' ? (
                                <div
                                    className="flex flex-col space-y-2"
                                    key={index}
                                >
                                    <Label htmlFor={field.keyName}>
                                        {field.name}
                                    </Label>
                                    <select
                                        id={field.keyName}
                                        value={
                                            (getField(field.keyName) ??
                                                '') as string
                                        }
                                        onChange={(e) =>
                                            setField(
                                                field.keyName,
                                                e.target.value || undefined
                                            )
                                        }
                                        required={!!field.required}
                                        className="border rounded px-3 py-2 appearance-none cursor-pointer"
                                    >
                                        {field.placeholder && (
                                            <option value="">
                                                {field.placeholder}
                                            </option>
                                        )}
                                        {field.choices.map((choice, yndex) => (
                                            <option value={choice} key={yndex}>
                                                {choice}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : field.type === 'check' ? (
                                <div
                                    className="flex items-center space-x-2"
                                    key={index}
                                >
                                    <Label htmlFor={field.keyName}>
                                        {field.name}
                                    </Label>
                                    <input
                                        id={field.keyName}
                                        type="checkbox"
                                        checked={!!getField(field.keyName)}
                                        onChange={(e) =>
                                            setField(
                                                field.keyName,
                                                e.target.checked
                                            )
                                        }
                                        className="cursor-pointer"
                                    />
                                </div>
                            ) : field.type === 'date' ||
                              field.type === 'datetime' ||
                              field.type === 'time' ? (
                                <div
                                    className="flex flex-col space-y-2"
                                    key={index}
                                >
                                    <Label htmlFor={field.keyName}>
                                        {field.name}
                                    </Label>
                                    <input
                                        id={field.keyName}
                                        value={(() => {
                                            const local = new Date(
                                                (getField(field.keyName) as
                                                    | string
                                                    | undefined) ?? Date.now()
                                            );
                                            const offset =
                                                local.getTimezoneOffset();
                                            const localAdjusted = new Date(
                                                local.getTime() - offset * 60000
                                            );
                                            if (field.type === 'datetime')
                                                return localAdjusted
                                                    .toISOString()
                                                    .slice(0, 16);
                                            else if (field.type === 'date')
                                                return localAdjusted
                                                    .toISOString()
                                                    .slice(0, 10);
                                            else
                                                return localAdjusted
                                                    .toISOString()
                                                    .slice(11, 16);
                                        })()}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setField(
                                                field.keyName,
                                                value !== ''
                                                    ? new Date(
                                                          field.type === 'date'
                                                              ? `${value}T00:00`
                                                              : field.type ===
                                                                  'time'
                                                                ? `${new Date(0).toISOString().slice(0, 10)}T${value}`
                                                                : value
                                                      ).toISOString()
                                                    : undefined
                                            );
                                        }}
                                        placeholder={field.placeholder}
                                        required={!!field.required}
                                        type={
                                            field.type === 'datetime'
                                                ? 'datetime-local'
                                                : field.type
                                        }
                                        className="border rounded px-3 py-2 appearance-none cursor-pointer"
                                        min={
                                            'min' in field &&
                                            field.min !== undefined
                                                ? String(field.min)
                                                : undefined
                                        }
                                        max={
                                            'max' in field &&
                                            field.max !== undefined
                                                ? String(field.max)
                                                : undefined
                                        }
                                    />
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col space-y-2"
                                    key={index}
                                >
                                    <Label htmlFor={field.keyName}>
                                        {field.name}
                                    </Label>
                                    <Input
                                        id={field.keyName}
                                        value={
                                            (getField(field.keyName) ??
                                                '') as string
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (
                                                field.type !== 'phone' ||
                                                /^(\+|\d)[0-9 ]*$/.test(
                                                    value
                                                ) ||
                                                !value
                                            )
                                                setField(
                                                    field.keyName,
                                                    (field.type === 'number' ||
                                                        field.type ===
                                                            'float') &&
                                                        value !== ''
                                                        ? Number(value)
                                                        : value || undefined
                                                );
                                        }}
                                        placeholder={field.placeholder}
                                        required={!!field.required}
                                        type={
                                            field.type === 'number' ||
                                            field.type === 'float'
                                                ? 'number'
                                                : field.type === 'email'
                                                  ? 'email'
                                                  : 'text'
                                        }
                                        step={
                                            'step' in field &&
                                            field.step !== undefined
                                                ? String(field.step)
                                                : undefined
                                        }
                                        min={
                                            'min' in field &&
                                            field.min !== undefined
                                                ? String(field.min)
                                                : undefined
                                        }
                                        max={
                                            'max' in field &&
                                            field.max !== undefined
                                                ? String(field.max)
                                                : undefined
                                        }
                                    />
                                </div>
                            )
                        )}
                        <div className="flex items-end">
                            <Button
                                className="w-full cursor-pointer disabled:cursor-default"
                                disabled={fetching}
                                type="submit"
                            >
                                {fetching
                                    ? 'Loading...'
                                    : (addButton ??
                                      `Add ${title.substring(0, title.length - 1)}`)}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {fetching ? (
                <Card>
                    <CardContent className="cursor-default">
                        Loading...
                    </CardContent>
                </Card>
            ) : (
                <ul className="space-y-4">
                    {list.map((p: any) => (
                        <Card key={p.id}>
                            <CardContent className="flex justify-between items-center cursor-default">
                                <div>
                                    {getElementFieldTexts(p, entityData).map(
                                        (text, index) => (
                                            <p
                                                className={
                                                    index === 0
                                                        ? 'font-medium text-lg'
                                                        : 'text-sm text-gray-500'
                                                }
                                                key={index}
                                            >
                                                {text}
                                            </p>
                                        )
                                    )}
                                </div>
                                <div className="flex space-x-3">
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/${apiRoute}/${p.id}`
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(String(p.id))
                                        }
                                        className="cursor-pointer"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </ul>
            )}
        </div>
    );
}
