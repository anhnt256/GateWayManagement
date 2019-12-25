using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models.GateWay.InStock
{
    public class InStockContext
    {
        public string ConnectionString { get; set; }

        public InStockContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<InStock> GetAll(string store_id)
        {
            List<InStock> list = new List<InStock>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand($"select * from instock where store_id = {store_id}", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        InStock service = new InStock(reader);
                        list.Add(service);
                    }
                    conn.Close();
                }
            }
            return list;
        }

        public void SetInStock(InStock instock)
        {
            using (MySqlConnection conn = GetConnection())
            {
                string sql = $"Insert Into instock (store_id, material_id, quantity, invoice, is_active, created_by, created_date, is_delete) " +
                    $"Values ({instock.store_id}, {instock.material_id},{instock.quantity},{instock.invoice},{instock.is_active},{instock.created_by},{instock.created_date}," +
                    $"{instock.is_delete})";

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
