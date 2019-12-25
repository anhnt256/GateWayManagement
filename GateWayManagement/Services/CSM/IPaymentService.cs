using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.Payment;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public interface IPaymentService : ISqlRepository
    {
        Task<IEnumerable<Payment>> GetPaymentByUserId(int userId);
        Task<IEnumerable<Payment>> GetTopByType(int count, int type);
        decimal GetTotalPaymentByUserId(int userId);
    }
}
