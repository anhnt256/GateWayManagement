using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using GateWayManagement.Models.GateWay.Material;
using GateWayManagement.Models;
using GateWayManagement.Models.GateWay.Order;
using System.Net;
using System.Net.Sockets;
using GateWayManagement.Models.GateWay.Computer;

namespace GateWayManagement.Controllers
{

    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;

        public OrderController(IWebHostEnvironment environment)
        {
            _hostingEnvironment = environment;
        }
        public IActionResult Index()
        {
            return View();
        }

        #region Ajax

        [HttpPost("[action]")]
        public JsonResult GetAll([FromBody]OrderModel model)
        {
            IPAddress localIP = LocalIPAddress(Dns.GetHostName());
            string ip = "192.168.110.132";
            OrderContext orderContext = HttpContext.RequestServices.GetService(typeof(OrderContext)) as OrderContext;
            Order order = model.order;
            ComputerContext computerContext = HttpContext.RequestServices.GetService(typeof(ComputerContext)) as ComputerContext;
            List<Computer> computers = computerContext.GetAll(ip);
            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = orderContext.GetAll(order.statuses, order.user_id, computers[0].name),
            });
        }

        [HttpPost("[action]")]
        public IActionResult SetOrder([FromBody]OrderModel model)
        {
            OrderContext orderContext = HttpContext.RequestServices.GetService(typeof(OrderContext)) as OrderContext;
            Order order = model.order;
            if (order.type == (int)MessageType.Food)
            {
                if (order.details.Count > 0)
                {
                    for (int i = 0; i < order.details.Count; i++)
                    {
                        Order detail = new Order();
                        detail.user_id = order.user_id;
                        detail.type = order.type;
                        detail.dish_id = order.details[i].dish_id;
                        detail.quantity = order.details[i].quantity;
                        detail.money = order.details[i].money;
                        detail.note = order.details[i].note;
                        detail.status = order.status;
                        detail.created_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                        orderContext.SetOrder(detail);
                    }
                }
            }
            else {
                order.created_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                orderContext.SetOrder(order);
            }
            
            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = "1"
            });
        }
        #endregion

        private IPAddress LocalIPAddress(string hostName)
        {
            if (!System.Net.NetworkInformation.NetworkInterface.GetIsNetworkAvailable())
            {
                return null;
            }

            IPHostEntry host = Dns.GetHostEntry(hostName);

            return host
                .AddressList
                .FirstOrDefault(ip => ip.AddressFamily == AddressFamily.InterNetwork);
        }
    }
}