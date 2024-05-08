using ConnectLocalApi.Models;
using ConnectLocalApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConnectLocalApi.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly ConnectLocalService _connectLocalService;
        public UsuariosController(ConnectLocalService connectLocalService)
        {
            _connectLocalService = connectLocalService;
        }

        [HttpGet]
        public async Task<List<Usuarios>> Get() => await _connectLocalService.GetAsyncUsuarios();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Usuarios>> Get(string id)
        {
            var usuario = await _connectLocalService.GetAsyncUsuarios(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Post(UsuariosDto newUsuario)
        {
            var usuario = await _connectLocalService.GetUsuarioByEmail(newUsuario.Email);
            if (usuario != null)
            {
                string msg = "Email já cadastrado!";
                return BadRequest(new { message = msg });
            }

            if (newUsuario.Password == null)
            {
                string msg = "Senha não informada!";
                return BadRequest(new { message = msg });
            }

            Usuarios novo = new Usuarios()
            {
                Name = newUsuario.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(newUsuario.Password),
                Email = newUsuario.Email,
                Contato = newUsuario.Contato,
                Type = newUsuario.Type,
                CPF = newUsuario.CPF,
                CNPJ = newUsuario.CNPJ,
                Cep = newUsuario.Cep,
                Rua = newUsuario.Rua,
                Numero = newUsuario.Numero,
                Complemento = newUsuario.Complemento,
                Bairro = newUsuario.Bairro,
                Cidade = newUsuario.Cidade,
                Estado = newUsuario.Estado
            };
            await _connectLocalService.CreateAsyncUsuarios(novo);
            return CreatedAtAction(nameof(Get), new { id = novo.Id }, novo);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Update(string id, UsuariosDto updatedUsuario)
        {
            var usuario = await _connectLocalService.GetAsyncUsuarios(id);
            if (usuario is null)
                return NotFound();
            usuario.Name = updatedUsuario.Name;
            if (updatedUsuario.Password != null)
            {
                usuario.Password = BCrypt.Net.BCrypt.HashPassword(updatedUsuario.Password);
            }
            usuario.Email = updatedUsuario.Email;
            usuario.Contato = updatedUsuario.Contato;
            usuario.CPF = updatedUsuario.CPF;
            usuario.CNPJ = updatedUsuario.CNPJ;
            usuario.Cep = updatedUsuario.Cep;
            usuario.Rua = updatedUsuario.Rua;
            usuario.Numero = updatedUsuario.Numero;
            usuario.Complemento = updatedUsuario.Complemento;
            usuario.Bairro = updatedUsuario.Bairro;
            usuario.Cidade = updatedUsuario.Cidade;
            usuario.Estado = updatedUsuario.Estado;

            await _connectLocalService.UpdateAsyncUsuarios(id, usuario);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var usuario = await _connectLocalService.GetAsyncUsuarios(id);
            if (usuario is null)
                return NotFound();
            await _connectLocalService.RemoveAsyncUsuarios(id);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("authentication")]
        public async Task<ActionResult> AuthenticatePrestadores(AuthenticateDto model)
        {
            var usuario = await _connectLocalService.GetUsuarioByEmail(model.Email);
            if (usuario is null || !BCrypt.Net.BCrypt.Verify(model.Password, usuario.Password))
                return Unauthorized();
            var jwt = GenerateJwtToken(usuario);
            return Ok(new { jwtToken = jwt, user = usuario });
        }

        private string GenerateJwtToken(Usuarios model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, model.Type.ToString()),
                new Claim(ClaimTypes.NameIdentifier, model.Name.ToString()),
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
