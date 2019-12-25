using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.User
{
    [Table("user")]
    public class CustomUser
    {
        [Key]
        public string ID { set; get; }
        public int UserId { set; get; }
        public int Money { set; get; }
        public string UserName { set; get; }
    }
}
