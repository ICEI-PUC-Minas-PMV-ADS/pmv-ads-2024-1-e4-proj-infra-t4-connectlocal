namespace ConnectLocalApi.Models
{
    public class ConnectLocalDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string ContratantesCollectionName { get; set; } = null!;
        public string PrestadoresCollectionName { get; set; } = null!;
    }
}
