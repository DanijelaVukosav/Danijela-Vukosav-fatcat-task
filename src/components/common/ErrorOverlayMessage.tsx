import { FC } from 'react';

interface ErrorOverlayMessageProps {
    message: string;
    onClose: () => void;
}

export const ErrorOverlayMessage: FC<ErrorOverlayMessageProps> = ({
    message,
    onClose,
}) => (
    <div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 text-white text-2xl p-4"
        onClick={onClose}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-red-500"
            viewBox="0 0 24 24"
            fill="red"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="red"
                strokeWidth="2"
                fill="none"
            />
            <path
                fillRule="evenodd"
                d="M15.293 8.293a1 1 0 011.414 1.414L13.414 12l3.293 3.293a1 1 0 01-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12 7.293 8.707a1 1 0 011.414-1.414L12 10.586l3.293-3.293z"
                clipRule="evenodd"
            />
        </svg>
        {message}
    </div>
);
