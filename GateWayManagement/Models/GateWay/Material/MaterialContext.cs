using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.Material
{
    public class MaterialContext
    {
        public string ConnectionString { get; set; }

        public MaterialContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Material> GetAll(string store_id)
        {
            List<Material> list = new List<Material>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand($"select * from material where store_id='{store_id}'", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Material service = new Material(reader);
                        list.Add(service);
                    }
                    conn.Close();
                }
            }
            return list;
        }

        public void SetMaterial(Material material)
        {
            using (MySqlConnection conn = GetConnection())
            {
                string sql = $"Insert Into material (store_id, name, brand, weight, unit, quantity, warning_qty, avatar, is_active, created_by, created_date, is_delete) " +
                    $"Values ({material.store_id}, '{material.name}','{material.brand}',{material.weight},'{material.unit}',{material.quantity},{material.warning_qty}," +
                    $"'{material.avatar}', {material.is_active},'{material.created_by}','{material.created_date}',{material.is_delete})";

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
