using MySql.Data.MySqlClient;

namespace GateWayManagement.Helper
{
    public abstract class SqlRepository : ISqlRepository
    {
        private string _connectionString;

        public SqlRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public MySqlConnection GetOpenConnection()
        {
            return DbConnection.GetDbConnection(_connectionString);
        }
    }
}
