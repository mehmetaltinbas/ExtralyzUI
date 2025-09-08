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
            className={`cursor-pointer border py-[2px] px-[4px] rounded-full text-xs text-white bg-[#a62637] hover:bg-gray-200 ${className ?? ''}`}
            {...rest}
        >
            {children}
        </button>
    );
}
