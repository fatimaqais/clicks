import React from 'react';
import styles from '../../styles/Post.module.css';
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        caption,
        image,
        updated_at,
        postPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.post.id }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className={`${styles.PostHeader}`}>
                    <Link to={`/profiles/${profile_id}`}>
                        <div className={styles.PostHeader}>
                            <Avatar src={profile_image} height={55} />
                            <h5>{owner}</h5>
                        </div>
                    </Link>
                    <div className="d-flex-end align-items-center">
                        <span className={styles.DropDown}>{updated_at}
                        {is_owner && postPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}</span>
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={caption} />
            </Link>
            <Card.Body className={styles.PostBar}>
                {caption && <Card.Title className="text-center">{caption}</Card.Title>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own post!</Tooltip>}
                        >
                            <i className="fa-regular fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fa-solid fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`fa-regular fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i className="fa-regular fa-heart" />
                        </OverlayTrigger>
                    )}
                    <span className='mr-2'>{likes_count}</span>
                    <Link to={`/posts/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    <span className='mr-2'>{comments_count}</span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Post