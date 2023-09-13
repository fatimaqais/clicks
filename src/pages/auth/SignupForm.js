import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    })
    const { username, password1, password2 } = signUpData;
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            history.push('/signin');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row className={styles.Row}>
            <Container className={`${appStyles.Content}  p-4 `}>
                <h1 className={styles.Header}>Sign Up</h1>
                <div className={styles.Form}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="" controlId="username">
                            <Form.Label className="d-none" >Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label className="d-none">Confirm Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                            Submit
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert className="col-md-5 mx-auto" key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                    <Link className={styles.Link} to="/signin">
                        Already have an account? <span>Sign in</span>
                    </Link>
                </div>
            </Container>
        </Row>
    );
};

export default SignUpForm;