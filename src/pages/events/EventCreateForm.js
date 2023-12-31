import React, { useRef, useState } from "react";

import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import Upload from "../../assets/upload.png"

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function EventCreateForm() {

    const [errors, setErrors] = useState({});

    const [eventData, setEventData] = useState({
        title: "",
        image: "",
        details: "",
        date: "",
        category: "",
    });
    const { title, image, details, date, category } = eventData;

    const imageInput = useRef(null);
    const history = useHistory()

    const handleChange = (event) => {
        setEventData({
            ...eventData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setEventData({
                ...eventData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('image', imageInput.current.files[0])
        formData.append('title', title)
        formData.append('details', details)
        formData.append('date', date)
        formData.append('category', category)

        try {
            const { data } = await axiosReq.post("/events/", formData);
            history.push(`/events/${data.id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    }

    const textFields = (
        <div className="text-center">
            <container className={`${styles.Container} `}>
                <Form.Group>
                    <Form.Label className={styles.Form}>Enter a Title:</Form.Label>
                    <Form.Control className={`${styles.Input}`}
                        placeholder="Enter the title for your Event"
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.title?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Group>
                    <Form.Label className={styles.Form}>Enter details for the Event:</Form.Label>
                    <Form.Control className={`${styles.Input}`}
                        placeholder="Enter details for your Event!"
                        as="textarea"
                        rows={6}
                        name="details"
                        value={details}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.details?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Group>
                    <Form.Label className={styles.Form}>Select a date for the Event:</Form.Label>
                    <Form.Control className={`${styles.Input}`}
                        type="date"
                        name="date"
                        value={date}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.date?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Group controlId="category">
                    <Form.Label className={styles.Form}>Please select an option from the category below:</Form.Label>
                    <Form.Control className={`${styles.Input}`}
                        as="select"
                        name="category"
                        value={category}
                        onChange={handleChange}
                    >
                        <option>General</option>
                        <option>Food</option>
                        <option>Education</option>
                        <option>Job</option>
                        <option>Family</option>
                        <option>Culture</option>
                        <option>Music</option>
                    </Form.Control>
                </Form.Group>
                <div>
                    <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="submit">
                        Create
                    </Button>
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Bright}`}
                        onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                </div>
            </container>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Create a New Event!</h1>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container className={`${appStyles.Content} ${styles.Container}`}>
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <Asset src={image} rounded />
                                    <div>
                                        <Form.Label
                                            htmlFor="image-upload"
                                        >
                                            <Button className={`${btnStyles.Button} ${btnStyles.Bright}`}>
                                                Change Image
                                            </Button>
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}
                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message = "Please insert an image."}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form >
    );
}

export default EventCreateForm;