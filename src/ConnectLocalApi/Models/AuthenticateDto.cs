using System.ComponentModel.DataAnnotations;

namespace ConnectLocalApi.Models
{
    public class AuthenticateDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
