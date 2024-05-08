using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ConnectLocalApi.Models
{
    public class Servicos
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string IdPrestador { get; set; }
        public string TipoServico { get; set; }
        public string Descricao { get; set; }
    }
}
