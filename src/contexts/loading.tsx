/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import LoadingModal from '~/components/ui/loading_modal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface LoadOptions<T = any> {
    then?: (result: T) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch?: (error: any) => void;
    finally?: () => void;
}

export const LoadingContext = createContext<{
    loading: boolean;
    setLoading: (value: boolean) => void;
    load: <T>(func: () => Promise<T>, option?: LoadOptions<T>) => () => void;
}>({
    loading: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLoading: (value: boolean) => {},
    load:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        <T,>(func: () => Promise<T>, option?: LoadOptions<T>) =>
            () => {},
});

export function Loading({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);

    const loading_data = {
        loading,
        setLoading,
        load<T>(func: () => Promise<T>, option?: LoadOptions<T>) {
            return function () {
                setLoading(true);
                void func()
                    .then((result) => {
                        setLoading(false);
                        if (option?.then) option.then(result);
                    })
                    .catch((error) => {
                        setLoading(false);
                        if (option?.catch) option.catch(error);
                        else console.error(error);
                    })
                    .finally(() => {
                        if (option?.finally) option.finally();
                    });
            };
        },
    };

    return (
        <LoadingContext.Provider value={loading_data}>
            <LoadingModal isOpen={loading} />
            {children}
        </LoadingContext.Provider>
    );
}

export const LoadingData = () => useContext(LoadingContext);
