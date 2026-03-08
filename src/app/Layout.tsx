import {Header} from "@/components/ui/Header.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return <>
        <Header/>
        <Outlet/>
    </>;
}

export default Layout