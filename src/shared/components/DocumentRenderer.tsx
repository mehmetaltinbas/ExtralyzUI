import type { DocumentNode } from "src/features/source/types/document-node.interface";
import type { Styles } from "src/features/source/types/styles.interface";

export function DocumentRenderer({ documentNode }: {
    documentNode: DocumentNode,
}) {

    function constructTailwindClassNames(styles: Styles): string {
        let className: string = '';
        if (styles.bold !== undefined && styles.bold === true) {
            className += `font-serif font-bold `;
        }
        if (styles.italic !== undefined && styles.italic === true) {
            className += `font-serif italic `;
        }
        className += `text-[${Math.floor(styles.fontSize * import.meta.env.VITE_DPI / 72)}px]`;
        return className;
    }

    return (
        <div className={`w-[${Math.floor(210 / 25.4 * import.meta.env.VITE_DPI)}px] h-[${Math.floor(297 / 25.4 * import.meta.env.VITE_DPI)}px] flex flex-col justify-start items-start shadow-[0_10px_20px_rgba(0,0,0,0.3)] p-4`}>
            {documentNode.content.map((blockNode, blockNodeIndex) => (
                <p key={`block-node-${blockNodeIndex}`} className="flex gap-0 whitespace-pre">
                    {blockNode.content.map((inlineNode, inlineNodeIndex) => (
                        <span key={`block-node-${blockNodeIndex}/inline-node-${inlineNodeIndex}`} className={`${constructTailwindClassNames(inlineNode.styles)}`}>
                            {inlineNode.text}
                        </span>
                    ))}
                </p>
            ))}
        </div>
    );
}
