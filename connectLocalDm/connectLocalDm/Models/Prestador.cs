using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace connectLocalDm.Models
{
    [Table("Prestadores")]
    public class Prestador
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string NomePrestador { get; set; }
        [Required]
        public TipoServico Tipo { get; set; }
        [Required]
        public string InfoServico { get; set; }
        [Required]
        public string EnderecoServico { get; set; }
        [Required]
        public string ContatoServico { get; set; }
        [Required]
        public string EmailServico { get; set; }
        [Required]
        public string CNPJ { get; set; }

    }

    public enum TipoServico
    {
        Borracheiro,
        ConsertoEletrodomesticos,
        CuidadorIdosos,
        Eletricista,
        Encanador,
        Pintor,
        ProfIngles,
        ProfMatematica,
    }
}
