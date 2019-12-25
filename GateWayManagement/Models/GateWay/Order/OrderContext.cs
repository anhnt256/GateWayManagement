using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Order
{
    public class OrderContext
    {
        int WITHOUT_USER_ID = -1;
        public string ConnectionString { get; set; }

        public OrderContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Order> GetAll(int[] statuses, int? user_id, string computer_name)
        {
            List<Order> list = new List<Order>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string sql = $"select * from user_order ";
                string where = "";
                var filterStatus = statuses.Where(c => c != -1);
                if (filterStatus.ToArray().Length > 0)
                {
                    where += addParamToWhere("status", where, string.Join(",", filterStatus));
                }
                if (user_id.HasValue && user_id != WITHOUT_USER_ID)
                {
                    where += addParamToWhere("user_id", where, user_id.Value.ToString());
                }
                if (!string.IsNullOrWhiteSpace(where)) {
                    sql = sql + "where " + where + " order by id desc";
                }
                MySqlCommand cmd = new MySqlCommand(sql, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Order order = new Order(reader, computer_name);
                        list.Add(order);
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
                param = $"{field} IN ({value})";
            }
            else
            {
                param = $" AND {field} IN ({value})";
            }
            return param;
        }

        public void SetOrder(Order order)
        {
            using (MySqlConnection conn = GetConnection())
            {
                string sql = "";
                if (order.id > 0)
                {
                    sql = $"select * from user_order where id = {order.id}";
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand(sql, conn);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            sql = $"Update user_order SET status = {order.status} where id = {order.id}";
                        }
                        else
                        {
                            if (order.type == (int)MessageType.Wallet || order.type == (int)MessageType.Money)
                            {
                                sql = $"Insert into user_order (user_id, money, type, status, created_date) values ({order.user_id},{order.money}, {order.type}, {order.status}, '{order.created_date}')";
                            }
                            else if (order.type == (int)MessageType.Food)
                            {
                                sql = $"Insert into user_order (user_id, dish_id, quantity, money, type, note, status, created_date) values (" +
                                    $"{order.user_id},{order.dish_id},{order.quantity},{order.money}, {order.type}, '{order.note}', {order.status}, '{order.created_date}')";
                            }
                        }
                        conn.Close();
                    }
                }
                else {
                    if (order.type == (int)MessageType.Wallet || order.type == (int)MessageType.Money)
                    {
                        sql = $"Insert into user_order (user_id, money, type, status, created_date) values ({order.user_id},{order.money}, {order.type}, {order.status}, '{order.created_date}')";
                    }
                    else if (order.type == (int)MessageType.Food)
                    {
                        sql = $"Insert into user_order (user_id, dish_id, quantity, money, type, note, status, created_date) values (" +
                            $"{order.user_id},{order.dish_id},{order.quantity},{order.money}, {order.type}, '{order.note}', {order.status}, '{order.created_date}')";
                    }
                }

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
