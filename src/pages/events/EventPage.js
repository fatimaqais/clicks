import React, { useEffect, useState } from "react";

import {Col, Row, Container} from "react-bootstrap";

import appStyles from "../../App.module.css";
import styles from "../../styles/Review.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import Review from "../reviews/Review";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import PopularProfiles from "../profiles/PopularProfiles";

function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [eventreviews, setReviews] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: event }, { data: eventreviews }] = await Promise.all([
                    axiosReq.get(`/events/${id}`),
                    axiosReq.get(`/eventreviews/?event=${id}`)
                ]);
                setEvent({ results: [event] });
                console.log(await axiosReq.get(`/comments/?post=${id}`))
                setReviews(eventreviews);
            } catch (err) {

            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Event {...event.results[0]} setEvent={setEvent} eventPage />
                <Container className={`${appStyles.Content} ${styles.ReviewHeading}`}>
                    {currentUser ? (
                        <ReviewCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            event={id}
                            setEvent={setEvent}
                            setReviews={setReviews}
                        />
                    ) : eventreviews.results.length ? (
                        "Reviews"
                    ) : null}
                    {eventreviews.results.length ? (
                        eventreviews.results.map((review) => (
                            <Review key={review.id} {...review} setEvent={setEvent} setReviews={setReviews} />
                        ))
                    ) : currentUser ? (
                        <span>No reviews yet, be the first to leave a review!</span>
                    ) : (
                        <span>No reviews... yet</span>
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default EventPage;