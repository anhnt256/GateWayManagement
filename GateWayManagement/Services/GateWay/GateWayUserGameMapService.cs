using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.User;
using GateWayManagement.Models.GateWay.UserGameMap;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class GateWayUserGameMapService : SqlRepository, IGateWayUserGameMapService
    {
        public GateWayUserGameMapService(string connectionString) : base(connectionString) { }


        public long InsertUserGameMap(UserGameMap userGameMap)
        {
            using (var conn = GetOpenConnection())
            {
                return conn.Insert(userGameMap);
            }
        }

        public async Task<int> CheckRound(int userId, int gameId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "Select round from userGameMap where userId = @userId and gameId = @gameId";
                var parameters = new DynamicParameters();
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                parameters.Add("@gameId", gameId, System.Data.DbType.Int32);
                return await conn.QueryFirstOrDefaultAsync<int>(sql, parameters);
            }
        }

        public async Task<UserGameMap> CheckExist(int userId, int gameId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "Select * from userGameMap where userId = @userId and gameId = @gameId";
                var parameters = new DynamicParameters();
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                parameters.Add("@gameId", gameId, System.Data.DbType.Int32);
                return await conn.QueryFirstOrDefaultAsync<UserGameMap>(sql, parameters);
            }
        }

        public int UpdateRound(int userId, int gameId, int? round)
        {
            using (var conn = GetOpenConnection())
            {
                string sql = string.Empty;
                if (round.HasValue)
                {
                    sql = "update usergamemap set round = @round where gameId = @gameId and userId = @userId";
                }
                else {
                    sql = "update usergamemap set round = round - 1 where gameId = @gameId and userId = @userId";
                }
                var parameters = new DynamicParameters();
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                parameters.Add("@gameId", gameId, System.Data.DbType.Int32);
                if (round.HasValue)
                {
                    parameters.Add("@round", round.Value, System.Data.DbType.Int32);
                }
                return conn.Execute(sql, parameters);
            }
        }

        public int CalcRound(int userId, int gameId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "update usergamemap set round = round - 1 where gameId = @gameId and userId = @userId";
                var parameters = new DynamicParameters();
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                parameters.Add("@gameId", gameId, System.Data.DbType.Int32);
                return conn.Execute(sql, parameters);
            }
        }
    }
}
