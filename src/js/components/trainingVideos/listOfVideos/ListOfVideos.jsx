/**
 * ListOfVideos.jsx
 * Created by Brian Petway 12/05/22
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { showTrainingVideoModal } from 'redux/actions/modal/modalActions';
import { FlexGridRow, FlexGridCol, Picker } from "data-transparency-ui";
import VideoCard from '../videoCard/VideoCard';

const propTypes = {
    videos: PropTypes.array
};

const ListOfVideos = ({ videos }) => {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState();
    const [videoList, setVideoList] = useState(videos);
    const originalVideoList = videos;
    const prevSortRef = useRef();

    useEffect(() => {
        setSortOrder("Newest");
    }, []);

    useEffect(() => {
        const tmpVideos = [...originalVideoList];
        console.log(tmpVideos);
        if (prevSortRef.current === sortOrder) {
            return;
        }

        prevSortRef.current = sortOrder;
        if (sortOrder === "Newest") {
            tmpVideos.sort((a, b) => new Date(b._publishedAt) - new Date(a._publishedAt));
        }


        if (sortOrder === "Oldest") {
            tmpVideos.sort((a, b) => new Date(a._publishedAt) - new Date(b._publishedAt));
        }

        // if (sortOrder === "Shortest") {
        //     tmpVideos.sort((a, b) => new Date(b.durationInSecs) - new Date(a.durationInSecs));
        // }
        //
        //
        // if (sortOrder === "Longest") {
        //     tmpVideos.sort((a, b) => new Date(a.durationInSecs) - new Date(b.durationInSecs));
        // }

        setVideoList(tmpVideos);
    }, [originalVideoList, sortOrder]);

    return (
        <section className="list-of-videos__section">
            <div className="grid-content">
                <FlexGridRow className="list-of-videos__sort">
                    <FlexGridCol width={12} className="video-sort">
                        <div className="video-sort-label">Sort By: </div>
                        <Picker
                            className="video-sort-list"
                            options={[{
                                name: 'Newest',
                                value: '0',
                                onClick: () => {
                                    setSortOrder("Newest");
                                }
                            },
                            {
                                name: 'Oldest',
                                value: 1,
                                onClick: () => {
                                    setSortOrder("Oldest");
                                }
                            },
                            {
                                name: 'Shortest',
                                value: 2,
                                onClick: () => {
                                    setSortOrder("Shortest");
                                }
                            },
                            {
                                name: 'Longest',
                                value: 3,
                                onClick: () => {
                                    setSortOrder("Longest");
                                }
                            }]}
                            dropdownDirection="right"
                            backgroundColor="#ffffff"
                            selectedOption={sortOrder} />
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow hasGutter gutterSize="lg">
                    {videoList.map((video) => (
                        <FlexGridCol
                            key={video.id}
                            desktopxl={4}
                            desktop={6}
                            tablet={12}
                            mobile={12}
                            className="list-of-videos__video">
                            <VideoCard
                                tabIndex="0"
                                key={video.id}
                                thumbnailUrl={video.thumbnails.maxres.url}
                                id={video.id}
                                title={video.title}
                                duration={video.duration}
                                publishedAt={video.publishedAt}
                                description={video.description}
                                onClick={(e) => {
                                    e.persist();
                                    dispatch(showTrainingVideoModal({
                                        url: video.thumbnails.maxres.url, modalType: 'training-videos', title: video.title, description: video.description, publishedAt: video.publishedAt, duration: video.duration, id: video.id
                                    }));
                                }} />
                        </FlexGridCol>))
                    }
                </FlexGridRow>
            </div>
        </section>);
};

ListOfVideos.propTypes = propTypes;
export default ListOfVideos;

