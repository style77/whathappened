import { useRef, useEffect } from "react";
import Header from "../Header";

type PageContentProps = {
    children: React.ReactNode
}

export const PageContent: React.FC<PageContentProps> = ({ children }: PageContentProps) => {
    const mainContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentRef = mainContentRef.current
        if (!contentRef) return;

        contentRef.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [document.title])

    return (
        <div className="drawer-content flex flex-col ">
            <Header />
            <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-gray-50" ref={mainContentRef}>
                {children}
                <div className="h-16"></div>
            </main>
        </div>
    )
}