using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Room
{
    public class RoomContext
    {
        public string ConnectionString { get; set; }

        public RoomContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Room> GetAll()
        {
            List<Room> list = new List<Room>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from room", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Room service = new Room(reader);
                        list.Add(service);
                    }
                    conn.Close();
                }
            }
            return list;
        }

    }
}
