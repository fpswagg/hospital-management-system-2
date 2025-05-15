'use client';

import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reachedOut, setReachedOut] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simulate submission
        await new Promise((r) => setTimeout(r, 1000));

        console.log({ name, email, message });

        setIsSubmitting(false);
        setReachedOut(true);
    };

    return (
        <div className="max-w-sm mx-auto mt-12 p-6 border rounded-md shadow-sm bg-background">
            {reachedOut ? (
                <p className="text-center cursor-default">
                    Thanks for reaching out!
                </p>
            ) : (
                <>
                    <h1 className="text-2xl font-semibold mb-4 cursor-default">
                        Contact Us
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="mb-2">
                                Name
                            </Label>
                            <Input name="name" id="name" required />
                        </div>
                        <div>
                            <Label htmlFor="email" className="mb-2">
                                Email
                            </Label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="message" className="mb-2">
                                Message
                            </Label>
                            <Textarea
                                name="message"
                                id="message"
                                rows={5}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
}
