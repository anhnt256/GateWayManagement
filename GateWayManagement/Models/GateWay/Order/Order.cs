using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Order
{
  public class Order
  {
    public int id { set; get; }
    public string encrypt_id { set; get; }
    public int user_id { set; get; }
    public int process_by { set; get; }
    public int status { set; get; }
    public double sub_total { set; get; }
    public int voucher_id { set; get; }
    public double total { set; get; }
    public int created_date { set; get; }
  }
}
