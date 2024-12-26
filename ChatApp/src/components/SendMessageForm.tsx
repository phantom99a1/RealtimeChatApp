import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import SendMessage from "../interfaces/SendMessage";

const SendMessageForm = ({sendMessage}: SendMessage) => {
  const [message, setMessage] = useState("");
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => 
        { 
            e.preventDefault(); 
            await sendMessage(message);
            setMessage("");
        };
  return (
        <Form onSubmit={handleSubmit}>
           <InputGroup className="mb-3">
                <InputGroup.Text>Chat</InputGroup.Text>
                <Form.Control onChange={e => setMessage(e.target.value)} value={message} placeholder="Type a message" />
                <Button variant="primary" type="submit" disabled={!message}>Send</Button>
           </InputGroup> 
        </Form>
  );
};

export default SendMessageForm;
