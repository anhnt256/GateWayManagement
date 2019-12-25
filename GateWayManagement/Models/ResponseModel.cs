using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models
{
    public class ResponseModel
    {
        public ResponseCode ResponseCode { get; set; }
        public object Reply { get; set; }
    }
}
