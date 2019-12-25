using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Dish
{
    public class DishContext
    {
        public string ConnectionString { get; set; }

        public DishContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Dish> GetAll()
        {
            List<Dish> list = new List<Dish>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from dish", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Dish service = new Dish(reader);
                        list.Add(service);
                    }
                    conn.Close();
                }
            }
            return list;
        }

    }
}
