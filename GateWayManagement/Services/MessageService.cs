using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using GateWayManagement.Models.Custom.Notification;

namespace GateWayManagement.Models.Services
{
    public class MessageService : IMessageService
    {
        public async Task<List<Message>> GetMessagesAsync()
        {
            //var messages = await _context.Messages.ToListAsync<Message>();

            return new List<Message>();
        }

        public async Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId)
        {
            //var messagesForRoom = await _context.Messages
            //                          .Where(m => m.RoomId == roomId)
            //                                   .ToListAsync<Message>();

            return new List<Message>();
        }

        public async Task<bool> AddMessageToRoomAsync(Guid roomId, Message message)
        {
            //message.Id = Guid.NewGuid();
            //message.RoomId = roomId;
            //message.PostedAt = DateTimeOffset.Now;

            //_context.Messages.Add(message);

            //var saveResults = await _context.SaveChangesAsync();

            //return saveResults > 0;
            return true;
        }
    }
}
