using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.InStock
{
    public class InStock
    {
        public int id { set; get; }
        public int material_id { set; get; }
        public int store_id { set; get; }
        public int quantity { set; get; }
        public string invoice { set; get; }
        public int is_active { set; get; }
        public int is_delete { set; get; }
        public int created_by { set; get; }
        public string created_date { set; get; }
        public int updated_by { set; get; }
        public string updated_date { set; get; }

        public InStock(MySqlDataReader dr)
        {
            if (dr.HasRows && dr["id"] != DBNull.Value)
                id = int.Parse(dr["id"].ToString());
            if (dr.HasRows && dr["material_id"] != DBNull.Value)
                material_id = int.Parse(dr["material_id"].ToString());
            if (dr.HasRows && dr["store_id"] != DBNull.Value)
                store_id = int.Parse(dr["store_id"].ToString());
            if (dr.HasRows && dr["invoice"] != DBNull.Value)
                invoice = dr["invoice"].ToString();
            if (dr.HasRows && dr["quantity"] != DBNull.Value)
                quantity = int.Parse(dr["quantity"].ToString());
            if (dr.HasRows && dr["is_active"] != DBNull.Value)
                is_active = int.Parse(dr["is_active"].ToString());
            if (dr.HasRows && dr["is_delete"] != DBNull.Value)
                is_delete = int.Parse(dr["is_delete"].ToString());
            if (dr.HasRows && dr["created_by"] != DBNull.Value)
                created_by = int.Parse(dr["created_by"].ToString());
            if (dr.HasRows && dr["created_date"] != DBNull.Value)
                created_date = dr["created_date"].ToString();
            if (dr.HasRows && dr["updated_by"] != DBNull.Value)
                updated_by = int.Parse(dr["updated_by"].ToString());
            if (dr.HasRows && dr["updated_date"] != DBNull.Value)
                updated_date = dr["updated_date"].ToString();
        }
    }
}
