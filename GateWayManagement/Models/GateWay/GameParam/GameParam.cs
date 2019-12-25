using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.GameParam
{
    [Table("gameParam")]
    public class GameParam
    {
        [Key]
        public int Id { set; get; }
        public int gameId { set; get; }
        public string name { set; get; }
        public decimal rate { set; get; }
    }
}
