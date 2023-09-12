import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
    return (
        <Row className={styles.Row}>
            <Container className={`${appStyles.Content}  p-4 `}>
                <h1 className={styles.Header}>Sign Up</h1>
                <div className={styles.Form}>
                    <Form>
                        <Form.Group className="" controlId="username">
                            <Form.Label className="d-none" >Username</Form.Label>
                            <Form.Control className={styles.Input} type="text" placeholder="Username" name="username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control className={styles.Input} type="password" placeholder="Password" name="password1" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label className="d-none">Confirm Password</Form.Label>
                            <Form.Control className={styles.Input} type="password" placeholder="Confirm Password" name="password2" />
                        </Form.Group>
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                            Submit
                        </Button>
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