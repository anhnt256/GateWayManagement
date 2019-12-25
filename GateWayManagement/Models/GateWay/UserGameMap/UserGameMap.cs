using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.UserGameMap
{
    [Table("usergamemap")]
    public class UserGameMap
    {
        [Key]
        public int Id { get; set; }
        public int userId { get; set; }
        public int gameId { get; set; }
        public int round { get; set; }
    }
}
