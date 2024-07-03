import { FC } from 'react';

interface ErrorProps {
    message: string;
}

export const Error: FC<ErrorProps> = ({ message }) => {
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                    <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            width="100px"
                            height="100px"
                            viewBox="-3.5 0 19 19"
                            className="cf-icon-svg"
                        >
                            <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
                        </svg>
                    </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
                    Error
                </h1>
                <p className="text-slate-600 mt-5 lg:text-lg">{message}</p>
            </div>
        </div>
    );
};
