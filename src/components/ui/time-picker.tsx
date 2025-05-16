'use client';

import { useState } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '~/components/ui/popover';
import { Input } from '~/components/ui/input';
import { Command, CommandGroup, CommandItem } from '~/components/ui/command';

export function TimePicker({
    value,
    onChange,
}: {
    value?: string;
    onChange: (val: string) => void;
}) {
    const times = Array.from({ length: 24 * 2 }, (_, i) => {
        const hour = Math.floor(i / 2)
            .toString()
            .padStart(2, '0');
        const minute = i % 2 === 0 ? '00' : '30';
        return `${hour}:${minute}`;
    });

    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Input
                    readOnly
                    value={value ?? ''}
                    placeholder="Select time"
                    className="cursor-pointer"
                />
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {times.map((time) => (
                            <CommandItem
                                key={time}
                                onSelect={() => {
                                    onChange(time);
                                    setOpen(false);
                                }}
                            >
                                {time}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
