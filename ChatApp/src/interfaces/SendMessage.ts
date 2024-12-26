interface SendMessage {
  sendMessage: (message: string) => Promise<void>;
}

export default SendMessage;
