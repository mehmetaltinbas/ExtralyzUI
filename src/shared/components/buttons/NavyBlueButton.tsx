import type React from 'react';

export function NavyBlueButton({
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
            className={`cursor-pointer px-2 py-[2px] border rounded-[10px] bg-[#0d408c] 
                text-white text-sm 
                hover:bg-[#0b3574]
                ${className ?? ''}
            `}
            {...rest}
        >
            {children}
        </button>
    );
}
