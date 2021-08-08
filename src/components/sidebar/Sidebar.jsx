import React, {useState} from 'react';
import './_sidebar.scss';
import {
    MdSubscriptions, MdThumbUp, MdHistory,
    MdLibraryBooks, MdHome, MdExplore, MdExitToApp
} from 'react-icons/md';
import { RiVideoLine, RiTimeFill } from 'react-icons/ri';
import { IoLanguage } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from 'actions/auth.action';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

export default function Sidebar({ sidebar, toggleSidebar }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state => state.auth);
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(false);
    const handleLogOut = () => dispatch(logOut());

    const onChangeLanguage = async () => {
        await setLanguage(!language);
        await i18n.changeLanguage(language ? 'en' : 'vi');
        moment.locale(language ? 'en' : 'vi')
    };

    return (
        <nav
            className={sidebar ? "sidebar open" : "sidebar close"}
            onClick={toggleSidebar}
        >
            <li onClick={() => history.push('/')}>
                <MdHome size={23} />
                <span>{t('sidebar.home')}</span>
            </li>
            <li >
                <MdExplore size={23} />
                <span>{t('sidebar.explore')}</span>
            </li>
            <li>
                <MdSubscriptions size={23} />
                <span>{t('sidebar.subscriptions')}</span>
            </li>
            <hr />

            <li>
                <MdLibraryBooks size={23} />
                <span>{t('sidebar.library')}</span>
            </li>
            <li>
                <MdHistory size={23} />
                <span>{t('sidebar.history')}</span>
            </li>
            <li>
                <RiVideoLine size={23} />
                <span>{t('sidebar.yourVideos')}</span>
            </li>
            <li>
                <RiTimeFill size={23} />
                <span>{t('sidebar.watchLater')}</span>
            </li>
            <li>
                <MdThumbUp size={23} />
                <span>{t('sidebar.likedVideos')}</span>
            </li>
            <hr />
            <li onClick={onChangeLanguage} >
                <IoLanguage size={23} />
                <span>{t('sidebar.language')}</span>
                <IoIosArrowForward className="ms-3 d-none d-md-block" size={11}/>
            </li>
            {
                accessToken && (
                    <li onClick={handleLogOut}>
                        <MdExitToApp size={23} />
                        <span>{t('sidebar.signOut')}</span>
                    </li>
                )
            }

        </nav>
    )
}
