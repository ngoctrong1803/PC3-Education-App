import { Children } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";
import style from '../styles/Home.module.scss';

const Layout = ({ children }) => {
    return ( 
        <>
            <Header/>
            <Navbar/>
                <div className="main">
                    { children }
                </div>          
            <Footer/> 
        </>
     );
}
 
export default Layout;