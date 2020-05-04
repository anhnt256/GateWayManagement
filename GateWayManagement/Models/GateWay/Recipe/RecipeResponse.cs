using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Recipe
{
  public class RecipeResponse
  {
    public int recipe_group { set; get; }
    public List<Recipe> recipes { set; get; }
  }
}
