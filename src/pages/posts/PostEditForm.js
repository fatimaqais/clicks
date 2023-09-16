import React, { useEffect, useRef, useState } from "react";

import { Form, Button, Container, Alert } from "react-bootstrap";
import Upload from "../../assets/upload.png"

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function PostEditForm() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        caption: "",
        image: "",
    });
    const { caption, image } = postData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}`)
                const { caption, image, is_owner } = data;

                is_owner ? setPostData({ caption, image }) : history.push('/')
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("caption", caption);

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/posts/${id}`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <container className={`${styles.Container} `}>
                <Form.Group>
                    <Form.Control className={`${styles.Input}`}
                        placeholder="Enter a caption for your image!"
                        as="textarea"
                        rows={6}
                        name="caption"
                        value={caption}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.caption?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <div>
                    <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="submit">
                        Edit Post
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
            <h1 >Create a New Post!</h1>
            <Container className={`${appStyles.Content} ${styles.Container} text-center`}>
                <Form.Group className="text-center">

                    <Asset src={image} rounded />
                    <div>
                        <Form.Label
                            htmlFor="image-upload"
                            className={`${btnStyles.Button} ${btnStyles.Bright}`}
                        >
                            Change Image
                        </Form.Label>
                    </div>

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
                <div>{textFields}</div>
            </Container>
        </Form>
    );
}

export default PostEditForm;