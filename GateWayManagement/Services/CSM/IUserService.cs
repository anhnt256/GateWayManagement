using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public interface IUserService : ISqlRepository
    {
        Task<User> GetUserByIPAsync(string ip);
    }
}
