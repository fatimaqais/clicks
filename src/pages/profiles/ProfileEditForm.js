import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Col, Row, Container, Alert, Image, Form, Button } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        status: "",
        image: "",
    });
    const { name, status, image } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}`);
                    const { name, status, image } = data;
                    setProfileData({ name, status, image });
                } catch (err) {
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("status", status);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    value={status}
                    onChange={handleChange}
                    name="status"
                    rows={7}
                />
            </Form.Group>

            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <div>
                <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} onClick={() => history.goBack()}>
                    Cancel
                </Button>
                <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="submit" onClick={() => history.goBack()}>
                    Save
                </Button>
            </div>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                    <Container className={appStyles.Content}>
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image src={image} fluid />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} my-auto`}
                                    htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>
                            <Form.File
                                id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
};

export default ProfileEditForm;