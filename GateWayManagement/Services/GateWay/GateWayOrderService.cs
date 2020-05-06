using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.GameParam;
using GateWayManagement.Models.GateWay.Order;
using GateWayManagement.Models.GateWay.Recipe;
using GateWayManagement.Models.GateWay.User;
using GateWayManagement.Services.GateWay;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
  public class GateWayOrderService : SqlRepository, IGateWayOrderService
  {
    public GateWayOrderService(string connectionString) : base(connectionString) { }

    public List<Order> GetAll()
    {
      using (var conn = GetOpenConnection())
      {
        var sql = "select o.*, o.id as `key`, u.username, u1.username as processer_name " +
          "from orders o " +
          "inner join user u on o.user_id = u.userId " +
          "inner join user u1 on o.process_by = u1.userId where o.status in (2,3) " +
          "order by created_date DESC";
        return conn.Query<Order>(sql).ToList();
      }
    }

    public List<Order> GetOrderByUserId(int userId)
    {
      using (var conn = GetOpenConnection())
      {
        var sql = "Select * from orders where user_id = @userId order by created_date DESC";
        var parameters = new DynamicParameters();
        parameters.Add("@userId", userId, System.Data.DbType.Int32);
        return conn.Query<Order>(sql, parameters).ToList();
      }
    }
  }
}
