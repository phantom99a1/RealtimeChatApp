using Microsoft.AspNetCore.SignalR;
using RealtimeChatApp.DataService;
using RealtimeChatApp.Models;

namespace RealtimeChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;

        public ChatHub(SharedDb shared) => _shared = shared;
        public async Task JoinChat(UserConnection connection)
        {
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{connection.UserName} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            _shared.connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom)
                .SendAsync("JoinSpecificChatRoom", "admin", $"{connection.UserName} has joined {connection.ChatRoom}");
        }

        public async Task SendMessage(string message)
        {
            if(_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
            {
                await Clients.Groups(connection.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", connection.UserName, message);
            }
        }
    }
}
