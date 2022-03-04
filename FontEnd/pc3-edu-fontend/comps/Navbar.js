import Link from "next/link";
import style from '../styles/Home.module.scss';
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { Helmet } from "react-helmet";

const Navbar = () => {

    const sidebarRef = useRef();
    const menuToggleRef = useRef();
    const handleMenuToggleClick = () => {
        sidebarRef.current.classList.toggle('open');
    }
    useEffect (() => {
        console.log('useEffect');
        const listSidebar = document.querySelectorAll('.sidebar__item');
        console.log("sidebar: ",listSidebar);
        const activeItem = (itemClick) => {
            console.log("handle activeItem");
            listSidebar.forEach((item) => {
                item.classList.remove('active');
                console.log('remove');
            })
            console.log("itemClick: ", itemClick);
            itemClick.classList.add('active');
            console.log('add active');
        }
        listSidebar.forEach((item) => {
            console.log('add event click');
            item.addEventListener('click', function(){
                activeItem(item);
            });
        })
    },[])


    return ( 
        <>
          <div className="sidebar"  ref = {sidebarRef}>
            <div className="menuToggle" ref={menuToggleRef} onClick={handleMenuToggleClick}>
            </div>
            <ul className="sidebar__list">
                    <li className="sidebar__item active" style={{"--clr": "#f44336;"}}>
                        <Link href="/" className="sidebar__link">
                           <a>
                                <span className="icon">
                                    <ion-icon  name="home"></ion-icon>
                                </span>
                                <span className="sidebarText">Trang chủ</span>
                           </a>
                        </Link>
                    </li>
                    <li className="sidebar__item " style={{"--clr": "#ffa117;"}}>
                        <Link href="/about" class="sidebar__link">
                            <a>
                                <span className="icon">
                                    <ion-icon name="book"></ion-icon>
                                </span>
                                <span className="sidebarText">Học Tập</span>
                            </a> 
                        </Link>
                    </li>
                    <li className="sidebar__item " style={{"--clr": "#ffdd17"}}>
                        <Link href="/Students" className="sidebar__link">
                           <a>
                                <span className="icon">
                                    <ion-icon name="bulb"></ion-icon>
                                </span> 
                                <span className="sidebarText">Luyện Tập</span>
                           </a>
                        </Link>
                    </li>
                    <li className="sidebar__item " style={{"--clr": "#0fc70f;"}}>
                        <Link href="/" className="sidebar__link">
                           <a>
                                <span className="icon">
                                    <ion-icon name="game-controller-outline"></ion-icon>
                                </span> 
                                <span className="sidebarText">Giải trí</span>
                           </a>
                        </Link>
                    </li>
                    <li className="sidebar__item " style={{"--clr": "#2196f3;"}}>
                        <Link href="/" className="sidebar__link">
                           <a>
                                <span className="icon">
                                    <ion-icon name="trophy-outline"></ion-icon>
                                </span>
                                <span className="sidebarText">Thi Đấu</span>
                           </a>
                        </Link>
                    </li>
                    <li className="sidebar__item " style={{"--clr": "#446eb6;"}}>
                        <Link href="/" className="sidebar__link">
                           <a>
                                <span className="icon">
                                    <ion-icon name="newspaper"></ion-icon>
                                </span>
                                <span className="sidebarText">Luyện thi</span>
                           </a>
                        </Link>
                    </li>
                    <li className="sidebar__item " style={{"--clr": "#b145e9;"}}>
                        <Link href="/" className="sidebar__link">
                           <a>
                                <span className="icon">
                                    <ion-icon name="people-outline"></ion-icon>
                                </span>
                                <span className="sidebarText">Diễn Đàn</span>
                           </a>
                        </Link>
                    </li>
                </ul>
        </div>

        </>
     );
}
 
export default Navbar;