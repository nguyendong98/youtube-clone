import React, {useEffect} from 'react';
import './_videoMetadata.scss';
import numeral from 'numeral';
import moment from 'moment';
import { MdThumbUp, MdThumbDown, MdPlaylistAdd, MdMoreHoriz } from 'react-icons/md';
import { IoMdShareAlt } from 'react-icons/io';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ShowMoreText from 'react-show-more-text';
import {useDispatch, useSelector} from 'react-redux';
import {getChannelDetail} from 'actions/channels.action';
import {useTranslation} from 'react-i18next';

export default function VideoMetadata({ video: {snippet, statistics} }) {

    const dispatch = useDispatch();
    const { t } = useTranslation()

    const { title, publishedAt, channelId, channelTitle, description } = snippet;
    const { viewCount, likeCount, dislikeCount } = statistics;

    //get channel icon
    useEffect(() => {
        dispatch(getChannelDetail(channelId))
    }, [dispatch, channelId])

    const { channel } = useSelector(state => state['channelDetail']);

    return (
        <div className="videoMetadata py-2">
            <div className="videoMetadata__top">
                <h5>{ title }</h5>
                <div className="d-flex flex-column flex-md-row justify-content-start align-items-start align-items-md-center justify-content-md-between py-md-1">
                    <span>
                        {numeral(viewCount).format('0.a')} {t('watchScreen.views')} • &nbsp;
                        {moment(publishedAt).fromNow()}
                    </span>
                    <div className="d-flex flex-row align-items-center mt-2 mt-md-0">
                        <div className="like__bar">
                                <MdThumbUp size={26} />&nbsp;
                                 <span>{numeral(likeCount).format('0.a')}</span>
                                <MdThumbDown size={26}/>&nbsp;
                                <span>{numeral(dislikeCount).format('0.a')}</span>
                        </div>
                        <span className="ms-2 text-uppercase" >
                            <IoMdShareAlt size={30}/>{t('watchScreen.share')}
                        </span>
                        <span className="text-uppercase">
                            <MdPlaylistAdd size={30}/>{t('watchScreen.save')}
                        </span>
                        <span>
                            <MdMoreHoriz size={26} />
                        </span>
                    </div>
                </div>

            </div>
            <div className="videoMetadata__channel d-flex justify-content-between align-items-center my-2 py-3">
                <div className="d-flex">
                    <LazyLoadImage className="rounded-circle" src={channel?.snippet?.thumbnails?.default?.url} effect="blur" />
                    <div className="d-flex flex-column ms-3">
                        <span className="fw-bold">{ channelTitle }</span>
                        <span className="small">{numeral(channel?.statistics?.subscriberCount).format('0.a')} {t('watchScreen.subscribers')}</span>
                    </div>
                </div>
                <button className="btn border-0 py-2 px-3">{t('watchScreen.subscribe')}</button>
            </div>
            <div className="videoMetadata__description pb-3">
                <ShowMoreText
                    lines={3}
                    more={t('watchScreen.showMore')}
                    less={t('watchScreen.showLess')}
                    anchorClass="showMoreText"
                    expanded={false}
                >
                    { description }
                </ShowMoreText>
            </div>

        </div>
    )
}
