import React, {useEffect, useState} from 'react';
import './_videoHorizontal.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import numeral from 'numeral';
import moment from 'moment';
import axios from 'axios';
import request from 'utils/api';
import {useHistory} from 'react-router-dom';

export default function VideoHorizontal({ video , searchScreen}) {

    const {id, snippet: {publishedAt, title, thumbnails, channelTitle, channelId, description}} = video;
    const history = useHistory();

    const isVideo = id.kind === "youtube#video";
    const [views, setViews] = useState(null);
    const [duration, setDuration] = useState(null);
    const [channelIcon, setChannelIcon] = useState(null);

    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format('mm:ss');


    // get video details
    useEffect(() => {
        const source = axios.CancelToken.source();
        const get_video_details = async () => {
            try {
                const { data: { items } } = await request('/videos', {
                    params: {
                        part: 'contentDetails, statistics',
                        id: id.videoId
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
    }, [id.videoId])

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

    const handleClick = () => isVideo ? history.push(`/watch/${id.videoId}`) : history.push(`/channel/${id.channelId}`)

    return (
        <Row
            className={`videoHorizontal py-1  ${isVideo ? 'align-items-start' : 'align-items-center border-y py-3'}`}

            onClick={handleClick}>
            <Col xs={6} md={searchScreen ? 4 : 6} className="videoHorizontal__left ps-lg-1 py-0">
                <LazyLoadImage
                    src={thumbnails?.medium?.url}
                    effect='blur'
                    className={`videoHorizontal__thumbnail ${!isVideo && 'videoHorizontal__thumbnail-channel'}`}
                    wrapperClassName='videoHorizontal__thumbnail-wrapper'
                />
                {
                    isVideo &&  <span className="videoHorizontal__left-duration">{ _duration }</span>
                }
            </Col>
            <Col xs={6} md={searchScreen ? (isVideo ? 8 : 6) : 6} className="videoHorizontal__right d-flex flex-column ps-0">
                { isVideo && (
                    <div className={searchScreen ? "videoHorizontal__right-title search_screen" : "videoHorizontal__right-title" }>
                        { title }
                    </div>
                )}

                <div className="d-flex flex-column">
                    <div className={searchScreen ? "d-flex align-items-center order-1 mt-3" : "d-flex align-items-center order-0"}>

                        {searchScreen && isVideo && <LazyLoadImage src={channelIcon?.url} className="rounded-circle me-sm-2"></LazyLoadImage> }
                        <div className={isVideo ? "videoHorizontal__right-channel small" : "videoHorizontal__right-channel large"}>
                            { channelTitle }
                        </div>

                    </div>
                    {
                        isVideo && (
                            <div className={searchScreen ? "videoHorizontal__right-info  order-0" : "videoHorizontal__right-info  order-1"}>
                                <span>{ numeral(views).format("0.a") } lượt xem •</span>
                                <span>&nbsp;{ moment(publishedAt).fromNow() }</span>
                            </div>
                        )
                    }
                </div>
                {
                    searchScreen && <div className="videoHorizontal__right-description mt-2">{description}</div>
                }

            </Col>
            { !isVideo && (<Col xs={2} className="d-flex justify-content-end">
                <button
                    className="btn border-0 py-2 px-3"
                    style={{backgroundColor: '#c00',
                        color: '#ffffff',
                        borderRadius: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5'}}
                >
                    Đăng ký
                </button>
            </Col>)}
        </Row>
    )
}
