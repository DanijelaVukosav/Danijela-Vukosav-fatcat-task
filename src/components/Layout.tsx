import { FC, ReactNode } from 'react';

import clsx from 'clsx';

interface LayoutProps {
    children: ReactNode;
    background: string;
}

export const Layout: FC<LayoutProps> = ({ children, background }) => {
    return <section className={clsx('py-20', background)}>{children}</section>;
};
