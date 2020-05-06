using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Order
{
  public class OrderDetail
  {
    public int id { set; get; }
    public int order_id { set; get; }
    public int recipe_id { set; get; }
    public string recipe_name { set; get; }
    public int recipe_group { set; get; }
    public double sell_price { set; get; }
    public int quantity { set; get; }
    public string note { set; get; }
  }
}
