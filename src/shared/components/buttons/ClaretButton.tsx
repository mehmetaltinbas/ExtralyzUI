import React from 'react';

export function ClaretButton({
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
            className={`cursor-pointer px-2 pt-[2px] pb-[1px] border-[2px] border-[#a62637] rounded-[10px]
                bg-[#a62637] text-white text-xs
                hover:bg-white hover:text-[#a62637]
                ${className ?? ''}
            `}
            {...rest}
        >
            {children}
        </button>
    );
}
