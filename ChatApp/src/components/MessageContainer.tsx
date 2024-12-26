import MessageList from "../interfaces/MessageList";

const MessageContainer = ({ messages }: MessageList) => {
  return (
    <div className="table-responsive">
      <table className="striped bordered">
        <tbody>
          {messages.map((message, index) => {
            return (
              <tr key={index}>
                <td>
                  {message.message} - {message.userName}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MessageContainer;
