using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.GameResult;
using GateWayManagement.Models.GateWay.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class GateWayEventResult : SqlRepository, IGateWayEventResult
    {
        public GateWayEventResult(string connectionString) : base(connectionString) { }

        public long InsertEventResult(GameResult result)
        {
            using (var conn = GetOpenConnection())
            {
                return conn.Insert(result);
            }
        }

        public List<GameResult> GetResult(int gameId, int userId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "Select e.userId, e.gameId, e.paramId, e.isUsed, e.code, p.name from eventresult e " +
                    "inner join gameparam p on e.paramId = p.id " +
                    "where e.gameId = @gameId and userId = @userId " +
                    "order by e.Id DESC";
                var parameters = new DynamicParameters();
                parameters.Add("@gameId", gameId, System.Data.DbType.Int32);
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                return conn.Query<GameResult>(sql, parameters).ToList();
            }
        }

        public bool UseCode(string code)
        {
            using (var conn = GetOpenConnection())
            {
                return conn.Update(new GameResult { code = code, isUsed = 1 });
            }
        }
    }
}
