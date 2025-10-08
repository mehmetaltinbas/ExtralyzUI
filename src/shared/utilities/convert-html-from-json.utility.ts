import type { BlockNode } from "src/features/source/types/block-node.interface";
import type { DocumentNode } from "src/features/source/types/document-node.interface";
import type { InlineNode } from "src/features/source/types/inline-node.interface";
import type { Styles } from "src/features/source/types/styles.interface";

export function convertHTMLFromJSON(documentNode: DocumentNode): string {
    let html = '';
    documentNode.content.forEach((blockNode: BlockNode, index) => {
        let blockNodeHtml: string = '<p class="flex gap-0 whitespace-pre">';
        blockNode.content.forEach((inlineNode: InlineNode, index) => {
            if(inlineNode.text.length === 1) console.log(inlineNode.text);
            const className: string = constructTailwindClassNames(inlineNode.styles);
            const inlineNodeHtml: string = `<span class='${className}'>${inlineNode.text}</span>\n`;
            blockNodeHtml += inlineNodeHtml;
        });
        blockNodeHtml += '</p>';
        html += blockNodeHtml;
    });
    return html;
}

function constructTailwindClassNames(styles: Styles): string {
    let className: string = '';
    if (styles.bold !== undefined && styles.bold === true) {
        className += `font-serif bold `;
    }
    if (styles.italic !== undefined && styles.italic === true) {
        className += `font-serif italic `;
    }
    className += `text-[${styles.fontSize}px]`;
    return className;
}