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
    list: any[];
    setList: (any: []) => void;
    fetchList: () => Promise<void>;
    elementFields: ElementField[];
    getElementFieldTexts: (element: any) => string[];
}

export default function ContentPage({
    title,
    addTitle,
    addButton,
    apiRoute = title.toLowerCase(),
    list,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setList,
    fetchList: _fetchList,
    elementFields,
    getElementFieldTexts,
}: ContentPropsType) {
    const [data, setData] = useState(
        Object.fromEntries(
            elementFields.map((field) => [field.keyName, field.defaultValue])
        )
    );
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
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
                setError(true);
            });
    };

    const setField = (
        name: string,
        value: (typeof elementFields)[number]['defaultValue']
    ) => setData({ ...data, [name]: value });

    const getField = (name: string) => data[name];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchList, []);

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
                    fetchList(
                        (error) =>
                            !error &&
                            setData(
                                Object.fromEntries(
                                    elementFields.map((field) => [
                                        field.keyName,
                                        field.defaultValue,
                                    ])
                                )
                            )
                    );
                    setError(false);
                } else setError(true);
            },
            catch: () => setError(true),
        }
    );

    const handleDelete = (id: string) =>
        load(() => fetch(`/api/${apiRoute}/${id}`, { method: 'DELETE' }), {
            then: (response) => {
                if (response.ok) {
                    fetchList(
                        (error) =>
                            !error &&
                            setData(
                                Object.fromEntries(
                                    elementFields.map((field) => [
                                        field.keyName,
                                        field.defaultValue,
                                    ])
                                )
                            )
                    );
                    setError(false);
                } else setError(true);
            },
            catch: () => setError(true),
        })();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

            {error && (
                <h1 className="text-red-500 opacity-90 text-center cursor-default">
                    An Error Occurred!
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
                            field.type === 'choice' ? (
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
                                                    field.type === 'number' &&
                                                        value !== ''
                                                        ? Number(value)
                                                        : value || undefined
                                                );
                                        }}
                                        placeholder={field.placeholder}
                                        required={!!field.required}
                                        type={
                                            field.type === 'string'
                                                ? 'text'
                                                : field.type === 'phone'
                                                  ? 'text'
                                                  : field.type === 'number'
                                                    ? 'number'
                                                    : field.type === 'email'
                                                      ? 'email'
                                                      : 'text'
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
                                    {getElementFieldTexts(p).map(
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
