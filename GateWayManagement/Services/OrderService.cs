using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GateWayManagement.Models.GateWay;
using Microsoft.Extensions.DependencyInjection;
using GateWayManagement.Models.GateWay.Order;
using GateWayManagement.Models.Services;
using System.Net;
using GateWayManagement.Models.GateWay.Computer;
using System.Net.Sockets;

namespace GateWayManagement.Services
{
    public class OrderService: IOrderService
    {
        private OrderContext orderContext;
        private ComputerContext computerContext;
        public OrderService(IServiceProvider serviceProvider)
        {
            var orderContext = serviceProvider.GetService<OrderService>();
            var computerContext = serviceProvider.GetService<ComputerContext>();
        }
        public async Task<bool> GetAll(Order order)
        {
            IPAddress localIP = LocalIPAddress(Dns.GetHostName());
            string ip = "192.168.110.132";
            List<Computer> computers = computerContext.GetAll(ip);
            var messages = orderContext.GetAll(order.statuses, order.user_id, computers[0].name);
            return true;
        }

        public async Task<bool> SetOrder(Order order)
        {
            orderContext.SetOrder(order);
            return true;
        }

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
