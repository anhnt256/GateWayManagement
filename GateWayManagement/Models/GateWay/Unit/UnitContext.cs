using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Unit
{
    public class UnitContext
    {
        public string ConnectionString { get; set; }

        public UnitContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Unit> GetAll()
        {
            List<Unit> list = new List<Unit>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from unit", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Unit service = new Unit(reader);
                        list.Add(service);
                    }
                    conn.Close();
                }
            }
            return list;
        }

    }
}
