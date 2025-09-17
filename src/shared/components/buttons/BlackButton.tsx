import type React from 'react';

export function BlackButton({
    children,
    onClick,
    className,
    ...rest
}: {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    [key: string]: unknown;
}) {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer px-2 py-[2px] border-[2px] border-black rounded-[10px]
                bg-black text-white text-sm
                hover:bg-white hover:text-black
                ${className ?? ''}
            `}
            {...rest}
        >
            {children}
        </button>
    );
}
