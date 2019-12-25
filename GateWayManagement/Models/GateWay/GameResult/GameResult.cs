using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.GameResult
{
    [Table("eventResult")]
    public class GameResult
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int gameId { get; set; }
        public int paramId { get; set; }
        [Write(false)]
        [Computed]
        public string name { get; set; }
        public string code { get; set; }
        public int isUsed { get; set; }
    }
}
