using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Recipe
{
    public class RecipeContext
    {
        public string ConnectionString { get; set; }

        public RecipeContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Recipe> GetAll()
        {
            List<Recipe> list = new List<Recipe>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from recipe", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Recipe service = new Recipe(reader);
                        list.Add(service);
                    }
                    conn.Close();
                }
            }
            return list;
        }

    }
}
