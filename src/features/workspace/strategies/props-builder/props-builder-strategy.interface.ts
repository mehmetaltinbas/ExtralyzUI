import type React from "react";

export interface PropsBuilderStrategy {
    build: (id: string, setProps: React.Dispatch<React.SetStateAction<object>>) => Promise<void>
}