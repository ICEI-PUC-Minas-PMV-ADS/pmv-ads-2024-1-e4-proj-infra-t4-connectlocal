using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace ConnectLocalApi.Models
{
    public class Prestadores
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("Name")]
        public string Name { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        [JsonIgnore]
        public string Role { get; set; }
        public List<string> TipoServico { get; set; }
        public string Descricao { get; set; }
        public string Endereco { get; set; }
        public string Contato { get; set; }
        public string Email { get; set; }
        public string CNPJ { get; set; }
        public string Funcionamento { get; set; }
        public List<Dictionary<string, string>> Avaliacoes { get; set; }
        public float MediaNota { get; set; }
        public List<string> Fotos { get; set; }
    }
}
