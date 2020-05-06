using GateWayManagement.Helper;
using GateWayManagement.Models.GateWay.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.GateWay
{
  public interface IGateWayOrderDetailService : ISqlRepository
  {
    List<OrderDetail> GetAll(int order_id);
  }
}
