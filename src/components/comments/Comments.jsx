import React, {useEffect, useState} from 'react';
import './_comments.scss';
import { MdSort } from 'react-icons/md';
import Comment from 'components/comment/Comment';
import {useDispatch, useSelector} from 'react-redux';
import {addComment, getCommentOfVideoById} from 'actions/comments.action';
import {useTranslation} from 'react-i18next';

export default function Comments({ videoId, video: {statistics} }) {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [isShowButton, setIsShowButton] = useState(false);
    const [text, setText] = useState('');

    const { commentCount } = statistics;

    useEffect(() => {
        dispatch(getCommentOfVideoById(videoId))
    }, [dispatch, videoId])

    const { comments } = useSelector(state => state.comments);
    const _comments = comments?.map(
        comment => comment.snippet.topLevelComment.snippet
    )

    const handleComment = e => {
        e.preventDefault();
        dispatch(addComment(videoId, text));
    }

    return (
        <div className="comments mt-3 pb-5">
            <div className="comments__top">
                <div className="d-flex align-items-center">
                    <span className="me-4">{parseInt(commentCount).toLocaleString()} {t('watchScreen.views')} </span>
                    <span className="text-uppercase">
                        <MdSort size={26}/>&nbsp;
                        {t('watchScreen.sortBy')}
                    </span>
                </div>
            </div>
            <div className="comments__form d-flex w-100 my-2">
                <img
                    src="https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg"
                    alt="img-avatar"
                    className="rounded-circle me-3"
                />
                <form onSubmit={handleComment} className="d-flex flex-column flex-grow-1">
                    <input
                        onFocus={() => setIsShowButton(true)}
                        type="text" placeholder={t('watchScreen.publicComment')}
                        onChange={e => setText(e.target.value)}
                    />
                    { isShowButton && (
                        <div className="d-flex justify-content-end mt-2">
                            <button type="reset" onClick={() => setIsShowButton(false)}>{t('watchScreen.cancel')}</button>
                            <button type="submit" className="ms-lg-3">{t('watchScreen.comment')}</button>
                        </div> )
                    }
                </form>
            </div>

            <div className="comment__list">
                {
                    _comments && _comments.map((value, i) => (
                        <Comment key={i} comment={value}/>
                    ))
                }
            </div>
        </div>
    )
}
