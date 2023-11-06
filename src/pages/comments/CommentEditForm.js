import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
    const { id, text, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(text);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}`, {
                text: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            text: formContent.trim(),
                            updated_at: "now",
                        }
                        : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className={`${styles.Display} text-right`}>
                <span><button
                    className={styles.Button}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    cancel
                </button></span>
                <span><button
                    className={styles.Button}
                    disabled={!text.trim()}
                    type="submit"
                >
                    save
                </button></span>
            </div>
        </Form>
    );
}

export default CommentEditForm;