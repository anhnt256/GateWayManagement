using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.GameParam;
using GateWayManagement.Models.GateWay.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class GateWayGameParamService : SqlRepository, IGateWayGameParamService
    {
        public GateWayGameParamService(string connectionString) : base(connectionString) { }

        public List<GameParam> SelectAllGameParam(int gameId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "Select * from gameParam where gameId = @gameId";
                var parameters = new DynamicParameters();
                parameters.Add("@gameId", gameId, System.Data.DbType.Int32);
                return conn.Query<GameParam>(sql, parameters).ToList();
            }
        }
    }
}
