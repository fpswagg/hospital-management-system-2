'use client';

import React from 'react';

interface LoadingModalProps {
    isOpen?: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 backdrop-blur-xs z-50">
                    <svg
                        className="animate-spin h-8 w-8 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                </div>
            )}
        </>
    );
};

export default LoadingModal;
