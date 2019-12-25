using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Game
{
    [Table("game")]
    public class Game
    {
        [Key]
        public int Id { set; get; }
        public string name { set; get; }
    }
}
