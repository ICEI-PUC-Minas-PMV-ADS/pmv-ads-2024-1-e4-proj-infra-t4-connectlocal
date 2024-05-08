namespace ConnectLocalApi.Models
{
    public class ConnectLocalDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string UsuariosCollectionName { get; set; } = null!;
        public string ServicosCollectionName { get; set; } = null!;
        public string AvaliacoesCollectionName { get; set; } = null!;
    }
}
