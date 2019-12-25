using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Order
{
    public class Order
    {
        public int id { set; get; }
        public int user_id { set; get; }
        public int dish_id { set; get; }
        public int quantity { set; get; }
        public int money { set; get; }
        public int status { set; get; }
        public int type { set; get; }
        public string note { set; get; }
        public string created_date { set; get; }
        public List<OrderDetail> details { set; get; }
        public int key { set; get; }
        public int[] statuses { set; get; }
        public string dish_name { set; get; }
        public string computer_name { set; get; }

        public Order() { }

        public Order(MySqlDataReader dr, string computerName)
        {
            if (dr["id"] != DBNull.Value)
                id = int.Parse(dr["id"].ToString());
            if (dr["id"] != DBNull.Value)
                key = int.Parse(dr["id"].ToString());
            if (dr["user_id"] != DBNull.Value)
                user_id = int.Parse(dr["user_id"].ToString());
            if (dr["dish_id"] != DBNull.Value)
                dish_id = int.Parse(dr["dish_id"].ToString());
            if (dr["quantity"] != DBNull.Value)
                quantity = int.Parse(dr["quantity"].ToString());
            if (dr["money"] != DBNull.Value)
                money = int.Parse(dr["money"].ToString());
            if (dr["status"] != DBNull.Value)
                status = int.Parse(dr["status"].ToString());
            if (dr["type"] != DBNull.Value)
                type = int.Parse(dr["type"].ToString());
            if (dr["note"] != DBNull.Value)
                note = dr["note"].ToString();
            if (dr["created_date"] != DBNull.Value)
                created_date = dr["created_date"].ToString();
            if (!string.IsNullOrWhiteSpace(computerName))
                computer_name = computerName;
        }
    }
}
