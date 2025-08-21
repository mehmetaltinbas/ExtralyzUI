import React from "react";

export function ClaretButton({ children, handleOnClick, ...rest }: {
    children: React.ReactNode;
    handleOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    [key: string]: unknown;
}) {
    return (
        <button
            onClick={event => handleOnClick(event)}
            className="cursor-pointer border py-[2px] px-[4px] rounded-full text-xs text-white bg-[#a62637] hover:bg-gray-200"
            {...rest}
        >
            {children}
        </button>
    );
}
