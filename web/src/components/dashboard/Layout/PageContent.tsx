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
            <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-[url(../bg.png)] bg-cover custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full" ref={mainContentRef}>
                {children}
                <div className="h-16"></div>
            </main>
        </div>
    )
}