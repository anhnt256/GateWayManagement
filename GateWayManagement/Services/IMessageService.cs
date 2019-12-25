using GateWayManagement.Models.Custom.Notification;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Models.Services
{
    public interface IMessageService
    {
        Task<List<Message>> GetMessagesAsync();
        Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId);
        Task<bool> AddMessageToRoomAsync(Guid roomId, Message message);
    }
}
