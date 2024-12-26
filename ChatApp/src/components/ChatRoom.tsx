import { Col, Row } from "react-bootstrap"
import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessageForm"
import Message from "../interfaces/Message"

interface MessageListProps {
   messages: Message[]; sendMessage: (message: string) => Promise<void>; 
  }
const ChatRoom = ({messages,sendMessage} : MessageListProps) => {
  return (
    <>
       <Row className="px-5 py-5">
            <Col sm={10}>
                <h2>ChatRoom</h2>
            </Col>
            
       </Row>
       <Row className="px-5 py-5">
            <Col sm={12}>
                <MessageContainer messages = {messages}/>
            </Col>
            <Col>
                <SendMessageForm sendMessage={sendMessage}/>
            </Col>
       </Row>
    </>
  )
}

export default ChatRoom