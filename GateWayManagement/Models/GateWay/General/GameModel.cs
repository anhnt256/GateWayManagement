using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.General
{
    public class GameModel
    {
        public int userId { get; set; }
        public int gameId { get; set; }
        public string ip { get; set; }
        public string code { get; set; }

    }
}
