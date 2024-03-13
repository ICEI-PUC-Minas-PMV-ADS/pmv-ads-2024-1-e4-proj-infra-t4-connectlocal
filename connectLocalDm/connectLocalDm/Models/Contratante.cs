using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace connectLocalDm.Models
{
    [Table("Contratantes")]
    public class Contratante
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string NomeContratante { get; set; }
        [Required]
        public string EndContratante { get; set; }
        [Required]
        public string ContatoContratante { get; set; }
        [Required]
        public string EmailContratante { get; set; }
        [Required]
        public string CPF { get; set; }

    }
}
