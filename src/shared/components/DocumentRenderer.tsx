import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { BlockNode } from "src/features/source/types/block-node.interface";
import type { DocumentNode } from "src/features/source/types/document-node.interface";
import type { Styles } from "src/features/source/types/styles.interface";

export function DocumentRenderer({ documentNode }: {
    documentNode: DocumentNode,
}) {
    const [isPreRender, setIsPreRender] = useState<boolean>(true);
    const [pageDimensions, setPageDimensons] = useState({
        width: Math.floor(210 / 25.4 * import.meta.env.VITE_DPI),
        height: Math.floor(297 / 25.4 * import.meta.env.VITE_DPI)
    });
    const [pages, setPages] = useState<(BlockNode[])[]>([]);
    const blockRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useLayoutEffect(() => {
        if (isPreRender) {
            let page = 0;
            let totalHeights = 0;
            const pages: BlockNode[][] = [];
            blockRefs.current.forEach((element, index) => {
                totalHeights += element ? element.getBoundingClientRect().height : 0;
                if (totalHeights > pageDimensions.height - 48) {
                    page ++;
                    totalHeights = 0;
                }
                if (!pages[page]) {
                    pages[page] = [documentNode.content[index]];
                } else if (pages[page]) {
                    pages[page].push(documentNode.content[index]);
                }
            });
            console.log(pages);
            console.log(pages.length);
            for (let i = 0; i < pages.length; i++) {
                console.log(pages[i][0].content[0]);
                if (pages[i][0].content[0]?.text === ` `) {
                    pages[i][0].content.splice(0, 1);
                }
            }
            setPages(pages);
            setIsPreRender(false);
        }
    }, [documentNode]);

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

    return ( isPreRender ? (
            <div className={`w-[${pageDimensions.width}px] h-auto flex flex-col justify-start items-start shadow-[0_10px_20px_rgba(0,0,0,0.3)] px-[32px] overflow-y-auto`}>
                {documentNode.content.map((blockNode, blockNodeIndex) => (
                    <p ref={element => { blockRefs.current[blockNodeIndex] = element; }} key={`block-node-${blockNodeIndex}`} className="flex gap-0 whitespace-pre">
                        {blockNode.content.map((inlineNode, inlineNodeIndex) => (
                            <span key={`block-node-${blockNodeIndex}/inline-node-${inlineNodeIndex}`} className={`${constructTailwindClassNames(inlineNode.styles)}`}>
                                {inlineNode.text}
                            </span>
                        ))}
                    </p>
                ))}
            </div>
        ) : (
            <div className="flex flex-col justify-start items-center gap-4">
                {pages.map((page, pageIndex) => (
                    <div className={`w-[${pageDimensions.width}px] h-[${pageDimensions.height}px] flex flex-col justify-start items-start shadow-[0_10px_20px_rgba(0,0,0,0.3)] px-[32px] py-[24px]`}>
                        {page.map((blockNode, blockNodeIndex) => (
                            <p key={`page-${pageIndex}/block-node-${blockNodeIndex}`} className="flex gap-0 whitespace-pre">
                                {blockNode.content.map((inlineNode, inlineNodeIndex) => (
                                    <span key={`page-${pageIndex}/block-node-${blockNodeIndex}/inline-node-${inlineNodeIndex}`} className={`${constructTailwindClassNames(inlineNode.styles)}`}>
                                        {inlineNode.text}
                                    </span>
                                ))}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        ) 
    );
}
