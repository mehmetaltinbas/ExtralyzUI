import type React from "react";

export interface PropsBuilderStrategy {
    build: (id: string) => Promise<object>
}