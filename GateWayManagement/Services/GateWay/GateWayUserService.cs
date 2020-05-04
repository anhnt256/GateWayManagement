using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class GateWayUserService : SqlRepository, IGateWayUserService
    {
        public GateWayUserService(string connectionString) : base(connectionString) { }

        public async Task<CustomUser> SelectUserFromId(int userId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "Select * from user where userId = @userId";
                var parameters = new DynamicParameters();
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                return await conn.QueryFirstOrDefaultAsync<CustomUser>(sql, parameters);
            }
        }

        public long InsertNewUser(CustomUser user)
        {
            using (var conn = GetOpenConnection())
            {
                return conn.Insert(user);
            }
        }

        public bool UpdateNewUser(CustomUser user)
        {
            using (var conn = GetOpenConnection())
            {
                return conn.Update(user);
            }
        }
    }
}
