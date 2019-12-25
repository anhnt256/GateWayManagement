using Microsoft.AspNetCore.Mvc;
using GateWayManagement.Models;
using GateWayManagement.Services.CSM;

namespace GateWayManagement.Controllers
{

    [Route("api/[controller]")]
    public class PaymentController : Controller
    {
        private IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        #region Ajax

        [HttpPost("[action]")]
        public JsonResult GetAllByUserId([FromBody]int userId)
        {
            var payments = _paymentService.GetPaymentByUserId(userId);
            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = payments.Result,
            });
        }

        [HttpGet("[action]")]
        public JsonResult GetTopByType(int count, int paymentType)
        {
            var payments = _paymentService.GetTopByType(count, paymentType);
            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = payments.Result,
            });
        }
        #endregion
    }
}