import type React from "react";

export function NavyBlueButton({ children, handleOnClick, ...rest }: {
    children: React.ReactNode;
    handleOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    [key: string]: unknown;
}) {
    return (
        <button
            onClick={event => handleOnClick(event)} 
            className="cursor-pointer px-2 py-[2px] border rounded-[10px] bg-[#0d408c] text-white text-sm"
            {...rest}
        >
            {children}
        </button>
    );
}
