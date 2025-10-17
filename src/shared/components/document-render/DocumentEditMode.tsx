import type React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Styles } from 'src/features/source/types/styles.interface';
import { Toolbar } from 'src/shared/components/document-render/Toolbar';
import type { PaginatedDocument } from 'src/shared/types/paginated-document.interface';

export function DocumentEditMode({
    paginatedDocument,
    setPaginatedDocument,
    setIsPaginatedDocumentFlowChanged,
    blockNodesRef,
    pageDimensions,
    constructTailwindClassNames,
    mainDiv,
    padding,
    calculateGlobalBlockNodeIndex,
}: {
    paginatedDocument: PaginatedDocument;
    setPaginatedDocument: React.Dispatch<React.SetStateAction<PaginatedDocument | undefined>>;
    setIsPaginatedDocumentFlowChanged: React.Dispatch<React.SetStateAction<boolean>>;
    blockNodesRef: React.RefObject<(HTMLParagraphElement | null)[]>;
    pageDimensions: {
        width: number;
        height: number;
    };
    constructTailwindClassNames(styles: Styles): string;
    mainDiv: HTMLDivElement;
    padding: { x: number, y: number };
    calculateGlobalBlockNodeIndex(paginatedDocument: PaginatedDocument, pageIndex: number, blockNodeIndex: number): number;
}) {
    const [isNextRender, setIsNextRender] = useState<boolean>(false);
    const [isSelectedTextSet, setIsSelectedTextSet] = useState<boolean>(false);
    const [isTextareaHidden, setIsTextareaHidden] = useState<boolean>(true);
    const [textAreaConstructionTrigger, setTextAreaConstructionTrigger] = useState<'enter' | 'click'>();
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

    function triggerTextAreaConstruction(selectedIndices: { pageIndex: number; blockNodeIndex: number; inlineNodeIndex: number; }, trigger: 'click' | 'enter') { // text construction triggerer function
        setSelectedIndices(selectedIndices);
        setTextAreaConstructionTrigger(trigger);
        setIsNextRender(true);
    }

    useEffect(() => { // text construction triggerer useEffect 
        if (isNextRender) {
            const selectedHtmlSpanElement = document.querySelector(`[data-page-index="${selectedIndices.pageIndex}"][data-block-index="${selectedIndices.blockNodeIndex}"][data-inline-index="${selectedIndices.inlineNodeIndex}"]`) as HTMLSpanElement;
            if (selectedHtmlSpanElement) {
                const selectedInlineNode = paginatedDocument.pages[Number(selectedHtmlSpanElement.dataset.pageIndex)].blockNodes[Number(selectedHtmlSpanElement.dataset.blockIndex)].content[Number(selectedHtmlSpanElement.dataset.inlineIndex)];
                setSelectedText(selectedInlineNode.text);
                setIsSelectedTextSet(true);
                if (isSelectedTextSet) {
                    constructTextArea(selectedHtmlSpanElement, textAreaConstructionTrigger!);
                    setIsSelectedTextSet(false);
                    setIsNextRender(false);
                }
            }
        }
    }, [isNextRender, selectedText]);

    function constructTextArea(htmlSpanElement: HTMLSpanElement, trigger: 'enter' | 'click') {
        if (textareaRef.current) {
            const rect = htmlSpanElement.getBoundingClientRect();
            const mainDivRect = mainDiv.getBoundingClientRect();
            textareaRef.current.style.left = `${rect.left - mainDivRect.left}px`;
            textareaRef.current.style.top = `${rect.top - mainDivRect.top}px`;
            textareaRef.current.style.height = `${rect.height}px`;
            textareaRef.current.style.width = `${rect.width}px`;
            const selectedInlineNode = paginatedDocument.pages[Number(htmlSpanElement.dataset.pageIndex)].blockNodes[Number(htmlSpanElement.dataset.blockIndex)].content[Number(htmlSpanElement.dataset.inlineIndex)];
            setTextareaStyles({
                fontSize: `${Math.floor((selectedInlineNode.styles.fontSize * import.meta.env.VITE_DPI) / 72)}px`,
                fontWeight: selectedInlineNode.styles.bold ? '700' : '400',
                fontStyle: selectedInlineNode.styles.italic ? 'italic' : 'normal',
            });
            if (selectedText !== selectedInlineNode.text) {
                setSelectedText(selectedInlineNode.text);
            }
            if (selectedIndices.pageIndex !== Number(htmlSpanElement.dataset.pageIndex) || selectedIndices.blockNodeIndex !== Number(htmlSpanElement.dataset.blockIndex) || selectedIndices.inlineNodeIndex !== Number(htmlSpanElement.dataset.inlineIndex)) {
                setSelectedIndices({
                    pageIndex: Number(htmlSpanElement.dataset.pageIndex),
                    blockNodeIndex: Number(htmlSpanElement.dataset.blockIndex),
                    inlineNodeIndex: Number(htmlSpanElement.dataset.inlineIndex),
                });
            }
            if (trigger === 'enter') {
                textareaRef.current.setSelectionRange(0, 0);
            } else if (trigger === 'click') {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const clickedOffset = range.startOffset;
                    textareaRef.current.setSelectionRange(clickedOffset, clickedOffset);
                }
            }
            textareaRef.current.focus();
        }
    }

    function handleSpanOnclick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        const htmlSpanElement = event.currentTarget;
        triggerTextAreaConstruction({ pageIndex: Number(htmlSpanElement.dataset.pageIndex), blockNodeIndex: Number(htmlSpanElement.dataset.blockIndex), inlineNodeIndex: Number(htmlSpanElement.dataset.inlineIndex) }, 'click');
    }

    function handleTextAreaOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const eventValue = event.currentTarget.value;
        setSelectedText(eventValue);
        setPaginatedDocument(prev => {
            const newPages = [ ...prev!.pages ];
            newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex] = {
                content: [
                    ...newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].content.slice(0, selectedIndices.inlineNodeIndex),
                    {
                        ...newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].content[selectedIndices.inlineNodeIndex],
                        text: eventValue,
                    },
                    ...newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].content.slice(selectedIndices.inlineNodeIndex + 1),
                ]
            };
            return { pages: newPages };
        });
    }

    function handleOnKeyUp(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && textareaRef.current?.selectionStart === textareaRef.current?.selectionEnd) {
            const caretPosition = textareaRef.current!.selectionStart;
            const firstPart = selectedText.slice(0, caretPosition);
            const secondPart = selectedText.slice(caretPosition);
            setPaginatedDocument(prev => {
                const newPages = structuredClone([ ...prev!.pages ]);
                const tailInlineNodes = [ ...newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].content.slice(selectedIndices.inlineNodeIndex + 1) ];
                newPages[selectedIndices.pageIndex].blockNodes = [
                    ...newPages[selectedIndices.pageIndex].blockNodes.slice(0, selectedIndices.blockNodeIndex),
                    {
                        content: [
                            ...newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].content.slice(0, selectedIndices.inlineNodeIndex),
                            {
                                ...newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].content[selectedIndices.inlineNodeIndex],
                                text: firstPart,
                            }
                        ]
                    },
                    {
                        content: [
                            {
                                text: ` `,
                                styles: {
                                    fontSize: 1,
                                    bold: false,
                                    italic: false
                                }
                            }
                        ]
                    },
                    {
                        content: [
                            {
                                text: secondPart,
                                styles: newPages[selectedIndices.pageIndex].blockNodes[selectedIndices.blockNodeIndex].content[selectedIndices.inlineNodeIndex].styles,
                            },
                            ...tailInlineNodes
                        ],
                    },
                    ...newPages[selectedIndices.pageIndex].blockNodes.slice(selectedIndices.blockNodeIndex + 1),
                ];
                return { pages: newPages };
            });
            triggerTextAreaConstruction({
                pageIndex: selectedIndices.pageIndex,
                blockNodeIndex: selectedIndices.blockNodeIndex + 2,
                inlineNodeIndex: 0
            }, 'enter');
            setIsPaginatedDocumentFlowChanged(true);
        }
    }

    return (
        <>
            <textarea
                onKeyUp={e => handleOnKeyUp(e)}
                name="selectedText"
                ref={textareaRef}
                className={`absolute border-none outline-none resize-none`}
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
                                id={`page-${pageIndex}-block-${blockNodeIndex}`}
                                key={`page-${pageIndex}/block-node-${blockNodeIndex}`}
                                ref={(element) => {
                                    blockNodesRef.current[calculateGlobalBlockNodeIndex(paginatedDocument, pageIndex, blockNodeIndex)] = element;
                                }}
                                data-page-index={pageIndex}
                                data-block-node-index={blockNodeIndex}
                                className="w-full flex gap-0 whitespace-pre "
                            >
                                {blockNode.content.map((inlineNode, inlineNodeIndex) => (
                                    <span
                                        key={`page-${pageIndex}/block-node-${blockNodeIndex}/inline-node-${inlineNodeIndex}`}
                                        data-page-index={pageIndex}
                                        data-block-index={blockNodeIndex}
                                        data-inline-index={inlineNodeIndex}
                                        onClick={(event) => handleSpanOnclick(event)}
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
