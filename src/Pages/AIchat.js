import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FaUser, FaRobot, FaPaperPlane,FaEdit } from 'react-icons/fa';
import './AIchat.css';

function AIchat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [editMessageId, setEditMessageId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!sessionId) {
            createNewSession();
        }
    }, [sessionId]);

    const createNewSession = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/chat/new-session');
            setSessionId(response.data.sessionId);
            setChat([]);
        } catch (error) {
            console.error('Error creating new session:', error);
        }
    };

    const sendMessage = async () => {
        if (message.trim() === '') return;
    
        if (editMessageId) {
            editExistingMessage();
            return;
        }
    
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5001/api/chat/message', { message, sessionId });
            setChat([...chat, { type: 'user', text: message, messageId: response.data.messageId }, { type: 'bot', text: response.data.reply }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('Failed to send message. Please try again.');
        }
        setIsLoading(false);
        setMessage('');
    };

    const editExistingMessage = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`http://localhost:5001/api/chat/message/${editMessageId}`, { message });
            const updatedChat = chat.map(chatMessage => {
                if (chatMessage.messageId === editMessageId) {
                    return { ...chatMessage, text: message };
                }
                if (chatMessage.type === 'bot' && chatMessage.text.includes(chatMessage.text)) {
                    return { ...chatMessage, text: response.data.reply };
                }
                return chatMessage;
            });
            setChat(updatedChat);
            setEditMessageId(null);
        } catch (error) {
            console.error('Error editing message:', error);
        }
        setIsLoading(false);
        setMessage('');
    };

    const startEditingMessage = (messageId, text) => {
        setMessage(text);
        setEditMessageId(messageId);
    };

    const deleteSession = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/chat/session/${sessionId}`);
            createNewSession();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="text-center mb-4">AI Chat</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="chat-container p-3 border rounded">
                        {chat.map((chatMessage, index) => (
                            <div key={index} className={`chat-message ${chatMessage.type} mb-2 p-2 rounded`}>
                                {chatMessage.type === 'user' ? <FaUser className="mr-2" /> : <FaRobot className="mr-2" />}
                                {chatMessage.text}
                                {chatMessage.type === 'user' && (
                                    <Button variant="link" size="sm" onClick={() => startEditingMessage(chatMessage.messageId, chatMessage.text)}><FaEdit /></Button>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        )}
                    </div>
                    <Form className="mt-3">
                        <Row>
                            <Col md={11}>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder="Type your message..."
                                        className="rounded-pill"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Button variant="dark" onClick={sendMessage} className="rounded-circle">
                                    <FaPaperPlane />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Button variant="outline-danger" className="mt-3" onClick={deleteSession}>Start New Chat</Button>
                </Col>
            </Row>
        </Container>
    );    
}

export default AIchat;