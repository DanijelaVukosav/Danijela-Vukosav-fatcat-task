import { FC, ReactNode, MouseEvent } from 'react';

import clsx from 'clsx';

interface ButtonProps<T> {
    children: ReactNode;
    onClick: ((event: MouseEvent<T>) => void) | undefined;
    className: string;
}

export const Button: FC = <T,>({
    children,
    onClick,
    className,
}: ButtonProps<T>) => {
    return (
        <button
            className={clsx(
                'rounded-lg',
                'px-4',
                'py-2',
                'bg-black',
                'text-white',
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
