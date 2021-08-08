import React from 'react';
import './_comment.scss';
import moment from 'moment';
import {MdThumbDown, MdThumbUp} from 'react-icons/md';
import numeral from 'numeral';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useTranslation} from 'react-i18next';

export default function Comment({ comment }) {

    const { t } = useTranslation();

    const { authorProfileImageUrl, likeCount, textDisplay, updatedAt, authorDisplayName} = comment;
    return (
        <div className="comment d-flex align-items-start mt-4">

            <LazyLoadImage className="rounded-circle me-3" src={authorProfileImageUrl} effect="blur" />

            <div className="comment__body d-flex flex-column">
                <div className="comment__body-top d-flex align-items-center">
                    <span className="me-1">{authorDisplayName}</span>
                    <span className="small" style={{opacity: 0.5, fontSize: '12px'}}>{moment(updatedAt).fromNow()}</span>
                </div>
                <div style={{opacity: 0.8}} dangerouslySetInnerHTML={{__html: textDisplay}}></div>
                <div className="d-flex align-items-center mt-2">
                    <span className="small me-3">
                        <MdThumbUp size={20} />&nbsp;
                        {numeral(likeCount).format('0.a')}
                    </span>
                    <span className="small me-4">
                    <MdThumbDown size={20}/>
                    </span>
                    <span className="small text-uppercase pointer-event" style={{opacity: 0.7}}>{t('watchScreen.reply')}</span>
                </div>
            </div>

        </div>
    )

}
