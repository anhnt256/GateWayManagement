using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.User
{
    public class CustomUserContext
    {
        public string ConnectionString { get; set; }

        public CustomUserContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public CustomUser SelectUserFromId(int UserId)
        {
            CustomUser user = new CustomUser();
            user.UserId = 0;
            using (MySqlConnection conn = GetConnection())
            {
                string sql = $"Select * from user where id='{UserId}'";
                conn.Open();
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        user.UserId = int.Parse(reader["id"].ToString());
                        user.Money = int.Parse(reader["Money"].ToString());
                    }
                    conn.Close();
                }
            }
            return user;
        }

        public void InsertNewUser(CustomUser user)
        {
            using (MySqlConnection conn = GetConnection())
            {
                string sql = $"Insert Into user (id, Money) Values ('{user.UserId}','{user.Money}')";

                using (MySqlCommand command = new MySqlCommand(sql, conn))
                {
                    conn.Open();
                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }
        }

        public void UpdateMoneyBalance(int UserId, int Money) {
            using (MySqlConnection conn = GetConnection())
            {
                string sql = $"Update user set Money='{Money}' where id='{UserId}'";

                using (MySqlCommand command = new MySqlCommand(sql, conn))
                {
                    conn.Open();
                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }
        }
    }
}
