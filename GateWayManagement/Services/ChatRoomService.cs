using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using GateWayManagement.Models.Custom.Notification;

namespace GateWayManagement.Models.Services
{
    public class ChatRoomService : IChatRoomService
    {
        public async Task<List<ChatRoom>> GetChatRoomsAsync()
        {
            var chatRooms = new List<ChatRoom>();

            return chatRooms;
        }

        public async Task<bool> AddChatRoomAsync(ChatRoom chatRoom)
        {
            //chatRoom.Id = Guid.NewGuid();

            //_context.ChatRooms.Add(chatRoom);

            //var saveResults = await _context.SaveChangesAsync();

            //return saveResults > 0;
            return true;
        }
    }
}