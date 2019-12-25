using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Store
{
    public class Store
    {
        public int id { set; get; }
        public string name { set; get; }
        public string address { set; get; }
        public bool is_active { set; get; }
        public bool is_delete { set; get; }
        public int created_by { set; get; }
        public DateTime created_date { set; get; }
        public int updated_by { set; get; }
        public DateTime updated_date { set; get; }

        public Store(MySqlDataReader dr)
        {
            id = int.Parse(dr["id"].ToString());
            name = dr["name"].ToString();
            address = dr["quantity"].ToString();
            is_active = bool.Parse(dr["is_active"].ToString());
            is_delete = bool.Parse(dr["is_delete"].ToString());
            created_by = int.Parse(dr["created_by"].ToString());
            created_date = DateTime.Parse(dr["created_date"].ToString());
            updated_by = int.Parse(dr["updated_by"].ToString());
            updated_date = DateTime.Parse(dr["updated_date"].ToString());
        }
    }
}
