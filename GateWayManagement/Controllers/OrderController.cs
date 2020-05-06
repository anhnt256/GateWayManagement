using Microsoft.AspNetCore.Mvc;
using GateWayManagement.Services.GateWay;
using GateWayManagement.Models;

namespace GateWayManagement.Controllers
{

  [Route("api/[controller]")]
  public class OrderController : Controller
  {
    private IGateWayOrderService _orderService;
    private IGateWayOrderDetailService _orderDetailService;

    public OrderController(IGateWayOrderService orderService, IGateWayOrderDetailService orderDetailService)
    {
      _orderService = orderService;
      _orderDetailService = orderDetailService;
    }

    [HttpGet("[action]")]
    public JsonResult GetAllOrder()
    {
      return Json(new ResponseModel()
      {
        ResponseCode = ResponseCode.Success,
        Reply = _orderService.GetAll()
      });
    }

    [HttpGet("[action]")]
    public JsonResult GetAllOrderDetail(int order_id)
    {
      return Json(new ResponseModel()
      {
        ResponseCode = ResponseCode.Success,
        Reply = _orderDetailService.GetAll(order_id)
      });
    }
  }
}