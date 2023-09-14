import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

function SignInForm() {
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    })
    const { username, password } = signInData;
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/login/', signInData);
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row className={styles.Row}>
            <Container className={`${appStyles.Content} ${styles.Signinup} p-4 `}>
                <h1 className={styles.Header}>Sign In</h1>
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
                            <Alert variant="warning" className={styles.Alert} key={idx}>{message}</Alert>
                        ))}


                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password?.map((message, idx) => (
                            <Alert variant="warning" className={styles.Alert} key={idx}>{message}</Alert>
                        ))}

                        <div>
                            <div>
                                <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                                    Sign In
                                </Button>
                            </div>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert className={styles.Alert} key={idx} variant="warning">
                                    {message}
                                </Alert>
                            ))}

                        </div>
                    </Form>
                </div>

                <Link className={styles.Link} to="/signup">
                    Don't have an account? <span>Sign up now!</span>
                </Link>
            </Container>
        </Row>
    );
}

export default SignInForm;