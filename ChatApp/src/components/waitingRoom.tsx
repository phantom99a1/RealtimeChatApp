import React, { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";

interface ChildComponentProps { 
    joinChatRoom: (userName: string, chatRoom: string) => Promise<void>; 
}

const WaitingRoom = ({ joinChatRoom } : ChildComponentProps) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => 
    { 
        e.preventDefault(); 
        await joinChatRoom(userName, chatRoom);
    };
  return (
    <Form onSubmit={handleSubmit}>
        <Row className="px-5 py-5">
            <Col sm={12}>
                <Form.Group>
                    <Form.Control placeholder="UserName" 
                        onChange={e => setUserName(e.target.value)}/>
                    <Form.Control placeholder="ChatRoom"
                        onChange={e => setChatRoom(e.target.value)}/>
                </Form.Group>
            </Col>
            <Col sm={12}>
                <hr />
                <Button variant="success" type="submit">Join</Button> 
            </Col>
        </Row>        
    </Form>
  )
}

export default WaitingRoom