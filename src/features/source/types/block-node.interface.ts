import type { InlineNode } from "src/features/source/types/inline-node.interface";

export interface BlockNode {
    content: InlineNode[];
}
