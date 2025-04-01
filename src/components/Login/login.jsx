import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export default function SignUp() {
    const [formData, setFormData] = useState({
        User_id: "",
        User_name: "",
        Email: "",
        Password: "",
        Phone: "",
        Address: ""
    });
    
    const [message, setMessage] = useState("");
    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setMessage("Please fill in all fields correctly");
        } else {
            setMessage("Registration successful! (Local storage only)");
            console.log("Form submitted:", formData);
            
            // مسح النموذج بعد التسجيل
            setFormData({ 
                User_id: "", 
                User_name: "", 
                Email: "", 
                Password: "", 
                Phone: "", 
                Address: "" 
            });
        }
        
        setValidated(true);
    };

    return (
        <Container fluid className="bg-primary d-flex justify-content-center align-items-center min-vh-100">
            <Card className="shadow-lg p-4" style={{ width: '400px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <h2>Create an Account</h2>
                    </Card.Title>
                    
                    {message && (
                        <Alert variant={message.includes("success") ? "success" : "danger"}>
                            {message}
                        </Alert>
                    )}
                    
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formUserId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="User_id"
                                value={formData.User_id}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a user ID.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="User_name"
                                value={formData.User_name}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="Phone"
                                value={formData.Phone}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a phone number.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide an address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}