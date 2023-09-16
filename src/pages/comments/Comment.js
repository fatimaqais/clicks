import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, text } = props;

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
                    </div>
                    <p className={styles.Text}>{text}</p>
                </Media.Body>
            </Media>
        </div>
    );
};

export default Comment;