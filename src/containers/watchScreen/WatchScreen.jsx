import React, {useEffect} from 'react';
import './_watchScreen.scss';
import {Col, Row} from 'react-bootstrap';
import VideoMetadata from 'components/videoMetadata/VideoMetadata';
import Comments from 'components/comments/Comments';
import VideoHorizontal from 'components/videoHorizontal/VideoHorizontal';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getRelatedVideos, getVideoById} from 'actions/videos.action';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export default function WatchScreen() {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getRelatedVideos(id))
    }, [dispatch, id])

    const { video, loading } = useSelector(state => state.videoSelect);
    const { relatedVideos, loading:relatedVideoLoading } = useSelector(state => state.relatedVideos)

    return (
        <Row className="mb-5">
            <Col lg={8}>
                <div className="watch__player">
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder="0"
                        title={video?.snippet?.title}
                        allowFullScreen
                        width="100%"
                        height="100%">
                    </iframe>
                </div>
                { !loading && video ? (
                    <VideoMetadata video={video} /> ) :
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
                { video && <Comments videoId={id} video={video}/> }
            </Col>
            <Col lg={4} className="mt-2">
                {!relatedVideoLoading && relatedVideos ? relatedVideos.map((value, i) => (
                    <VideoHorizontal key={i} video={value}/>
                )) : (
                    <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                        <Skeleton width='100%' height='130px' count={15} />
                    </SkeletonTheme>
                )}
            </Col>
        </Row>
    )
}
