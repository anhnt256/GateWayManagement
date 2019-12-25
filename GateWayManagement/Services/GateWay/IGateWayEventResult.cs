using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.GameResult;
using GateWayManagement.Models.GateWay.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public interface IGateWayEventResult : ISqlRepository
    {
        List<GameResult> GetResult(int gameId, int userId);
        long InsertEventResult(GameResult result);
        bool UseCode(string code);
    }
}
