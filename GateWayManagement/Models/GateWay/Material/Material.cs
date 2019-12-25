using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Material
{
    public class Material
    {
        public int id { set; get; }
        public int store_id { set; get; }
        public string name { set; get; }
        public string brand { set; get; }
        public int weight { set; get; }
        public string unit { set; get; }
        public int quantity { set; get; }
        public int warning_qty { set; get; }
        public string avatar { set; get; }
        public int is_active { set; get; }
        public int is_delete { set; get; }
        public int created_by { set; get; }
        public string created_date { set; get; }
        public int updated_by { set; get; }
        public string updated_date { set; get; }
        public string instock_date { set; get; }

        public Material() { }

        public Material(MySqlDataReader dr)
        {
            if (dr.HasRows && dr["id"] != DBNull.Value)
                id = int.Parse(dr["id"].ToString());
            if (dr.HasRows && dr["store_id"] != DBNull.Value)
                store_id = int.Parse(dr["store_id"].ToString());
            if (dr.HasRows && dr["name"] != DBNull.Value)
                name = dr["name"].ToString();
            if (dr.HasRows && dr["brand"] != DBNull.Value)
                brand = dr["brand"].ToString();
            if (dr.HasRows && dr["weight"] != DBNull.Value)
                weight = int.Parse(dr["weight"].ToString());
            if (dr.HasRows && dr["unit"] != DBNull.Value)
                unit = dr["unit"].ToString();
            if (dr.HasRows && dr["quantity"] != DBNull.Value)
                quantity = int.Parse(dr["quantity"].ToString());
            if (dr.HasRows && dr["warning_qty"] != DBNull.Value)
                warning_qty = int.Parse(dr["warning_qty"].ToString());
            if (dr.HasRows && dr["avatar"] != DBNull.Value)
                avatar = dr["avatar"].ToString();
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
            if (dr.HasRows && dr["instock_date"] != DBNull.Value)
                instock_date = dr["instock_date"].ToString();
        }
    }
}
