using Dapper;
using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class UserService : SqlRepository, IUserService
    {
        public UserService(string connectionString) : base(connectionString) { }

        public async Task<User> GetUserByIPAsync(string ip)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "select UserId, MachineName from systemlogtb " +
                    "where IPAddress = @IP and status = 3 " +
                    "ORDER BY SystemLogId DESC " +
                    "LIMIT 1";
                var parameters = new DynamicParameters();
                parameters.Add("@IP", ip, System.Data.DbType.String);
                return await conn.QueryFirstOrDefaultAsync<User>(sql, parameters);
            }
        }
    }
}
