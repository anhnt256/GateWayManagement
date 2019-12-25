using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class GateWayGameService : SqlRepository, IGateWayGameService
    {
        public GateWayGameService(string connectionString) : base(connectionString) { }

        public List<Game> SelectAllGames()
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "Select * from game";
                return conn.Query<Game>(sql).ToList();
            }
        }
    }
}
