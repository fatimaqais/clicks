import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, text, id, setPost, setComments, } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count - 1,
                    },
                ],
            }));

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
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
                        <CommentEditForm
                            id={id}
                            profile_id={profile_id}
                            text={text}
                            profileImage={profile_image}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p className={styles.Text}>{text}</p>
                    )}
                </Media.Body>
            </Media>
        </div>
    );
};

export default Comment;