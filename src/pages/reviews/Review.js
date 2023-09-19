import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Review.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import ReviewEditForm from "./ReviewEditForm";

const Review = (props) => {
    const { profile_id, profile_image, owner, updated_at, review, rating, id, setEvent, setReviews } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/eventreviews/${id}`);
            setEvent((prevEvent) => ({
                results: [
                    {
                        ...prevEvent.results[0],
                        reviews_count: prevEvent.results[0].reviews_count - 1,
                    },
                ],
            }));

            setReviews((prevReviews) => ({
                ...prevReviews,
                results: prevReviews.results.filter((review) => review.id !== id),
            }));
        } catch (err) { }
    };


    return (
        <div>
            <hr />
            <Media>
                <Media.Body className="align-self-center ml-2">
                    <div className={styles.CommentOwner}>
                        <Link to={`/profiles/${profile_id}`}>
                            <Avatar src={profile_image} />
                            <span className={styles.Owner}>{owner}</span>
                        </Link>
                        <span className={styles.Date}>{updated_at}</span>
                        {is_owner && !showEditForm && (
                            <MoreDropdown handleEdit={() => setShowEditForm(true)} handleDelete={handleDelete} />
                        )}
                    </div>
                    {showEditForm ? (
                        <ReviewEditForm
                            id={id}
                            profile_id={profile_id}
                            review={review}
                            rating={rating}
                            profileImage={profile_image}
                            setReviews={setReviews}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <span>
                            <p className={styles.Text}> {review}</p>
                            <p className={styles.Text}>I would rate it: {rating}</p>
                        </span>

                    )}
                </Media.Body>
            </Media>
        </div >
    );
};

export default Review;