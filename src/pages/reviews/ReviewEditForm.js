import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";

function ReviewEditForm(props) {
    const { id, review, rating, setShowEditForm, setReviews } = props;

    const [formContent, setFormContent] = useState(review);
    const [formRating, setFormRating] = useState(rating);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleRating = (event) => {
        setFormRating(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/eventreviews/${id}`, {
                review: formContent.trim(),
                rating: formRating.trim(),
            });
            setReviews((prevReviews) => ({
                ...prevReviews,
                results: prevReviews.results.map((eventreviews) => {
                    return eventreviews.id === id
                        ? {
                            ...eventreviews,
                            review: formContent.trim(),
                            rating: formRating.trim(),
                            updated_at: "now",
                        }
                        : eventreviews;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
                <Form.Control className={`${styles.Input}`}
                    as="select"
                    name="rating"
                    value={formRating}
                    onChange={handleRating}
                >
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Bad</option>
                    <option>Horrible</option>
                </Form.Control>
            </Form.Group>
            <div className="text-right">
                <button
                    className={styles.Button}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    cancel
                </button>
                <button
                    className={styles.Button}
                    disabled={(!review.trim() || !rating.trim())}
                    type="submit"
                >
                    save
                </button>
            </div>
        </Form>
    );
}

export default ReviewEditForm;