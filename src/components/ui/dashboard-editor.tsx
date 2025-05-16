/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingData } from '~/contexts/loading';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { ElementField } from '~/lib/types';

export interface EditorPropsType {
    title: string;
    apiRoute?: string;
    entityData?: Record<string, [string, string][]>;
    element: any;
    setElement: (element: any) => void;
    fetchElement: () => Promise<void>;
    id: string | number;
    elementFields: ElementField[];
}

export default function EditorPage({
    title,
    apiRoute = `${title.toLowerCase()}s`,
    entityData: _entityData,
    element,
    setElement,
    fetchElement: _fetchElement,
    elementFields,
    id,
}: EditorPropsType) {
    const router = useRouter();
    const [error, setError] = useState<string | boolean>(false);
    const [entityData, setEntityData] = useState<
        Record<string, [string, string][]>
    >(_entityData ?? {});
    const { load } = LoadingData();

    const fetchElement = (callback?: (error?: any) => void | boolean) => {
        setError(false);
        load(_fetchElement, {
            then() {
                if (callback) {
                    const result = callback();
                    if (result) return;
                }
            },
            catch(error) {
                console.error('Error: ', error);
                if (callback) {
                    const result = callback(error);
                    if (result) return;
                }
                setError(`Failed to fetch ${title}`);
            },
        })();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchElement, []);

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

    const handleUpdate = load(
        () =>
            fetch(`/api/${apiRoute}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ ...element }),
                headers: { 'Content-Type': 'application/json' },
            }),
        {
            then(response) {
                if (response.ok) {
                    fetchElement(
                        (error) =>
                            !error && router.push(`/dashboard/${apiRoute}`)
                    );
                    setError(false);
                } else setError('Failed to update');
            },
            catch: () => setError('Failed to update'),
        }
    );

    const setField = (name: string, value: any) =>
        setElement({ ...element, [name]: value });

    const getField = (name: string) => element[name];

    if (!element) return <div></div>;
    else
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Edit {title}
                </h1>

                {error && (
                    <h1 className="text-red-500 opacity-90 text-center cursor-default">
                        {error || 'An Error Occurred!'}
                    </h1>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="cursor-default">
                            Edit {title} Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="grid gap-4 md:grid-cols-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate();
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
                                                entityData[field.entity]!
                                                    .length === 0
                                            }
                                        >
                                            {field.placeholder && (
                                                <option value="">
                                                    {field.placeholder}
                                                </option>
                                            )}
                                            {(!entityData[field.entity] ||
                                                entityData[field.entity]!
                                                    .length === 0) && (
                                                <option value="">...</option>
                                            )}
                                            {(
                                                entityData[field.entity] ?? []
                                            ).map(([choice, label]) => (
                                                <option
                                                    value={choice}
                                                    key={choice}
                                                >
                                                    {label}
                                                </option>
                                            ))}
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
                                            {field.choices.map(
                                                (choice, yndex) => (
                                                    <option
                                                        value={choice}
                                                        key={yndex}
                                                    >
                                                        {choice}
                                                    </option>
                                                )
                                            )}
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
                                                        | undefined) ??
                                                        Date.now()
                                                );
                                                const offset =
                                                    local.getTimezoneOffset();
                                                const localAdjusted = new Date(
                                                    local.getTime() -
                                                        offset * 60000
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
                                                              field.type ===
                                                              'date'
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
                                                        (field.type ===
                                                            'number' ||
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
                                                    : field.type === 'float'
                                                      ? '0.01'
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
                                    type="submit"
                                    className="w-full cursor-pointer"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
}
