using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.CSM.Payment;
using GateWayManagement.Models.CSM.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class PaymentService : SqlRepository, IPaymentService
    {
        public PaymentService(string connectionString) : base(connectionString) { }

        public async Task<IEnumerable<Payment>> GetPaymentByUserId(int userId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "select * from paymenttb where userId = @userId";
                var parameters = new DynamicParameters();
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                return await conn.QueryAsync<Payment>(sql, parameters);
            }
        }

        public async Task<IEnumerable<Payment>> GetTopByType(int count, int paymentType = 4)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = $"SELECT userId, SUM(amount) totalAmount FROM paymenttb" +
                    $" WHERE paymentType = @paymentType " +
                    $" GROUP BY userId " +
                    $"ORDER BY SUM(amount) DESC LIMIT @count";
                var parameters = new DynamicParameters();
                parameters.Add("@count", count, System.Data.DbType.Int32);
                parameters.Add("@paymentType", paymentType, System.Data.DbType.Int32);
                return await conn.QueryAsync<Payment>(sql, parameters);
            }
        }

        public decimal GetTotalPaymentByUserId(int userId)
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "select sum(amount) as amount from paymenttb " +
                    "where userId = @userId and paymentType = 4 and VoucherNo <> 'KM' " +
                    "and (serveDate between cast('2019-12-24' as date) and CAST('2020-01-01' as date))";
                var parameters = new DynamicParameters();
                parameters.Add("@userId", userId, System.Data.DbType.Int32);
                return conn.ExecuteScalar(sql, parameters) is null ? 0 : (decimal)conn.ExecuteScalar(sql, parameters);
            }
        }

    }
}
