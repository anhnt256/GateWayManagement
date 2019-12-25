using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Computer
{
    public class Computer
    {
        public int id { set; get; }
        public string name { set; get; }
        public string ip { set; get; }
        public int is_active { set; get; }
        public int is_delete { set; get; }
        public int created_by { set; get; }
        public DateTime created_date { set; get; }
        public int updated_by { set; get; }
        public DateTime updated_date { set; get; }

        public Computer(MySqlDataReader dr)
        {
            if (dr["id"] != DBNull.Value)
                id = int.Parse(dr["id"].ToString());
            if (dr["name"] != DBNull.Value)
                name = dr["name"].ToString();
            if (dr["ip"] != DBNull.Value)
                ip = dr["ip"].ToString();
            if (dr["is_active"] != DBNull.Value)
                is_active = int.Parse(dr["is_active"].ToString());
            if (dr["is_delete"] != DBNull.Value)
                is_delete = int.Parse(dr["is_delete"].ToString());
            if (dr["created_by"] != DBNull.Value)
                created_by = int.Parse(dr["created_by"].ToString());
            if (dr["created_date"] != DBNull.Value)
                created_date = DateTime.Parse(dr["created_date"].ToString());
            if (dr["updated_by"] != DBNull.Value)
                updated_by = int.Parse(dr["updated_by"].ToString());
            if (dr["updated_date"] != DBNull.Value)
                updated_date = DateTime.Parse(dr["updated_date"].ToString());
        }
    }
}
