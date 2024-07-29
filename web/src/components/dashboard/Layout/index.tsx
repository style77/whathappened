import { LeftSidebar } from "../Sidebar";
import { PageContent } from "./PageContent";

type LayoutProps = {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <PageContent>{children}</PageContent>
            <LeftSidebar />
        </div>
    )
}