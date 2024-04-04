using ConnectLocalApi.Models;
using ConnectLocalApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConnectLocalApi.Controllers
{
    [Authorize(Roles = "Contratante")]
    [ApiController]
    [Route("api/contratantes")]
    public class ContratantesController : ControllerBase
    {
        private readonly ConnectLocalService _connectLocalService;

        public ContratantesController(ConnectLocalService connectLocalService)
        {
            _connectLocalService = connectLocalService;
        }

        [HttpGet]
        public async Task<List<Contratantes>> Get() => await _connectLocalService.GetAsyncContratantes();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Contratantes>> Get(string id)
        {
            var contratante = await _connectLocalService.GetAsyncContratantes(id);
            if (contratante == null)
            {
                return NotFound();
            }
            return Ok(contratante);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Post(ContratantesDto newContratante)
        {
            if (newContratante.Password == null)
            {
                string msg = "Senha não informada!";
                return BadRequest(new { message = msg });
            }
            Contratantes novo = new Contratantes()
            {
                Name = newContratante.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(newContratante.Password),
                Role = "Contratante",
                Endereco = newContratante.Endereco,
                Contato = newContratante.Contato,
                Email = newContratante.Email,
                CPF = newContratante.CPF
            };
            await _connectLocalService.CreateAsyncContratantes(novo);
            return CreatedAtAction(nameof(Get), new { id = novo.Id }, novo);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Update(string id, ContratantesDto updatedContratante)
        {
            var contratante = await _connectLocalService.GetAsyncContratantes(id);
            if (contratante is null)
                return NotFound();
            contratante.Name = updatedContratante.Name;
            if (updatedContratante.Password != null)
            {
                contratante.Password = BCrypt.Net.BCrypt.HashPassword(updatedContratante.Password);
            }
            contratante.Endereco = updatedContratante.Endereco;
            contratante.Contato = updatedContratante.Contato;
            contratante.Email = updatedContratante.Email;
            contratante.CPF = updatedContratante.CPF;
            await _connectLocalService.UpdateAsyncContratantes(id, contratante);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var contratante = await _connectLocalService.GetAsyncContratantes(id);
            if (contratante is null)
                return NotFound();
            await _connectLocalService.RemoveAsyncContratante(id);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("authentication")]
        public async Task<ActionResult> AuthenticateContratante(AuthenticateDto model)
        {
            var contratante = await _connectLocalService.GetAsyncContratantes(model.Id);
            if (contratante is null || !BCrypt.Net.BCrypt.Verify(model.Password, contratante.Password))
                return Unauthorized();
            var jwt = GenerateJwtToken(contratante);
            return Ok(new { jwtToken = jwt });
        }

        private string GenerateJwtToken(Contratantes model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
                new Claim(ClaimTypes.Role, model.Role.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
