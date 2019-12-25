using GateWayManagement.Models.GateWay.Notification;
using GateWayManagement.Models.GateWay.Order;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Models.Services
{
    public interface IOrderService
    {
        Task<bool> GetAll(Order order);
    }
}
