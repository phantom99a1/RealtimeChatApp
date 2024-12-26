import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import Message from "./interfaces/Message";
import WaitingRoom from "./components/WaitingRoom";
import ChatRoom from "./components/ChatRoom";

const App = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try {
      //initiate a connection
      const connect = new HubConnectionBuilder()
        .withUrl("https://localhost:44355/chat")
        .configureLogging(LogLevel.Information)
        .build();
      //set up handler
      connect.on("JoinSpecificChatRoom", (userName: string, msg: string) => {
        console.log("msg: ", msg);
      });

      connect.on("ReceiveSpecificMessage", (userName, message) => {
        setMessages((messages) => [...messages, { userName, message }]);
      });

      await connect.start();
      await connect.invoke("JoinSpecificChatRoom", { userName, chatRoom });

      setConnection(connect);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message: string) => {
    try {      
      await connection?.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm="12">
              <h1 className="font-weight-light">Welcome to the F1 chatapp</h1>
            </Col>
          </Row>
          {!connection ? (
            <WaitingRoom joinChatRoom={joinChatRoom} />
          ) : (
            <ChatRoom messages={messages} sendMessage={sendMessage} />
          )}
        </Container>
      </main>
    </>
  );
};

export default App;
