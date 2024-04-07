using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ConnectLocalApi.Models
{
    public class ContratantesDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("Name")]
        [Required]
        public string Name { get; set; }
        public string Password { get; set; }
        [Required]
        public string Endereco { get; set; }
        [Required]
        public string Contato { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string CPF { get; set; }
    }
}
