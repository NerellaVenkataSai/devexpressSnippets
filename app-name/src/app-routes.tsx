import { HomePage, TasksPage, ProfilePage, AccrodionComp, FormWrapper, TabComp } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    {
        path: '/accordion',
        element: AccrodionComp
    },
    {
        path: '/form',
        element: FormWrapper
    },
    {
        path: '/tabs',
        element: TabComp
    },
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
