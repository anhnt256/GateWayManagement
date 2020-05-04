using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Recipe
{
  public class Recipe
  {
    public int id { set; get; }
    public string name { set; get; }
    public string avatar { set; get; }
    public double sell_price { set; get; }
    public string description { set; get; }
    public int recipe_group { set; get; }
  }
}
