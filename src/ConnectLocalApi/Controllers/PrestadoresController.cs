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
    [Authorize(Roles = "Prestador")]
    [ApiController]
    [Route("api/prestadores")]
    public class PrestadoresController : ControllerBase
    {
        private readonly ConnectLocalService _connectLocalService;

        public PrestadoresController(ConnectLocalService connectLocalService)
        {
            _connectLocalService = connectLocalService;
        }

        [HttpGet]
        public async Task<List<Prestadores>> Get() => await _connectLocalService.GetAsyncPrestadores();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Prestadores>> Get(string id)
        {
            var prestador = await _connectLocalService.GetAsyncPrestadores(id);
            if (prestador == null)
            {
                return NotFound();
            }
            return Ok(prestador);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Post(PrestadoresDto newPrestador)
        {
            if (newPrestador.Password == null)
            {
                string msg = "Senha não informada!";
                return BadRequest(new { message = msg });
            }
            Prestadores novo = new Prestadores()
            {
                Name = newPrestador.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(newPrestador.Password),
                Role = "Prestador",
                TipoServico = newPrestador.TipoServico,
                Descricao = newPrestador.Descricao,
                Endereco = newPrestador.Endereco,
                Contato = newPrestador.Contato,
                Email = newPrestador.Email,
                CNPJ = newPrestador.CNPJ
            };
            await _connectLocalService.CreateAsyncPrestadores(novo);
            return CreatedAtAction(nameof(Get), new { id = novo.Id }, novo);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Update(string id, PrestadoresDto updatedPrestador)
        {
            var prestador = await _connectLocalService.GetAsyncPrestadores(id);
            if (prestador is null)
                return NotFound();
            prestador.Name = updatedPrestador.Name;
            if (updatedPrestador.Password != null)
            {
                prestador.Password = BCrypt.Net.BCrypt.HashPassword(updatedPrestador.Password);
            }
            prestador.TipoServico = updatedPrestador.TipoServico;
            prestador.Descricao = updatedPrestador.Descricao;
            prestador.Endereco = updatedPrestador.Endereco;
            prestador.Contato = updatedPrestador.Contato;
            prestador.Email = updatedPrestador.Email;
            prestador.CNPJ = updatedPrestador.CNPJ;
            await _connectLocalService.UpdateAsyncPrestadores(id, prestador);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var prestador = await _connectLocalService.GetAsyncPrestadores(id);
            if (prestador is null)
                return NotFound();
            await _connectLocalService.RemoveAsyncPrestadores(id);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("authentication")]
        public async Task<ActionResult> AuthenticatePrestadores(AuthenticateDto model)
        {
            var prestador = await _connectLocalService.GetAsyncPrestadores(model.Id);
            if (prestador is null || !BCrypt.Net.BCrypt.Verify(model.Password, prestador.Password))
                return Unauthorized();
            var jwt = GenerateJwtToken(prestador);
            return Ok(new { jwtToken = jwt });
        }

        private string GenerateJwtToken(Prestadores model)
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
