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

<<<<<<< HEAD
        public async Task<List<Prestadores>> GetAsyncPrestadores() => await _prestadores.Find(_ => true).ToListAsync();

        public async Task<Prestadores?> GetAsyncPrestadores(string id) => await _prestadores.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<Prestadores?> GetPrestadorByCNPJ(string CNPJ) => await _prestadores.Find(x => x.CNPJ == CNPJ).FirstOrDefaultAsync();

        public async Task CreateAsyncPrestadores(Prestadores newPrestador) => await _prestadores.InsertOneAsync(newPrestador);
        public async Task UpdateAsyncPrestadores(string id, Prestadores updatedPrestador) => await _prestadores.ReplaceOneAsync(x => x.Id == id, updatedPrestador);
        public async Task RemoveAsyncPrestadores(string id) => await _prestadores.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Contratantes>> GetAsyncContratantes() => await _contratantes.Find(_ => true).ToListAsync();

        public async Task<Contratantes?> GetAsyncContratantes(string id) => await _contratantes.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<Contratantes?> GetContratanteByCPF(string CPF) => await _contratantes.Find(x => x.CPF == CPF).FirstOrDefaultAsync();

        
        public async Task CreateAsyncContratantes(Contratantes newContratante) => await _contratantes.InsertOneAsync(newContratante);
        public async Task UpdateAsyncContratantes(string id, Contratantes updatedContratante) => await _contratantes.ReplaceOneAsync(x => x.Id == id, updatedContratante);
        public async Task RemoveAsyncContratante(string id) => await _contratantes.DeleteOneAsync(x => x.Id == id);

        internal void UpdateAsyncContratante(string id, Contratantes contratante)
        {
            throw new NotImplementedException();
        }
=======
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
>>>>>>> 7d029573f98deae33af2b3131d3167d1cda70988
    }
}
