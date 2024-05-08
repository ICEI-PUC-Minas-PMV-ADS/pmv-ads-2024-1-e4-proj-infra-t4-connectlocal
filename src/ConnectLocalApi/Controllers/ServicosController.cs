using ConnectLocalApi.Models;
using ConnectLocalApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConnectLocalApi.Controllers
{
    [ApiController]
    [Route("api/servicos")]
    public class ServicosController : ControllerBase
    {
        private readonly ConnectLocalService _connectLocalService;
        public ServicosController(ConnectLocalService connectLocalService)
        {
            _connectLocalService = connectLocalService;
        }

        [HttpGet]
        public async Task<List<Servicos>> Get() => await _connectLocalService.GetAsyncServicos();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Servicos>> Get(string id)
        {
            var servico = await _connectLocalService.GetAsyncServicos(id);
            if (servico == null)
            {
                return NotFound();
            }
            return Ok(servico);
        }

        [HttpGet("prestador/{idPrestador:length(24)}")]
        public async Task<List<Servicos>> GetServicosByPrestador(string idPrestador) => await _connectLocalService.GetServicosByPrestador(idPrestador);

        [HttpPost]
        public async Task<ActionResult> Post(Servicos newServico)
        {
            await _connectLocalService.CreateAsyncServicos(newServico);
            return CreatedAtAction(nameof(Get), new { id = newServico.Id }, newServico);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Update(string id, Servicos updatedServico)
        {
            var servico = await _connectLocalService.GetAsyncServicos(id);
            if (servico is null)
                return NotFound();
            servico.IdPrestador = updatedServico.IdPrestador;
            servico.TipoServico = updatedServico.TipoServico;
            servico.Descricao = updatedServico.Descricao;

            await _connectLocalService.UpdateAsyncServicos(id, servico);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var servico = await _connectLocalService.GetAsyncServicos(id);
            if (servico is null)
                return NotFound();
            await _connectLocalService.RemoveAsyncServicos(id);
            return NoContent();
        }
    }
}
