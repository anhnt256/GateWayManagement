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
  public class GateWayOrderDetailService : SqlRepository, IGateWayOrderDetailService
  {
    public GateWayOrderDetailService(string connectionString) : base(connectionString) { }

    public List<OrderDetail> GetAll(int order_id)
    {
      using (var conn = GetOpenConnection())
      {
        var sql = "select * from orderdetail o where o.order_id = @order_id";
        var parameters = new DynamicParameters();
        parameters.Add("@order_id", order_id, System.Data.DbType.Int32);
        return conn.Query<OrderDetail>(sql, parameters).ToList();
      }
    }
  }
}
