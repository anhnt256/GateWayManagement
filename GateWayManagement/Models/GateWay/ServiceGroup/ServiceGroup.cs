using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.ServiceGroup
{
  public class ServiceGroup
  {
    public int id { get; set; }
    public string name { get; set; }
    public int active { get; set; }
    public int order { get; set; }
  }
}
