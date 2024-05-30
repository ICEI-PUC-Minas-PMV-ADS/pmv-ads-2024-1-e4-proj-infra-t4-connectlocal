using ConnectLocalApi.Models;
using ConnectLocalApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConnectLocalApi.Controllers
{
    [ApiController]
    [Route("api/avaliacoes")]
    public class AvaliacoesController : ControllerBase
    {
        private readonly ConnectLocalService _connectLocalService;
        public AvaliacoesController(ConnectLocalService connectLocalService)
        {
            _connectLocalService = connectLocalService;
        }

        [HttpGet]
        public async Task<List<Avaliacoes>> Get() => await _connectLocalService.GetAsyncAvaliacoes();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Avaliacoes>> Get(string id)
        {
            var avaliacao = await _connectLocalService.GetAsyncAvaliacoes(id);
            if (avaliacao == null)
            {
                return NotFound();
            }
            return Ok(avaliacao);
        }

        [HttpGet("prestador/{idPrestador:length(24)}")]
        public async Task<List<Avaliacoes>> GetAvaliacoesByPrestador(string idPrestador) => await _connectLocalService.GetAvaliacoesByPrestador(idPrestador);

        [HttpGet("usuario/{idUsuario:length(24)}")]
        public async Task<List<Avaliacoes>> GetAvaliacoesByUsuario(string idUsuario) => await _connectLocalService.GetAvaliacoesByUsuario(idUsuario);

        [HttpGet("servico/{idServico:length(24)}")]
        public async Task<List<Avaliacoes>> GetAvaliacoesByServico(string idServico) => await _connectLocalService.GetAvaliacoesByServico(idServico);

        [HttpPost]
        public async Task<ActionResult> Post(Avaliacoes newAvaliacao)
        {
            await _connectLocalService.CreateAsyncAvaliacoes(newAvaliacao);
            return CreatedAtAction(nameof(Get), new { id = newAvaliacao.Id }, newAvaliacao);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Update(string id, Avaliacoes updatedAvaliacao)
        {
            var avaliacao = await _connectLocalService.GetAsyncAvaliacoes(id);
            if (avaliacao is null)
                return NotFound();
            avaliacao.IdUser = updatedAvaliacao.IdUser;
            avaliacao.NomeUser = updatedAvaliacao.NomeUser;
            avaliacao.IdPrestador = updatedAvaliacao.IdPrestador;
            avaliacao.NomePrestador = updatedAvaliacao.NomePrestador;
            avaliacao.IdServico = updatedAvaliacao.IdServico;
            avaliacao.Nota = updatedAvaliacao.Nota;
            avaliacao.Comentario = updatedAvaliacao.Comentario;

            await _connectLocalService.UpdateAsyncAvaliacoes(id, avaliacao);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var avaliacao = await _connectLocalService.GetAsyncAvaliacoes(id);
            if (avaliacao is null)
                return NotFound();
            await _connectLocalService.RemoveAsyncAvaliacoes(id);
            return NoContent();
        }
    }
}
