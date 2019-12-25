using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using GateWayManagement.Models.CSM.Service;
using GateWayManagement.Models.CSM.ServiceDetail;

namespace GateWayManagement.Controllers
{
    [Route("api/[controller]")]
    public class ServiceController : Controller
    {
        [HttpGet("[action]")]
        public List<Service> GetAll()
        {
            ServiceContext context = HttpContext.RequestServices.GetService(typeof(ServiceContext)) as ServiceContext;
            
            return context.GetAllServices();
        }

        [HttpPost("[action]")]
        public void SubmitOrder([FromBody]ServiceDetailModel serviceModel) {
            ServiceDetailContext context = HttpContext.RequestServices.GetService(typeof(ServiceDetailContext)) as ServiceDetailContext;
            foreach (var order in serviceModel.orders)
            {
                order.StaffId = 2;
                order.ServiceDate = DateTime.Now.ToString("yyyy-MM-dd");
                order.ServiceTime = DateTime.Now.ToString("HH:mm:ss");
                context.InsertServiceDetail(order);
            }
        }
    }
}