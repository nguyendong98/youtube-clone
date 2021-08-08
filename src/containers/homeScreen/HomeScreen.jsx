import React, {useEffect} from 'react';
import {Col, Container} from 'react-bootstrap';
import CategoryBar from 'components/categoryBar/CategoryBar';
import Video from 'components/video/Video';
import './_homeScreen.scss';
import {useDispatch, useSelector} from 'react-redux';
import {getPopularVideos} from 'actions/videos.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from 'components/skeletons/SkeletonVideo';
import {getVideosByCategory} from 'actions/videos.action';
import {useTranslation} from 'react-i18next';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(getPopularVideos())
    }, [dispatch])

    const { videos, activeCategory, loading } = useSelector(state => state['homeVideos']);

    const fetchData = () => {
        if (activeCategory === t('categoriesBar.all')) dispatch(getPopularVideos())
        else {
            dispatch(getVideosByCategory(activeCategory))
        }
    }

    return (
        <Container>
            <CategoryBar />
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
                className='row'>
                {!loading
                    ? videos.map(video => (
                        <Col key={Math.random()} lg={3} md={4}>
                            <Video video={video} key={video.id} />
                        </Col>
                    ))
                    : [...Array(20)].map(() => (
                        <Col key={Math.random()} lg={3} md={4}>
                            <SkeletonVideo />
                        </Col>
                    ))
                }
            </InfiniteScroll>
        </Container>
    )
}
