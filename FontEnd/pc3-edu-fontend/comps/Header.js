import Link from "next/link";
import style from '../styles/Home.module.scss';
import Image from "next/image";
import { useRef, useState } from "react";

const Header = () => {

    const [stateMenuInfor, setStateMenuInfor] = useState(false);

    const avatarRef = useRef();
    const handleAvatarClick = () => {
        setStateMenuInfor(!stateMenuInfor);
    }


    return (
        <>
            <header className="header">
            <div className="header__logo">
                <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.18172-8/22382352_1885071128422367_293877343415302519_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=p8hyhQioNJYAX_N4WRD&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8Nce2WFC4rdY9GU_9mGu6jZP6nDlNWg9e25g9Rx-y6hw&oe=62432F21"
                    alt="" />
                <h4>Trường THPT Phù Cát 3</h4>
            </div>
            <div className="header__body">
                <div className="header__search">
                    <ion-icon name="search"></ion-icon>
                    <input type="text" name="search" placeholder="Tìm kiếm" />
                </div>
            </div>
            <div className="header__actions">
                <div className="header__actions__noti">
                    <ion-icon name="notifications"></ion-icon>
                </div>
                <div className="header__actions__avatar" onClick={handleAvatarClick}>
                    <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.18172-8/22382352_1885071128422367_293877343415302519_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=p8hyhQioNJYAX_N4WRD&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8Nce2WFC4rdY9GU_9mGu6jZP6nDlNWg9e25g9Rx-y6hw&oe=62432F21" alt="" />
                </div>
                {/* start user menu */}
                <div className={stateMenuInfor ? "header__actions__userMenu shadow show" : "header__actions__userMenu shadow "}>
                    <div className="user">
                        <div className="user__avatar">
                            <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.18172-8/22382352_1885071128422367_293877343415302519_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=p8hyhQioNJYAX_N4WRD&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8Nce2WFC4rdY9GU_9mGu6jZP6nDlNWg9e25g9Rx-y6hw&oe=62432F21"
                                alt="" />
                        </div>
                        <div className="user__info">
                            <div className="name">Truong Ngoc Trong</div>
                            <div className="username">@truong-ngoc-trong</div>
                        </div>
                    </div>
                    <hr />
                    <ul className="list">
                        <li className="list__item">
                            <a className="list__link" href="">Thông tin cá nhân</a>
                        </li>
                        <li className="list__item">
                            <a className="list__link" href="">Kết quả học tập</a>
                        </li>
                    </ul>
                    <hr />
                    <ul className="list">
                        <li className="list__item">
                            <a className="list__link" href="">Đăng xuất</a>
                        </li>
                    </ul>
                </div>
                {/* finish user menu */}
            </div>
        </header>
        </>
    )
}
export default Header;