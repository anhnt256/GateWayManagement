using Dapper;
using Dapper.Contrib.Extensions;
using GateWayManagement.Helper;
using GateWayManagement.Models.GateWay.Game;
using GateWayManagement.Models.GateWay.GameParam;
using GateWayManagement.Models.GateWay.Recipe;
using GateWayManagement.Models.GateWay.User;
using GateWayManagement.Services.GateWay;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Services.CSM
{
    public class GateWayRecipeService : SqlRepository, IGateWayRecipeService
    {
        public GateWayRecipeService(string connectionString) : base(connectionString) { }

        public List<RecipeData> SelectAllRecipe()
        {
            using (var conn = GetOpenConnection())
            {
                var sql = "Select * from recipe where is_active = 1 order by recipe_group ASC";
                return conn.Query<RecipeData>(sql).ToList();
            }
        }
    }
}
