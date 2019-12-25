using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.User;
using GateWayManagement.Models.GateWay.UserGameMap;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public interface IGateWayUserGameMapService : ISqlRepository
    {
        Task<int> CheckRound(int userId, int gameId);
        Task<UserGameMap> CheckExist(int userId, int gameId);
        int UpdateRound(int userId, int gameId, int? round);
        long InsertUserGameMap(UserGameMap userGameMap);
    }
}
