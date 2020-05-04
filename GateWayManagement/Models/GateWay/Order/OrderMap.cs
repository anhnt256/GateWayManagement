using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Order
{
  public class OrderMap : Order
  {
    public List<OrderDetail> details { set; get; }
  }
}
