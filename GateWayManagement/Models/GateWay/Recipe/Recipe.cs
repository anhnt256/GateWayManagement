﻿using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Recipe
{
    public class Recipe
    {
        public int id { set; get; }
        public int material_id { set; get; }
        public int quantity { set; get; }
        public bool is_active { set; get; }
        public bool is_delete { set; get; }
        public int created_by { set; get; }
        public DateTime created_date { set; get; }
        public int updated_by { set; get; }
        public DateTime updated_date { set; get; }

        public Recipe(MySqlDataReader dr)
        {
            id = int.Parse(dr["id"].ToString());
            material_id = int.Parse(dr["material_id"].ToString());
            quantity = int.Parse(dr["quantity"].ToString());
            is_active = bool.Parse(dr["is_active"].ToString());
            is_delete = bool.Parse(dr["is_delete"].ToString());
            created_by = int.Parse(dr["created_by"].ToString());
            created_date = DateTime.Parse(dr["created_date"].ToString());
            updated_by = int.Parse(dr["updated_by"].ToString());
            updated_date = DateTime.Parse(dr["updated_date"].ToString());
        }
    }
}
