import React, { useEffect, useState } from "react";

import { Col, Row, Container } from "react-bootstrap";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useProfileData,useSetProfileData } from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profiles] = pageProfile.results;
    const is_owner = currentUser?.username === profiles?.owner;

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/profiles/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/profiles/${id}`);
            history.goBack();
        } catch (err) {
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}`),
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profiles?.image}
                    />
                </Col>
                <Col lg={6} className={styles.Text}>
                    <h3 className="m-2">{profiles?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>posts</div>
                            <div>{profiles?.posts_count}</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>events</div>
                            <div>{profiles?.events_count}</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>followers</div>
                            <div>{profiles?.followed_count}</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>following</div>
                            <div>{profiles?.following_count}</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profiles?.following_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                                onClick={() => handleUnfollow(profiles)}
                            >
                                unfollow
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                                onClick={() => handleFollow(profiles)}
                            >
                                follow
                            </Button>
                        ))}
                    <div className="d-flex-end align-items-center">
                        <span className={styles.DropDown}>
                            {is_owner && ProfilePage && (
                                <MoreDropdown
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                            )}</span>
                    </div>
                </Col>
                <hr />
                <p className={`"text-center" ${styles.Text}`}>About Me</p>
                <hr />
                <p className={`"text-center" ${styles.Text}`}>{profiles?.status}</p>
            </Row>
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;