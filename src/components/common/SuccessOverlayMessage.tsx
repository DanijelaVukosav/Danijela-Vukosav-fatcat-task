import { FC } from 'react';

interface SuccessOverlayMessageProps {
    message: string;
    onClose: () => void;
}

export const SuccessOverlayMessage: FC<SuccessOverlayMessageProps> = ({
    message,
    onClose,
}) => (
    <div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 text-white text-2xl p-4"
        onClick={onClose}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-green-500"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
            <path
                fillRule="evenodd"
                d="M16.707 8.707a1 1 0 00-1.414-1.414L10 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l6-6z"
                clipRule="evenodd"
            />
        </svg>
        {message}
    </div>
);
