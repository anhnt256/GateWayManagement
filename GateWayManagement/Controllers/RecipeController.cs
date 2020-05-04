using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GateWayManagement.Models;
using GateWayManagement.Models.GateWay.Recipe;
using GateWayManagement.Services.GateWay;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GateWayManagement.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RecipeController : Controller
  {
    private IGateWayRecipeService _recipeService;

    public RecipeController(IGateWayRecipeService recipeService)
    {
      _recipeService = recipeService;
    }
    [HttpGet("[action]")]
    public JsonResult GetAllRecipe()
    {
      var recipes = _recipeService.SelectAllRecipe();
      List<RecipeResponse> responseList = new List<RecipeResponse>();
      foreach (var recipe in recipes)
      {
        if (!responseList.Any(x => x.recipe_group == recipe.recipe_group))
        {
          RecipeResponse response = new RecipeResponse();
          response.recipe_group = recipe.recipe_group;
          Recipe item = new Recipe();
          item.id = recipe.id;
          item.avatar = recipe.avatar;
          item.name = recipe.name;
          item.sell_price = recipe.sell_price;
          item.recipe_group = recipe.recipe_group;
          response.recipes = new List<Recipe>();
          response.recipes.Add(item);
          responseList.Add(response);
        }
        else {
          int index = responseList.FindIndex(x => x.recipe_group == recipe.recipe_group);
          Recipe item = new Recipe();
          item.id = recipe.id;
          item.avatar = recipe.avatar;
          item.name = recipe.name;
          item.sell_price = recipe.sell_price;
          item.recipe_group = recipe.recipe_group;
          responseList[index].recipes.Add(item);
        }
      }
      return Json(new ResponseModel()
      {
        ResponseCode = ResponseCode.Success,
        Reply = responseList
      });
    }
  }
}