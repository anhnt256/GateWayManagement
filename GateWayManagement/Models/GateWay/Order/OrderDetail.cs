using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Order
{
    public class OrderDetail
    {
        public int dish_id { set; get; }
        public int quantity { set; get; }
        public int money { set; get; }
        public string note { set; get; }
    }
}
