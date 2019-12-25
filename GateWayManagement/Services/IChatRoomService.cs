using GateWayManagement.Models.Custom.Notification;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Models.Services
{
    public interface IChatRoomService
    {
        Task<List<ChatRoom>> GetChatRoomsAsync();
        Task<bool> AddChatRoomAsync(ChatRoom newChatRoom);
    }
}
