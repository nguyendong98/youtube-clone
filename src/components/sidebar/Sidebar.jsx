import React from 'react';
import './_sidebar.scss';
import {
    MdSubscriptions, MdThumbUp, MdHistory,
    MdLibraryBooks, MdHome, MdExplore
} from 'react-icons/md';
import { RiVideoLine, RiTimeFill } from 'react-icons/ri';
import {useHistory} from 'react-router-dom';

export default function Sidebar({ sidebar, toggleSidebar }) {
    const history = useHistory();

    return (
        <nav
            className={sidebar ? "sidebar open" : "sidebar close"}
            onClick={toggleSidebar}
        >
            <li onClick={() => history.push('/')}>
                <MdHome size={23} />
                <span>Trang chủ</span>
            </li>
            <li >
                <MdExplore size={23} />
                <span>Khám phá</span>
            </li>
            <li>
                <MdSubscriptions size={23} />
                <span>Kênh đăng ký</span>
            </li>
            <hr />

            <li>
                <MdLibraryBooks size={23} />
                <span>Thư viện</span>
            </li>
            <li>
                <MdHistory size={23} />
                <span>Video đã xem</span>
            </li>
            <li>
                <RiVideoLine size={23} />
                <span>Video của bạn</span>
            </li>
            <li>
                <RiTimeFill size={23} />
                <span>Xem sau</span>
            </li>
            <li>
                <MdThumbUp size={23} />
                <span>Video đã thích</span>
            </li>
            <hr />

        </nav>
    )
}
