import { Dashboard } from "./pages/dashboard";
import { Login, Register } from "./pages/auth";
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';

type Route = {
    path: string;
    name: string;
    icon: React.FC<React.ComponentProps<'svg'>>;
    needsAuth: boolean;
    component: React.FC;
    title: string;
    showInSidebar?: boolean;
}

const PROJECT_NAME = 'whathappened'

export const routes: Route[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: HomeIcon,
        needsAuth: true,
        component: Dashboard,
        title: `Dashboard - ${PROJECT_NAME}`,
        showInSidebar: true
    },
    {
        path: '/auth/signin',
        name: 'Sign In',
        icon: UserIcon,
        needsAuth: false,
        component: Login,
        title: `Sign In - ${PROJECT_NAME}`,
        showInSidebar: false
    },
    {
        path: '/auth/signup',
        name: 'Sign Up',
        icon: UserIcon,
        needsAuth: false,
        component: Register,
        title: `Sign Up - ${PROJECT_NAME}`,
        showInSidebar: false
    }
]