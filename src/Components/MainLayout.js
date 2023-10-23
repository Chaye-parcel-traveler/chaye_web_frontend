import { Outlet } from "react-router-dom";
import Navbar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <section className="home">
                <Outlet />
                <Footer />
            </section>
        </div>
    )
}

export default MainLayout;