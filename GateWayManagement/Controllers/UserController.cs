using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using GateWayManagement.Models.CSM.ClientSys;
using GateWayManagement.Models;
using ChatAppWithSignalR.Hubs;
using GateWayManagement.Models.GateWay.User;
using GateWayManagement.Models.CSM.User;
using System.Linq;
using System.Net.Sockets;
using GateWayManagement.Services.CSM;

namespace GateWayManagement.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        private IUserService _userService;
        private IGateWayUserService _gateWayUserService;

        public UserController(IUserService userService, IGateWayUserService gateWayUserService)
        {
            _userService = userService;
            _gateWayUserService = gateWayUserService;
        }

        [HttpPost("[action]")]
        public JsonResult AutoLogin([FromBody]User localUser)
        {
            User user = _userService.GetUserByIPAsync(localUser.IP).Result;
            if (user is null)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.ParamsInvalid,
                    Reply = ""
                });
            }
            CustomUser customUser = _gateWayUserService.SelectUserFromId(user.UserId).Result;
            if (customUser is null)
            {
                CustomUser cus = new CustomUser();
                cus.UserId = user.UserId;
                cus.UserName = localUser.UserName is null ? "" : localUser.UserName;
                cus.Money = 0;
                _gateWayUserService.InsertNewUser(cus);
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.Success,
                    Reply = cus
                });
            }

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = customUser
            });
        }

        [HttpPost("[action]")]
        public JsonResult SignIn([FromBody]User localUser)
        {
            User user = _userService.GetUserByIPAsync(localUser.IP).Result;
            if (user is null)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.ParamsInvalid,
                    Reply = ""
                });
            }
            CustomUser customUser = _gateWayUserService.SelectUserFromId(user.UserId).Result;
            if (customUser is null)
            {
                CustomUser cus = new CustomUser();
                cus.UserId = user.UserId;
                cus.UserName = localUser.UserName;
                cus.Money = 0;
                _gateWayUserService.InsertNewUser(cus);
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.Success,
                    Reply = cus
                });
            }

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = user
            });
        }

        [HttpGet("[action]")]
        public List<User> GetAllUsers()
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;

            return context.GetAllUsers();
        }
    }
}