// 'use client';

// import { useState } from 'react';
// import { Calendar } from '~/components/ui/calendar';
// import {
//     Popover,
//     PopoverTrigger,
//     PopoverContent,
// } from '~/components/ui/popover';
// import { Button } from '~/components/ui/button';
// import { format } from 'date-fns';
// import { TimePicker } from './time-picker';

// export function DateTimePicker({
//     datetime,
//     setDatetime,
// }: {
//     datetime: Date | undefined;
//     setDatetime: (d: Date | undefined) => void;
// }) {
//     const [date, setDate] = useState<Date | undefined>(datetime);
//     const [time, setTime] = useState<string>();

//     const updateDateTime = (newDate?: Date, newTime?: string) => {
//         if (!newDate || !newTime) return;
//         const [h, m] = newTime.split(':').map(Number);
//         const updated = new Date(newDate);
//         updated.setHours(h, m);
//         setDatetime(updated);
//     };

//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <Button
//                     variant="outline"
//                     className="w-[280px] justify-start text-left font-normal"
//                 >
//                     {datetime ? format(datetime, 'PPP p') : 'Pick date & time'}
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto space-y-2 p-4">
//                 <Calendar
//                     selected={date}
//                     onSelect={(d) => {
//                         setDate(d);
//                         updateDateTime(d, time);
//                     }}
//                 />
//                 <TimePicker
//                     value={time}
//                     onChange={(t) => {
//                         setTime(t);
//                         updateDateTime(date, t);
//                     }}
//                 />
//             </PopoverContent>
//         </Popover>
//     );
// }
