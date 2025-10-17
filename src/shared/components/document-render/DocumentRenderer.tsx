import { useEffect, useLayoutEffect,useRef, useState } from 'react';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';
import type { Styles } from 'src/features/source/types/styles.interface';
import { DocumentEditMode } from 'src/shared/components/document-render/DocumentEditMode';
import { DocumentMeasurer } from 'src/shared/components/document-render/DocumentMeasurer';
import { DocumentViewMode } from 'src/shared/components/document-render/DocumentViewMode';
import { LoadingPage } from 'src/shared/pages/LoadingPage';
import type { PaginatedDocument } from 'src/shared/types/paginated-document.interface';

export function DocumentRenderer({
    docNode,
    mode,
    mainDiv,
}: {
    docNode: DocumentNode;
    mode: 'view' | 'edit';
    mainDiv: HTMLDivElement;
}) {
    const [isPaginatedDocumentFlowChanged, setIsPaginatedDocumentFlowChanged] = useState<boolean>(false);
    const [isPreRender, setIsPreRender] = useState<boolean>(true);
    const [documentNode, setDocumentNode] = useState<DocumentNode>(docNode);
    const [pagePadding, setPagePadding] = useState<{ x: number, y: number }>({
        x: 32,
        y: 24
    });
    const [pageDimensions, setPageDimensons] = useState({
        width: Math.floor((210 / 25.4) * import.meta.env.VITE_DPI),
        height: Math.floor((297 / 25.4) * import.meta.env.VITE_DPI),
    });
    const [paginatedDocument, setPaginatedDocument] = useState<PaginatedDocument>();
    const blockNodesRef = useRef<(HTMLParagraphElement | null)[]>([]);

    function calculateGlobalBlockNodeIndex(paginatedDocument: PaginatedDocument, pageIndex: number, blockNodeIndex: number) {
        let globalBlockNodeIndex = 0;
        for (let i = 0; i < pageIndex; i++) {
            globalBlockNodeIndex += paginatedDocument.pages[i].blockNodes.length;
        }
        globalBlockNodeIndex += blockNodeIndex;
        return globalBlockNodeIndex;
    }

    useEffect(() => { // initial pagination construction
        // console.log(documentNode);
        let pageIndex = 0;
        let totalHeights = 0;
        const localPaginatedDocument: PaginatedDocument = { pages: [] };
        const pageHeight = pageDimensions.height - 2 * pagePadding.y;
        // console.log(pageHeight);
        blockNodesRef.current.forEach((element, index) => {
            const elementHeight = element ? element.getBoundingClientRect().height : 0;
            totalHeights += elementHeight;
            // console.log(JSON.stringify({ id: element?.id, height: elementHeight }));
            if (totalHeights > pageHeight) {
                // console.log(`overflow in page ${pageIndex} when element ${element?.id} added, totalHeighs: ${totalHeights}`);
                pageIndex++;
                totalHeights = elementHeight;
            }
            if (!localPaginatedDocument.pages[pageIndex]) {
                localPaginatedDocument.pages[pageIndex] = { blockNodes: [ documentNode.content[index], ] };
            } else if (localPaginatedDocument.pages[pageIndex]) {
                localPaginatedDocument.pages[pageIndex].blockNodes.push(documentNode.content[index]);
            }
        });
        // console.log(totalHeights);
        // for (let i = 0; i < localPaginatedDocument.pages.length; i++) { // removing the first inline node in every page if it's text is empty
        //     if (localPaginatedDocument.pages[i].blockNodes[0].node.content[0]?.text === ` `) {
        //         localPaginatedDocument.pages[i].blockNodes[0].node.content.splice(0, 1);
        //     }
        //     if (localPaginatedDocument.pages[i].blockNodes[0].node.content.length === 0) {
        //         localPaginatedDocument.pages[i].blockNodes.splice(0, 1);
        //     }
        // }
        setPaginatedDocument(localPaginatedDocument);
        console.log(localPaginatedDocument);
        setIsPreRender(false);
    }, []);

    useEffect(() => { // pagination after edit
        if (!isPreRender) {
            if (isPaginatedDocumentFlowChanged) {
                const localPaginatedDocument: PaginatedDocument = structuredClone(paginatedDocument!);
                const pageHeight = pageDimensions.height - 2 * pagePadding.y;
                console.log(`pageHeight: ${pageHeight}`);

                for (let pageIndex = 0; pageIndex < localPaginatedDocument!.pages.length; pageIndex++) {
                    let totalHeights = 0;
                    for (let blockNodeIndex = 0; blockNodeIndex < localPaginatedDocument!.pages[pageIndex].blockNodes.length; blockNodeIndex++) {
                        const element = blockNodesRef.current[calculateGlobalBlockNodeIndex(localPaginatedDocument, pageIndex, blockNodeIndex)];
                        const elementHeight = element!.getBoundingClientRect().height;
                        totalHeights += elementHeight!;
                        console.log(`pageIndex: ${pageIndex}, element: ${JSON.stringify({ id: element?.id, height: elementHeight, textOfFirstInlineNode: localPaginatedDocument!.pages[pageIndex].blockNodes[blockNodeIndex].content[0].text, totalHeights })} `);
                        if (totalHeights > pageHeight) {
                            console.log(`OVERFLOW in page ${pageIndex} when element ${element?.id} added, totalHeighs: ${totalHeights}`);
                            let totalHeigtsOfNextPage = 0;
                            localPaginatedDocument.pages[pageIndex + 1].blockNodes.forEach((blockNode, index) => { // counting the total heights of next page
                                totalHeigtsOfNextPage += blockNodesRef.current[calculateGlobalBlockNodeIndex(localPaginatedDocument, pageIndex, blockNodeIndex)]?.getBoundingClientRect().height ?? 0;
                            });
                            console.log(`pageIndex: ${pageIndex}, totalHeightsOfNextPage: ${totalHeigtsOfNextPage}`);
                            if (totalHeigtsOfNextPage + elementHeight < pageHeight) { // if true, there is space in the next page, adding overflowing element to the top of the next page 
                                localPaginatedDocument.pages = [
                                    ...localPaginatedDocument.pages.slice(0, pageIndex),
                                    {
                                        blockNodes: [
                                            ...localPaginatedDocument!.pages[pageIndex].blockNodes.slice(0, blockNodeIndex),
                                        ]
                                    },
                                    {
                                        blockNodes: [
                                            localPaginatedDocument.pages[pageIndex].blockNodes[blockNodeIndex],
                                            ...localPaginatedDocument.pages[pageIndex + 1].blockNodes,
                                        ]
                                    },
                                    ...localPaginatedDocument.pages.slice(pageIndex + 2),
                                ];
                            } else { // there isn't space in the next page, so adding the overflowing element into a blank page
                                localPaginatedDocument.pages = [
                                        ...localPaginatedDocument.pages.slice(0, pageIndex),
                                        {
                                            blockNodes: [
                                                ...localPaginatedDocument!.pages[pageIndex].blockNodes.slice(0, blockNodeIndex),
                                            ]
                                        },
                                        {
                                            blockNodes: [
                                                localPaginatedDocument!.pages[pageIndex].blockNodes[blockNodeIndex],
                                            ]
                                        },
                                        ...localPaginatedDocument.pages.slice(pageIndex + 1),
                                    ];
                            }
                        } else if (blockNodeIndex === localPaginatedDocument!.pages[pageIndex].blockNodes.length - 1) {
                            totalHeights = 0;
                        }
                    }
                }

                // for (let pageIndex = 0; pageIndex < localPaginatedDocument.pages.length; pageIndex++) { // removing the first inline node in every page if it's text is empty
                //     if (localPaginatedDocument.pages[pageIndex].blockNodes[0].node.content[0]?.text === ` `) {
                //         localPaginatedDocument.pages[pageIndex].blockNodes[0].node.content.splice(0, 1);
                //     }
                //     if (localPaginatedDocument.pages[pageIndex].blockNodes[0].node.content.length === 0) {
                //         localPaginatedDocument.pages[pageIndex].blockNodes.splice(0, 1);
                //     }
                // }
                setPaginatedDocument(localPaginatedDocument);
                setIsPaginatedDocumentFlowChanged(false);
                console.log(localPaginatedDocument);

            }
        }
    }, [isPaginatedDocumentFlowChanged]);

    function constructTailwindClassNames(styles: Styles): string {
        let className: string = '';
        if (styles.bold !== undefined && styles.bold === true) {
            className += `font-bold `;
        }
        if (styles.italic !== undefined && styles.italic === true) {
            className += `italic `;
        }
        className += `text-[${Math.floor((styles.fontSize * import.meta.env.VITE_DPI) / 72)}px]`;
        return className;
    }

    return documentNode ? (
            isPreRender ? 
                <DocumentMeasurer
                    documentNode={documentNode}
                    blockNodesRef={blockNodesRef}
                    constructTailwindClassNames={constructTailwindClassNames}
                    pageDimensions={pageDimensions}
                    padding={pagePadding}
                />
            :
                paginatedDocument ?
                    mode === 'view' ? (
                        <DocumentViewMode
                            paginatedDocument={paginatedDocument}
                            pageDimensions={pageDimensions}
                            constructTailwindClassNames={constructTailwindClassNames}
                            padding={pagePadding}
                        />
                    ) : mode === 'edit' ? (
                            <DocumentEditMode
                                paginatedDocument={paginatedDocument}
                                setPaginatedDocument={setPaginatedDocument}
                                setIsPaginatedDocumentFlowChanged={setIsPaginatedDocumentFlowChanged}
                                blockNodesRef={blockNodesRef}
                                pageDimensions={pageDimensions}
                                constructTailwindClassNames={constructTailwindClassNames}
                                mainDiv={mainDiv}
                                padding={pagePadding}
                                calculateGlobalBlockNodeIndex={calculateGlobalBlockNodeIndex}
                            />
                    ) : (
                        <></>
                    )
                :
                <></>
    ) : (
        <LoadingPage />
    );
}
