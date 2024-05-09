using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ConnectLocalApi.Models
{
    public class Avaliacoes
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string IdUser { get; set; }
        public string NomeUser { get; set; }
        public string IdPrestador { get; set; }
        public string NomePrestador { get; set; }
        public string IdServico { get; set; }
        public int Nota { get; set; }
        public string Comentario { get; set; }
    }
}
