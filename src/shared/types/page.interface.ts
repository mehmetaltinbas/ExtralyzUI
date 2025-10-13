import type { BlockNode } from "src/features/source/types/block-node.interface";

export interface Page {
    blockNodes: Node[]
}

interface Node {
    globalIndex: number;
    node: BlockNode;
}