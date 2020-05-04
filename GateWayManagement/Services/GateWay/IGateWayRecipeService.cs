using GateWayManagement.Helper;
using GateWayManagement.Models.GateWay.Recipe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.GateWay
{
  public interface IGateWayRecipeService : ISqlRepository
  {
    List<RecipeData> SelectAllRecipe();
  }
}
