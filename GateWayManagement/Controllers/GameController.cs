using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GateWayManagement.Models;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.GameParam;
using GateWayManagement.Models.GateWay.GameResult;
using GateWayManagement.Models.GateWay.General;
using GateWayManagement.Models.GateWay.UserGameMap;
using GateWayManagement.Services.CSM;
using Microsoft.AspNetCore.Mvc;

namespace GateWayManagement.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private IGateWayGameService _gateWayGameService;
        private IGateWayGameParamService _gateWayGameParamService;
        private IGateWayUserGameMapService _gateWayUserGameMapService;
        private IGateWayEventResult _gateWayEventResultService;
        private IUserService _userService;
        private IPaymentService _paymentService;

        public GameController(
            IGateWayGameService gateWayGameService,
            IGateWayGameParamService gateWayGameParamService,
            IGateWayUserGameMapService gateWayUserGameMapService,
            IGateWayEventResult gateWayEventResultService,
            IUserService userService, 
            IPaymentService paymentService)
        {
            _gateWayGameService = gateWayGameService;
            _gateWayGameParamService = gateWayGameParamService;
            _gateWayUserGameMapService = gateWayUserGameMapService;
            _gateWayEventResultService = gateWayEventResultService;
            _userService = userService;
            _paymentService = paymentService;
        }

        [HttpGet("[action]")]
        public JsonResult GetAllGames()
        {
            List<Game> games = _gateWayGameService.SelectAllGames();

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = games
            });
        }

        [HttpPost("[action]")]
        public JsonResult CheckRound([FromBody]GameModel gameModel)
        {
            int userId = CheckLogin(gameModel.ip, gameModel.userId);
            if (userId == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.RequiredLogin,
                });
            }
            var round = _gateWayUserGameMapService.CheckRound(userId, gameModel.gameId).Result;

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = round
            });
        }

        [HttpPost("[action]")]
        public JsonResult CalcPrize([FromBody]GameModel gameModel)
        {
            int userId = CheckLogin(gameModel.ip, gameModel.userId);
            if (userId == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.RequiredLogin,
                });
            }
            var round = _gateWayUserGameMapService.CheckRound(userId, gameModel.gameId).Result;
            if (round == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.ParamsInvalid,
                });
            }
            var gameParams = _gateWayGameParamService.SelectAllGameParam(gameModel.gameId);
            var items = GenerationItems(gameParams);
            Random random = new Random();
            var result = items[random.Next(items.Length)];

            GameResult gameResult = new GameResult();
            gameResult.isUsed = 0;
            gameResult.userId = userId;
            gameResult.paramId = result;
            gameResult.code = Guid.NewGuid().ToString();
            gameResult.gameId = gameModel.gameId;

            _gateWayEventResultService.InsertEventResult(gameResult);
            _gateWayUserGameMapService.UpdateRound(userId, gameModel.gameId, null);

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = result,
            });
        }

        [HttpPost("[action]")]
        public JsonResult GetResult([FromBody]GameModel gameModel)
        {
            int userId = CheckLogin(gameModel.ip, gameModel.userId);
            if (userId == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.RequiredLogin,
                });
            }
            var eventResult = _gateWayEventResultService.GetResult(gameModel.gameId, userId);

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = eventResult
            });
        }

        [HttpPost("[action]")]
        public JsonResult UserGameMap([FromBody]GameModel gameModel)
        {
            int userId = CheckLogin(gameModel.ip, gameModel.userId);
            if (userId == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.RequiredLogin,
                });
            }

            var game = _gateWayUserGameMapService.CheckExist(userId, gameModel.gameId).Result;
            if (game is null)
            {
                var totalAmount = _paymentService.GetTotalPaymentByUserId(userId);
                var usedRound = _gateWayEventResultService.GetResult(gameModel.gameId, userId).Count;
                int totalRound = (int)totalAmount / 50000;
                int currentRound = totalRound - usedRound;

                UserGameMap userGameMap = new UserGameMap();
                userGameMap.gameId = gameModel.gameId;
                userGameMap.userId = userId;
                userGameMap.round = int.Parse(currentRound.ToString());
                var eventResult = _gateWayUserGameMapService.InsertUserGameMap(userGameMap);

                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.Success,
                    Reply = eventResult
                });
            }

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.ParamsInvalid,
            });
        }

        [HttpPost("[action]")]
        public JsonResult UseCode([FromBody]GameModel gameModel)
        {
            int userId = CheckLogin(gameModel.ip, gameModel.userId);
            if (userId == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.RequiredLogin,
                });
            }
            var eventResult = _gateWayEventResultService.UseCode(gameModel.code);

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = eventResult
            });
        }

        [HttpPost("[action]")]
        public JsonResult UpdateRound([FromBody]GameModel gameModel)
        {
            int userId = CheckLogin(gameModel.ip, gameModel.userId);
            if (userId == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.RequiredLogin,
                });
            }
            var eventResult = _gateWayUserGameMapService.CheckRound(gameModel.userId, gameModel.gameId);

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = eventResult
            });
        }

        [HttpPost("[action]")]
        public JsonResult CalcRound([FromBody]GameModel gameModel)
        {
            int userId = CheckLogin(gameModel.ip, gameModel.userId);
            if (userId == 0)
            {
                return Json(new ResponseModel()
                {
                    ResponseCode = ResponseCode.RequiredLogin,
                });
            }
            var totalAmount = _paymentService.GetTotalPaymentByUserId(userId);
            var usedRound = _gateWayEventResultService.GetResult(gameModel.gameId, userId).Count;
            int totalRound = (int)totalAmount / 50000;
            int currentRound = totalRound - usedRound;
            _gateWayUserGameMapService.UpdateRound(userId, gameModel.gameId, int.Parse(currentRound.ToString()));

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = currentRound,
            });
        }

        private int[] GenerationItems(List<GameParam> gameParams)
        {
            int[] items = new int[100];
            int index = 0;
            foreach (var item in gameParams)
            {
                for (int i = 0; i < item.rate; i++)
                {
                    items[index] = item.Id;
                    index++;
                }
            }
            return items;
        }

        private int CheckLogin(string ip, int userId)
        {
            User user = _userService.GetUserByIPAsync(ip).Result;
            if (user is null || user.UserId != userId)
            {
                return 0;
            }
            else
            {
                return user.UserId;
            }
        }
    }
}