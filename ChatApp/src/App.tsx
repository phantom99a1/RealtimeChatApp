import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WaitingRoom from "./components/waitingRoom";
import { useState } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const App = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try {
        //initiate a connection
        const connnect = new HubConnectionBuilder()
                        .withUrl("https://localhost:44355/chat")
                        .configureLogging(LogLevel.Information)
                        .build();
        //set up handler
        connnect.on("JoinSpecificChatRoom", (userName : string, msg : string) =>{
            console.log("msg: ", msg);
        });
        await connnect.start();
        await connnect.invoke("JoinSpecificChatRoom", {userName, chatRoom});

        setConnection(connnect);
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
          <WaitingRoom joinChatRoom={joinChatRoom} />
        </Container>
      </main>
    </>
  );
};

export default App;
