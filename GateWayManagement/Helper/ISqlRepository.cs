using MySql.Data.MySqlClient;

namespace GateWayManagement.Helper
{
    public interface ISqlRepository
    {
        MySqlConnection GetOpenConnection();
    }
}
