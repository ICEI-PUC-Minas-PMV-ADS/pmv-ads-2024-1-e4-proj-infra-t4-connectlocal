using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace ConnectLocalApi.Models
{
    public class Contratantes
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
        public string Endereco { get; set; }
        public string Contato { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
    }
}
