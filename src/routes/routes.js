// layouts 
import BasicLayout from "../layouts/BasicLayout";

// pages
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";

const routes = [
    {
        path: "/",
        layout: BasicLayout,
        component: Home,
        exact: true
    },
    {
        path: "/:username",
        layout: BasicLayout,
        component: User,
        exact: true
    },
    {
        layout: BasicLayout,
        component: Error404,
    }
];

export default routes;