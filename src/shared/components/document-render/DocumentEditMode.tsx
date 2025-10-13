import type React from 'react';
import { useRef, useState } from 'react';
import type { BlockNode } from 'src/features/source/types/block-node.interface';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';
import type { InlineNode } from 'src/features/source/types/inline-node.interface';
import type { Styles } from 'src/features/source/types/styles.interface';
import { Toolbar } from 'src/shared/components/document-render/Toolbar';
import type { PaginatedDocument } from 'src/shared/types/paginated-document.interface';

export function DocumentEditMode({
    paginatedDocument,
    setPaginatedDocument,
    pageDimensions,
    constructTailwindClassNames,
    mainDiv,
    padding,
}: {
    paginatedDocument: PaginatedDocument;
    setPaginatedDocument: React.Dispatch<React.SetStateAction<PaginatedDocument | undefined>>;
    pageDimensions: {
        width: number;
        height: number;
    };
    constructTailwindClassNames(styles: Styles): string;
    mainDiv: HTMLDivElement;
    padding: { x: number, y: number };
}) {
    const [isTextareaHidden, setIsTextareaHidden] = useState<boolean>(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedIndices, setSelectedIndices] = useState({
        pageIndex: 0,
        blockNodeIndex: 0,
        inlineNodeIndex: 0,
    });
    const [selectedText, setSelectedText] = useState<string>('');
    const [textareaStyles, setTextareaStyles] = useState({
        fontSize: '12px',
        fontWeight: '400',
        fontStyle: 'normal',
    });

    function constructTextArea(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (textareaRef.current) {
            const eventTarget = event.currentTarget;
            const rect = eventTarget.getBoundingClientRect();
            const mainDivRect = mainDiv.getBoundingClientRect();
            textareaRef.current.style.left = `${rect.left - mainDivRect.left}px`;
            textareaRef.current.style.top = `${rect.top - mainDivRect.top}px`;
            textareaRef.current.style.height = `${rect.height}px`;
            textareaRef.current.style.width = `${rect.width}px`;
            setIsTextareaHidden(false);
            const selectedInlineNode = paginatedDocument.pages[Number(eventTarget.dataset.pageIndex)].blockNodes[Number(eventTarget.dataset.blockIndex)].node.content[Number(eventTarget.dataset.inlineIndex)];
            setTextareaStyles({
                fontSize: `${Math.floor((selectedInlineNode.styles.fontSize * import.meta.env.VITE_DPI) / 72)}px`,
                fontWeight: selectedInlineNode.styles.bold ? '700' : '400',
                fontStyle: selectedInlineNode.styles.italic ? 'italic' : 'normal',
            });
            setSelectedText(selectedInlineNode.text);
            setSelectedIndices({
                pageIndex: Number(eventTarget.dataset.pageIndex),
                blockNodeIndex: Number(eventTarget.dataset.blockIndex),
                inlineNodeIndex: Number(eventTarget.dataset.inlineIndex),
            });
        }
    }

    function calculateGlobalBlockNodeIndex(pageIndex: number, blockNodeIndex: number): number {
        let globalBlockNodeIndex = 0;
        for (let i = 0; i <= pageIndex; i++) {
            if (i === pageIndex) {
                globalBlockNodeIndex += blockNodeIndex;
            } else {
                globalBlockNodeIndex += paginatedDocument.pages[i].blockNodes.length;
            }
        }
        return globalBlockNodeIndex;
    }


    function handleTextAreaOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const eventValue = event.currentTarget.value;
        setSelectedText(eventValue);
        setPaginatedDocument(prev => {
            const newContent = [ ...prev.pages ];
            newContent[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].node = {
                content: [
                    ...newContent[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].node.content.slice(0, selectedIndices.inlineNodeIndex),
                    {
                        ...newContent[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].node.content[selectedIndices.inlineNodeIndex],
                        text: eventValue,
                    },
                    ...newContent[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].node.content.slice(selectedIndices.inlineNodeIndex + 1),
                ]
            };
            return { ...prev, content: newContent };
        });
    }

    return (
        <>
            <textarea
                name="selectedText"
                ref={textareaRef}
                className={`${isTextareaHidden ? 'hidden' : ''} absolute border-none outline-none resize-none`}
                style={{
                    fontSize: textareaStyles.fontSize,
                    fontWeight: textareaStyles.fontWeight,
                    fontStyle: textareaStyles.fontStyle,
                }}
                value={selectedText}
                onChange={(event) => handleTextAreaOnChange(event)}
            ></textarea>
            <Toolbar paginatedDocument={paginatedDocument} />
            <div className="flex flex-col justify-start items-center gap-4">
                {paginatedDocument.pages.map((page, pageIndex) => (
                    <div
                        key={`page-${pageIndex}`}
                        data-page-index={pageIndex}
                        className={`w-[${pageDimensions.width}px] h-[${pageDimensions.height}px] flex flex-col justify-start items-start shadow-[0_10px_20px_rgba(0,0,0,0.3)] px-[${padding.x}px] py-[${padding.y}px]`}
                    >
                        {page.blockNodes.map((blockNode, blockNodeIndex) => (
                            <p
                                key={`page-${pageIndex}/block-node-${blockNodeIndex}`}
                                data-page-index={pageIndex}
                                data-block-index={blockNodeIndex}
                                data-global-block-index={calculateGlobalBlockNodeIndex(pageIndex, blockNodeIndex)}
                                className="flex gap-0 whitespace-pre "
                            >
                                {blockNode.node.content.map((inlineNode, inlineNodeIndex) => (
                                    <span
                                        key={`page-${pageIndex}/block-node-${blockNodeIndex}/inline-node-${inlineNodeIndex}`}
                                        data-page-index={pageIndex}
                                        data-block-index={blockNodeIndex}
                                        data-inline-index={inlineNodeIndex}
                                        onClick={(event) => constructTextArea(event)}
                                        className={`${constructTailwindClassNames(inlineNode.styles)}`}
                                    >
                                        {inlineNode.text}
                                    </span>
                                ))}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
