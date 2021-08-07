import React, {useEffect, useState} from 'react';
import './_video.scss';
import request from 'utils/api';
import {AiFillEye} from 'react-icons/ai';
import numeral from 'numeral';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Video({ video }) {

    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            title,
            publishedAt,
            liveBroadcastContent,
            thumbnails: {
                medium
            }
        }
    } = video;

    const [views, setViews] = useState(null);
    const [duration, setDuration] = useState(null);
    const [channelIcon, setChannelIcon] = useState(null);

    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format('mm:ss');
    const _videoId = id?.videoId || id;

    const history = useHistory();


    // get video details
    useEffect(() => {
        const source = axios.CancelToken.source();
        const get_video_details = async () => {
            try {
                const { data: { items } } = await request('/videos', {
                    params: {
                        part: 'contentDetails, statistics',
                        id: _videoId
                    },
                    cancelToken: source.token
                })
                setDuration(items[0].contentDetails.duration);
                setViews(items[0].statistics.viewCount);
            } catch (error) {
                if (axios.isCancel(error)) {
                    //cancelled
                } else {
                    throw error;
                }
            }
        }
        get_video_details();
        return () => {
            source.cancel();
        };
    }, [_videoId])

    //get channel icon
    useEffect(() => {
        const source = axios.CancelToken.source();
        const get_channel_icon = async () => {
            try {
                const { data: { items } } = await request('/channels', {
                    params: {
                        part: 'snippet',
                        id: channelId
                    },
                    cancelToken: source.token
                })
                setChannelIcon(items[0].snippet.thumbnails.default);
            } catch (error) {
                if (axios.isCancel(error)) {
                    //cancelled
                } else {
                    throw error;
                }
            }
        }
        get_channel_icon();
    }, [channelId])

    const handleVideoClick = () => {
        history.push(`/watch/${_videoId}`)
    }

    return (
        <div className="video" onClick={handleVideoClick}>
            <div className="video__top">
                <LazyLoadImage src={medium.url} effect='blur' />
                <span className={liveBroadcastContent && liveBroadcastContent === "live" ? "d-none" : "video__top__duration"}>{ _duration }</span>
            </div>

            <div className="video__title">
                { title }
            </div>

            <div className="video__details">
                <span><AiFillEye /> { numeral(views).format("0.a") } lượt xem •</span>
                <span>&nbsp;{ moment(publishedAt).fromNow() }</span>
            </div>

            <div className="video__channel d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex align-items-center">
                    <LazyLoadImage src={channelIcon?.url} effect='blur' />
                    <p className="me-2">{ channelTitle }</p>
                </div>
                {
                    liveBroadcastContent === "live" && <div className="video__channel-live flex-shrink-0">trực tiếp</div>
                }
            </div>
        </div>
    )
}
