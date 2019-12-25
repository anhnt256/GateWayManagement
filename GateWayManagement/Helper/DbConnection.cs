using MySql.Data.MySqlClient;

namespace GateWayManagement.Helper
{
    public class DbConnection
    {
        public static MySqlConnection GetDbConnection(string connectionString) {
            MySqlConnection connection = new MySqlConnection(connectionString);
            connection.Open();
            return connection;
        }
    }
}
