import React from 'react';
import './_sidebar.scss';
import {
    MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory,
    MdLibraryBooks, MdHome, MdSentimentDissatisfied
} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {logOut} from 'actions/auth.action';

export default function Sidebar({ sidebar, toggleSidebar }) {

    const dispatch = useDispatch();
    const handleLogOut = () => dispatch(logOut());

    return (
        <nav
            className={sidebar ? "sidebar open" : "sidebar close"}
            onClick={toggleSidebar}
        >
            <li>
                <MdHome size={23} />
                <span>Trang chủ</span>
            </li>
            <li>
                <MdSubscriptions size={23} />
                <span>Kênh đăng ký</span>
            </li>
            <li>
                <MdThumbUp size={23} />
                <span>Video đã thích</span>
            </li>
            <li>
                <MdHistory size={23} />
                <span>Video đã xem</span>
            </li>
            <li>
                <MdLibraryBooks size={23} />
                <span>Thư viện</span>
            </li>
            <li>
                <MdSentimentDissatisfied size={23} />
                <span>I don't know</span>
            </li>
            <hr />
            <li onClick={handleLogOut}>
                <MdExitToApp size={23} />
                <span>Đăng xuất</span>
            </li>

            <hr />

        </nav>
    )
}
