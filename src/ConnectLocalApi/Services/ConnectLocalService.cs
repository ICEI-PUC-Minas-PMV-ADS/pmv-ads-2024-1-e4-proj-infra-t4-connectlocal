using ConnectLocalApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ConnectLocalApi.Services
{
    public class ConnectLocalService
    {
        private readonly IMongoCollection<Contratantes> _contratantes;
        private readonly IMongoCollection<Prestadores> _prestadores;
        public ConnectLocalService(IOptions<ConnectLocalDBSettings> ConnecLocalDBSettings)
        {
            var mongoClient = new MongoClient(ConnecLocalDBSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(ConnecLocalDBSettings.Value.DatabaseName);
            _contratantes = mongoDatabase.GetCollection<Contratantes>(ConnecLocalDBSettings.Value.ContratantesCollectionName);
            _prestadores = mongoDatabase.GetCollection<Prestadores>(ConnecLocalDBSettings.Value.PrestadoresCollectionName);
        }

        public async Task<List<Prestadores>> GetAsyncPrestadores() => await _prestadores.Find(_ => true).ToListAsync();
        public async Task<Prestadores?> GetAsyncPrestadores(string id) => await _prestadores.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsyncPrestadores(Prestadores newPrestador) => await _prestadores.InsertOneAsync(newPrestador);
        public async Task UpdateAsyncPrestadores(string id, Prestadores updatedPrestador) => await _prestadores.ReplaceOneAsync(x => x.Id == id, updatedPrestador);
        public async Task RemoveAsyncPrestadores(string id) => await _prestadores.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Contratantes>> GetAsyncContratantes() => await _contratantes.Find(_ => true).ToListAsync();
        public async Task<Contratantes?> GetAsyncContratantes(string id) => await _contratantes.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsyncContratantes(Contratantes newContratante) => await _contratantes.InsertOneAsync(newContratante);
        public async Task UpdateAsyncContratantes(string id, Contratantes updatedContratante) => await _contratantes.ReplaceOneAsync(x => x.Id == id, updatedContratante);
        public async Task RemoveAsyncContratante(string id) => await _contratantes.DeleteOneAsync(x => x.Id == id);
    }
}
