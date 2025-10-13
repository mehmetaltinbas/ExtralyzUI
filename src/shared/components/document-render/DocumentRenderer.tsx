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
    const [isPreRender, setIsPreRender] = useState<boolean>(true);
    const [documentNode, setDocumentNode] = useState<DocumentNode>(docNode);
    const [padding, setPadding] = useState<{ x: number, y: number }>({
        x: 32,
        y: 24
    });
    const [pageDimensions, setPageDimensons] = useState({
        width: Math.floor((210 / 25.4) * import.meta.env.VITE_DPI),
        height: Math.floor((297 / 25.4) * import.meta.env.VITE_DPI),
    });
    const [paginatedDocument, setPaginatedDocument] = useState<PaginatedDocument>();
    const blockNodesRef = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => { // initial pagination construction
        console.log(documentNode);
        let pageIndex = 0;
        let totalHeights = 0;
        const paginatedDocument: PaginatedDocument = { pages: [] };
        const pageHeight = pageDimensions.height - 2 * padding.y;
        console.log(pageHeight);
        blockNodesRef.current.forEach((element, index) => {
            const elementHeight = element ? element.getBoundingClientRect().height : 0;
            totalHeights += elementHeight;
            console.log(JSON.stringify({ id: element?.id, height: elementHeight }));
            if (totalHeights > pageHeight) {
                console.log(`overflow in page ${pageIndex} when element ${element?.id} added, totalHeighs: ${totalHeights}`);
                pageIndex++;
                totalHeights = elementHeight;
            }
            if (!paginatedDocument.pages[pageIndex]) {
                paginatedDocument.pages[pageIndex] = { blockNodes: [{ globalIndex: index, node: documentNode.content[index] }] };
            } else if (paginatedDocument.pages[pageIndex]) {
                paginatedDocument.pages[pageIndex].blockNodes.push({ globalIndex: index, node: documentNode.content[index] });
            }
        });
        console.log(totalHeights);
        for (let i = 0; i < paginatedDocument.pages.length; i++) { // removing the first inline node in every page if it's text is empty
            if (paginatedDocument.pages[i].blockNodes[0].node.content[0]?.text === ` `) {
                paginatedDocument.pages[i].blockNodes[0].node.content.splice(0, 1);
            }
            // if (pagesLocal[i][0].content.length === 0) {
            //     pagesLocal[i].splice(0, 1);
            // }
        }
        setPaginatedDocument(paginatedDocument);
        console.log(paginatedDocument);
        setIsPreRender(false);
    }, []);

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
                    padding={padding}
                />
            :
                paginatedDocument ?
                    mode === 'view' ? (
                        <DocumentViewMode
                            paginatedDocument={paginatedDocument}
                            pageDimensions={pageDimensions}
                            constructTailwindClassNames={constructTailwindClassNames}
                            padding={padding}
                        />
                    ) : mode === 'edit' ? (
                            <DocumentEditMode
                                paginatedDocument={paginatedDocument}
                                setPaginatedDocument={setPaginatedDocument}
                                pageDimensions={pageDimensions}
                                constructTailwindClassNames={constructTailwindClassNames}
                                mainDiv={mainDiv}
                                padding={padding}
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
