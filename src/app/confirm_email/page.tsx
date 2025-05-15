'use client';

export default function ConfirmEmail() {
    return (
        <>
            <div>
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="cursor-default max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Verification mail sent to email
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Verify your email to continue.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
