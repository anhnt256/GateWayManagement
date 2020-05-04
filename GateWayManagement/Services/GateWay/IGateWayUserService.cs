using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.User;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public interface IGateWayUserService : ISqlRepository
    {
        Task<CustomUser> SelectUserFromId(int userId);
        long InsertNewUser(CustomUser user);
        bool UpdateNewUser(CustomUser user);
    }
}
