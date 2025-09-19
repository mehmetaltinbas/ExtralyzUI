import type React from "react";

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
            className={`cursor-pointer font-serif font-bold text-lg px-2 pt-[1px] pb-[8px] rounded-full
                hover:border hover:bg-white'
                ${className ?? ''}
            `}
            {...rest}
        >
            ...
        </button>
    );
}
