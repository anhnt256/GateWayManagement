using Microsoft.AspNetCore.Mvc;
using GateWayManagement.Services.GateWay;
using GateWayManagement.Models;

namespace GateWayManagement.Controllers
{

  [Route("api/[controller]")]
  public class OrderController : Controller
  {
    private IGateWayOrderService _orderService;

    public OrderController(IGateWayOrderService orderService)
    {
      _orderService = orderService;
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
  }
}