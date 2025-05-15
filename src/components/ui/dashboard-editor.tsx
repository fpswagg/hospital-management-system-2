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
    element: any;
    setElement: (element: any) => void;
    fetchElement: () => Promise<void>;
    id: string | number;
    elementFields: ElementField[];
}

export default function EditorPage({
    title,
    apiRoute = `${title.toLowerCase()}s`,
    element,
    setElement,
    fetchElement: _fetchElement,
    elementFields,
    id,
}: EditorPropsType) {
    const router = useRouter();
    const [error, setError] = useState(false);
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
                setError(true);
            },
        })();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchElement, []);

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
                } else setError(true);
            },
            catch: () => setError(true),
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
                        An Error Occurred!
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
                                                        field.type ===
                                                            'number' &&
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
