import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
    const { event, setReviews, setEvent, profile_id, profileImage } = props;

    const [review, setFormContent] = useState("");
    const [rating, setFormRating] = useState();

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleRating = (event) => {
        setFormRating(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosRes.post(`/eventreviews/`, {
                review,
                rating,
                event
            });
            setReviews((prevReviews) => ({
                ...prevReviews,
                results: [data, ...prevReviews.results],
            }));
            setEvent((prevEvent) => ({
                results: [
                    {
                        ...prevEvent.results[0],
                        reviews_count: prevEvent.results[0].reviews_count + 1,
                    },
                ],
            }));
        } catch (err) {
            // console.log(err);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="my comment..."
                        as="textarea"
                        value={review}
                        onChange={handleChange}
                        rows={2}
                    />
                    <Form.Control className={`${styles.Input}`}
                        as="select"
                        name="rating"
                        value={rating}
                        onChange={handleRating}
                    >
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Average</option>
                        <option>Bad</option>
                        <option>Horrible</option>
                    </Form.Control>
                </InputGroup>
            </Form.Group>
            <button
                className={`${styles.Button} d-block `}
                type="submit"
            >
                Post
            </button>
        </Form>
    );
}

export default ReviewCreateForm;