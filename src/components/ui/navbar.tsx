'use client';

import { Button } from 'src/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import {
    Avatar,
    AvatarFallback /*, AvatarImage*/,
} from 'src/components/ui/avatar';
import { LoadingData } from '~/contexts/loading';
import { AuthData } from '~/contexts/auth';
import Link from 'next/link';

export default function Navbar() {
    const { user, supabase } = AuthData();
    const { load } = LoadingData();

    const handleLogout = load(async () => {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
    });

    if (user)
        return (
            <header className="flex justify-between items-center px-6 py-4 border-b">
                <Link href="/" className="text-xl font-bold">
                    Kerry&apos;s Tool
                </Link>
                <nav className="flex items-center justify-evenly mx-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="cursor-pointer">
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="ghost" className="cursor-pointer">
                            About
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="ghost" className="cursor-pointer">
                            Contact
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer">
                                {/* <AvatarImage src="/avatar.png" /> */}
                                <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="select-none">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/profile" passHref>
                                <DropdownMenuItem className="cursor-pointer">
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </header>
        );
    else
        return (
            <header className="flex justify-between items-center px-6 py-4 border-b">
                <Link href="/" className="text-xl font-bold">
                    Kerry&apos;s Tool
                </Link>
                <nav className="flex items-center justify-evenly mx-4">
                    <Link href="/">
                        <Button variant="ghost" className="cursor-pointer">
                            Home
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="ghost" className="cursor-pointer">
                            About
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="ghost" className="cursor-pointer">
                            Contact
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="ghost" className="cursor-pointer">
                            Connect
                        </Button>
                    </Link>
                </nav>
            </header>
        );
}
