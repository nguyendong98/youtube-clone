import React, {useState} from 'react';
import './_header.scss';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useHistory} from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
import { RiVideoAddFill } from 'react-icons/ri';
import {login} from 'actions/auth.action';

export default function Header({ toggleSidebar }) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth);
    const [query, setQuery] = useState('');
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search/${query}`)
    }

    const handleLogin = () => {
        dispatch(login());
    }

    return (
        <div className="border border-dark header px-4">
            <div className="header__menu">
                <FaBars className="header__menu-fa" size={24} onClick={toggleSidebar}/>
                <div onClick={history.push('/')} className="d-flex align-items-center">
                    <LazyLoadImage
                        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
                        className="header__menu-logo"
                    />
                    <span className="header__menu-text">YouTube</span>
                </div>

            </div>


            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Tìm kiếm" onChange={e => setQuery(e.target.value)}/>
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header__icons d-flex">
                <RiVideoAddFill size={25} />
                <MdApps size={25} className="ms-3"/>
                <MdNotifications size={25} className="ms-3" />
                {
                    user?.photoURL ? (
                        <LazyLoadImage
                            src={user.photoURL}
                            effect="blur"
                            className="img-avatar ms-3"/>
                    ) : (
                        <button className="btn flex-shrink-0 d-flex align-items-center ms-3" onClick={handleLogin} >
                            <CgProfile size={25} />
                            <span className="ms-2">ĐĂNG NHẬP</span>
                        </button>
                    )
                }
            </div>
        </div>
    )
}
