import '~/styles/globals.css';

// import { Geist } from 'next/font/google';
import { type Metadata } from 'next';

import Navbar from '~/components/ui/navbar';
import { AuthProvider } from '~/contexts/auth';
import { Loading } from '~/contexts/loading';

export const metadata: Metadata = {
    title: "Kerry's Tool",
    description: 'A hospital management system made by Kerry.',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

// const geist = Geist({
//     subsets: ['latin'],
//     variable: '--font-geist-sans',
// });

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" /*className={`${geist.variable}`}*/>
            <body className="bg-gray-100">
                <Loading>
                    <AuthProvider>
                        <Navbar />
                        {children}
                    </AuthProvider>
                </Loading>
            </body>
        </html>
    );
}
