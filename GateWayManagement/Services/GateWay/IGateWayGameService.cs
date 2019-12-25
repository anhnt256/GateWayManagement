using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public interface IGateWayGameService : ISqlRepository
    {
        List<Game> SelectAllGames();
    }
}
