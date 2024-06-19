import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import './AIchat.css';

function AIchat() {
return (
<Container>
    <Row>
    <Col>
        <div className="chat-container">
        {/* {chat.map((chatMessage, index) => (
            <div key={index} className={`chat-message ${chatMessage.type}`}>
            {chatMessage.text}
            </div>
        ))} */}
        </div>
        <Form>
        <Row>
        <Col md={11}>
        <Form.Group>
            <Form.Control
            type="text"
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
            // onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            />
        </Form.Group>
        </Col>
        <Col md={1}>
        <Button variant="dark"> 
         {/* I Commented the onClick to be put back */}
         {/* onClick={sendMessage} */} 
            Send
        </Button>
        </Col>
        </Row>
        </Form>
    </Col>
    </Row>
</Container>
);
}

export default AIchat;
