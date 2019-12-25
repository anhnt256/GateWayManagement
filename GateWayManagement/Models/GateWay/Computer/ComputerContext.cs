using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Computer
{
    public class ComputerContext
    {
        public string ConnectionString { get; set; }

        public ComputerContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Computer> GetAll(string ip)
        {
            List<Computer> list = new List<Computer>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string sql = "select * from computer ";
                string where = "";

                if (!string.IsNullOrWhiteSpace(ip))
                {
                    where += addParamToWhere("ip", where, ip);
                }
                if (!string.IsNullOrWhiteSpace(where))
                {
                    sql = sql + "where " + where + " order by id desc";
                }
                MySqlCommand cmd = new MySqlCommand(sql, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Computer service = new Computer(reader);
                        list.Add(service);
                    }
                    conn.Close();
                }
            }
            return list;
        }
        private string addParamToWhere(string field, string where, string value)
        {
            string param = "";
            if (string.IsNullOrWhiteSpace(where))
            {
                param = $"{field} IN ('{value}')";
            }
            else
            {
                param = $" AND {field} IN ('{value}')";
            }
            return param;
        }
    }
}
