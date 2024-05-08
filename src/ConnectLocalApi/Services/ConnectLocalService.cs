using ConnectLocalApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ConnectLocalApi.Services
{
    public class ConnectLocalService
    {
        private readonly IMongoCollection<Usuarios> _usuarios;
        private readonly IMongoCollection<Servicos> _servicos;
        private readonly IMongoCollection<Avaliacoes> _avaliacoes;

        public ConnectLocalService(IOptions<ConnectLocalDBSettings> ConnecLocalDBSettings)
        {
            var mongoClient = new MongoClient(ConnecLocalDBSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(ConnecLocalDBSettings.Value.DatabaseName);
            _usuarios = mongoDatabase.GetCollection<Usuarios>(ConnecLocalDBSettings.Value.UsuariosCollectionName);
            _servicos = mongoDatabase.GetCollection<Servicos>(ConnecLocalDBSettings.Value.ServicosCollectionName);
            _avaliacoes = mongoDatabase.GetCollection<Avaliacoes>(ConnecLocalDBSettings.Value.AvaliacoesCollectionName);
        }

        public async Task<List<Usuarios>> GetAsyncUsuarios() => await _usuarios.Find(_ => true).ToListAsync();
        public async Task<Usuarios?> GetAsyncUsuarios(string id) => await _usuarios.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<Usuarios?> GetUsuarioByEmail(string EMAIL) => await _usuarios.Find(x => x.Email == EMAIL).FirstOrDefaultAsync();
        public async Task CreateAsyncUsuarios(Usuarios newUsuario) => await _usuarios.InsertOneAsync(newUsuario);
        public async Task UpdateAsyncUsuarios(string id, Usuarios updatedUsuario) => await _usuarios.ReplaceOneAsync(x => x.Id == id, updatedUsuario);
        public async Task RemoveAsyncUsuarios(string id) => await _usuarios.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Servicos>> GetAsyncServicos() => await _servicos.Find(_ => true).ToListAsync();
        public async Task<Servicos?> GetAsyncServicos(string id) => await _servicos.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<List<Servicos>> GetServicosByPrestador(string id) => await _servicos.Find(x => x.IdPrestador == id).ToListAsync();
        public async Task CreateAsyncServicos(Servicos newServico) => await _servicos.InsertOneAsync(newServico);
        public async Task UpdateAsyncServicos(string id, Servicos updatedServico) => await _servicos.ReplaceOneAsync(x => x.Id == id, updatedServico);
        public async Task RemoveAsyncServicos(string id) => await _servicos.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Avaliacoes>> GetAsyncAvaliacoes() => await _avaliacoes.Find(_ => true).ToListAsync();
        public async Task<Avaliacoes?> GetAsyncAvaliacoes(string id) => await _avaliacoes.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<List<Avaliacoes>> GetAvaliacoesByPrestador(string id) => await _avaliacoes.Find(x => x.IdPrestador == id).ToListAsync();
        public async Task<List<Avaliacoes>> GetAvaliacoesByUsuario(string id) => await _avaliacoes.Find(x => x.IdUser == id).ToListAsync();
        public async Task CreateAsyncAvaliacoes(Avaliacoes newAvaliacao) => await _avaliacoes.InsertOneAsync(newAvaliacao);
        public async Task UpdateAsyncAvaliacoes(string id, Avaliacoes updatedAvaliacao) => await _avaliacoes.ReplaceOneAsync(x => x.Id == id, updatedAvaliacao);
        public async Task RemoveAsyncAvaliacoes(string id) => await _servicos.DeleteOneAsync(x => x.Id == id);
    }
}
