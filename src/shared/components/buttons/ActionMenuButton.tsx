import type React from 'react';

export function ActionMenuButton({
    onClick,
    className,
    ...rest
}: {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    [key: string]: unknown;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-[50px] h-[50px] cursor-pointer font-bold text-xl px-2 pt-[1px] pb-[8px] rounded-full
                hover:border hover:bg-white'
                ${className ?? ''}
            `}
            {...rest}
        >
            ...
        </button>
    );
}
