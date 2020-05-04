using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using GateWayManagement.Models;
using GateWayManagement.Models.GateWay.Notification;
using Microsoft.AspNetCore.Http;
using GateWayManagement.Models.GateWay.Order;

namespace ChatAppWithSignalR.Hubs
{
    public class ChatHub : Hub
    {
        public int UsersOnline;


        public async Task SendRequestToAdmin(string user_id, string message, MessageType type)
        {
            await Clients.All.SendAsync("RequestReceived", user_id, message, type);
        }

        public async Task SendResponseToClient(string user_id, string message)
        {
            await Clients.All.SendAsync("SendResponseToClient");
        }

        public async Task SendMessage(Guid roomId, string user, string message)
        {
            Message m = new Message()
            {
                RoomId = roomId,
                Contents = message,
                UserName = user
            };

            await Clients.All.SendAsync("ReceiveMessage", user, message, roomId, m.Id, m.PostedAt);
        }

        public async Task AddChatRoom(string roomName)
        {
            ChatRoom chatRoom = new ChatRoom()
            {
                Name = roomName
            };

            await Clients.All.SendAsync("NewRoom", roomName, chatRoom.Id);
        }

        public override async Task OnConnectedAsync()
        {
            UsersOnline++;
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            UsersOnline--;
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}