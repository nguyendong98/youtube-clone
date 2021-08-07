import React, {useState} from 'react';
import './_header.scss';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import {useSelector} from 'react-redux';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useHistory} from 'react-router-dom';

export default function Header({ toggleSidebar }) {

    const { user } = useSelector(state => state.auth);
    const [query, setQuery] = useState('');
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search/${query}`)
    }

    return (
        <div className="border border-dark header px-4">
            <div className="header__menu">
                <FaBars className="header__menu-fa" size={24} onClick={toggleSidebar}/>
                <LazyLoadImage
                    src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
                    className="header__menu-logo"
                />
                <span className="header__menu-text">YouTube</span>
            </div>


            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Tìm kiếm" onChange={e => setQuery(e.target.value)}/>
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header__icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                {
                    user?.photoURL ? (
                        <LazyLoadImage
                            src={user.photoURL}
                            effect="blur"
                            className="img-avatar"/>
                    ) : (
                        <LazyLoadImage
                            src="https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg"
                            effect="blur"
                            className="img-avatar"/>
                    )
                }
            </div>
        </div>
    )
}
