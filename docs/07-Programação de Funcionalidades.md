# Programação de Funcionalidades

## RF-001

Na criação de um prestador ele pode informar seus dados, tipos de serviços prestados, horário de funcionamento, e a descrição dos seus serviços.

Código da API:
```
# Função de criação do Prestador
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
        CNPJ = newPrestador.CNPJ,
        Funcionamento = newPrestador.Funcionamento
    };
    await _connectLocalService.CreateAsyncPrestadores(novo);
    return CreatedAtAction(nameof(Get), new { id = novo.Id }, novo);
}
```

## RF-002

Os prestadores e contratantes de serviços podem se cadastrar através da plataforma passando seus dados e fazendo sua autenticação com com id do objeto criado e a senha retornando um Jwt.

Código da API, Prestadores:
```
# Função de criação do Prestador
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
        CNPJ = newPrestador.CNPJ,
        Funcionamento = newPrestador.Funcionamento
    };
    await _connectLocalService.CreateAsyncPrestadores(novo);
    return CreatedAtAction(nameof(Get), new { id = novo.Id }, novo);
}
```
```
# Função de autenticação do Prestador
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
```
```
# Função de criação do JwtToken para o Prestador
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
```

Código da API, Contratantes:
```
# Função de criação do Contratante
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
```
```
# Função de autenticação do Contratante
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
```
```
# Função de criação do JwtToken para o Contratante
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
```

## RF-003

A recuperação de senha é feita através do CNPJ da Prestador ou CPF do contratante na url "recuperar_senha", outros dados são editados através da função Put.

Código da API, Prestadores:
```
# Função de edição do Prestador
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
    prestador.Funcionamento = updatedPrestador.Funcionamento;
    await _connectLocalService.UpdateAsyncPrestadores(id, prestador);
    return NoContent();
}
```
```
# Função de recuperação de senha do Prestador
[AllowAnonymous]
[HttpPost("recuperar_senha")]
public async Task<ActionResult<List<string>>> RecuperarSenha(RecuperarSenhaDto model)
{
    var prestador = await _connectLocalService.GetPrestadorByCNPJ(model.Documento);
    if (prestador == null)
        return NotFound("Prestador não encontrado.");

    prestador.Password = BCrypt.Net.BCrypt.HashPassword(model.Senha);

    await _connectLocalService.UpdateAsyncPrestadores(prestador.Id, prestador);

    return NoContent();
}
```

Código da API, Contratantes:
```
# Função de edição do Contratante
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
```
```
# Função de recuperação de senha do Contratante
[AllowAnonymous]
[HttpPost("recuperar_senha")]
public async Task<ActionResult<List<string>>> RecuperarSenha(RecuperarSenhaDto model)
{
    var contratante = await _connectLocalService.GetContratanteByCPF(model.Documento);
    if (contratante == null)
        return NotFound("Contratante não encontrado.");

    contratante.Password = BCrypt.Net.BCrypt.HashPassword(model.Senha);

    await _connectLocalService.UpdateAsyncContratantes(contratante.Id, contratante);

    return NoContent();
}
```


## RF-004

O Contratante pode enviar uma avaliação ao Prestador informando a nota de avaliação de 0 a 5, e um comentário sobre o serviço feito pelo Prestador.

Código da API:
```
# Função de avaliação
[HttpPost("{id:length(24)}/avaliar")]
public async Task<ActionResult> AvaliarPrestador(string id, AvaliacaoDto avaliacao)
{
    var prestador = await _connectLocalService.GetAsyncPrestadores(id);
    if (prestador == null)
        return NotFound("Prestador não encontrado.");

    if (avaliacao.Nota < 0 || avaliacao.Nota > 5)
        return BadRequest("A nota deve estar entre 0 e 5.");

    var novaAvaliacao = new Dictionary<string, string>
    {
        { "nota", avaliacao.Nota.ToString() },
        { "comentario", avaliacao.Comentario }
    };

    prestador.Avaliacoes ??= new List<Dictionary<string, string>>();
    prestador.Avaliacoes.Add(novaAvaliacao);

    prestador.MediaNota = CalcularMediaNota(prestador.Avaliacoes);

    await _connectLocalService.UpdateAsyncPrestadores(id, prestador);

    return NoContent();
}

# Função para calcular a média da nota do Prestador
private float CalcularMediaNota(List<Dictionary<string, string>> avaliacoes)
{
    if (avaliacoes == null || avaliacoes.Count == 0)
        return 0;

    var somaNotas = 0;
    foreach (var avaliacao in avaliacoes)
    {
        if (avaliacao.TryGetValue("nota", out var notaString) && int.TryParse(notaString, out var nota))
        {
            somaNotas += nota;
        }
    }

    return (float)somaNotas / avaliacoes.Count;
}
```


## RF-006

Função da API para recuperação das avaliações de um Prestador:
```
[HttpGet("{id:length(24)}/avaliacoes")]
public async Task<ActionResult<List<Dictionary<string, string>>>> ObterAvaliacoes(string id)
{
    var prestador = await _connectLocalService.GetAsyncPrestadores(id);
    if (prestador == null)
        return NotFound("Prestador não encontrado.");

    return Ok(prestador.Avaliacoes);
}
```


## RF-008

Função da API para o prestador enviar fotos dos serviços prestados e recuperação das fotos:
```
[HttpPost("{id:length(24)}/fotos")]
public async Task<ActionResult> AdicionarFoto(string id, IFormFile foto)
{
    var prestador = await _connectLocalService.GetAsyncPrestadores(id);
    if (prestador == null)
        return NotFound("Prestador não encontrado.");

    if (foto == null || foto.Length == 0)
        return BadRequest("Nenhuma foto foi enviada.");

    var nomeArquivo = $"{Guid.NewGuid().ToString()}{Path.GetExtension(foto.FileName)}";
    var caminhoArquivo = Path.Combine("C:/fotos_teste", nomeArquivo);
    using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
    {
        await foto.CopyToAsync(stream);
    }

    prestador.Fotos ??= new List<string>();
    prestador.Fotos.Add(caminhoArquivo);

    await _connectLocalService.UpdateAsyncPrestadores(id, prestador);

    return NoContent();
}

[HttpGet("{id:length(24)}/fotos")]
public async Task<ActionResult<List<string>>> ObterFotos(string id)
{
    var prestador = await _connectLocalService.GetAsyncPrestadores(id);
    if (prestador == null)
        return NotFound("Prestador não encontrado.");

    return Ok(prestador.Fotos);
}
```


## Classes utilizadas na API:

Prestadores:
```
public class Prestadores
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
    public List<string> TipoServico { get; set; }
    public string Descricao { get; set; }
    public string Endereco { get; set; }
    public string Contato { get; set; }
    public string Email { get; set; }
    public string CNPJ { get; set; }
    public string Funcionamento { get; set; }
    public List<Dictionary<string, string>> Avaliacoes { get; set; }
    public float MediaNota { get; set; }
    public List<string> Fotos { get; set; }
}
```
```
public class PrestadoresDto
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonElement("Name")]
    [Required]
    public string Name { get; set; }
    public string? Password { get; set; }
    [Required]
    public List<string> TipoServico { get; set; }
    [Required]
    public string Descricao { get; set; }
    [Required]
    public string Endereco { get; set; }
    [Required]
    public string Contato { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string CNPJ { get; set; }
    [Required]
    public string Funcionamento { get; set; }
}
```


Contratantes:
```
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
```
```
public class ContratantesDto
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonElement("Name")]
    [Required]
    public string Name { get; set; }
    public string? Password { get; set; }
    [Required]
    public string Endereco { get; set; }
    [Required]
    public string Contato { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string CPF { get; set; }
}
```


Autenticação:
```
public class AuthenticateDto
{
    [Required]
    public string Id { get; set; }
    [Required]
    public string Password { get; set; }
}
```

## Classes de conexão com o Banco de dados MongoDB

Classe para pegar as informações do appsettings:
```
public class ConnectLocalDBSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string ContratantesCollectionName { get; set; } = null!;
    public string PrestadoresCollectionName { get; set; } = null!;
}
```


Classe com as funções para conexão no banco de dados:
```
public class ConnectLocalService
{
    private readonly IMongoCollection<Contratantes> _contratantes;
    private readonly IMongoCollection<Prestadores> _prestadores;
    public ConnectLocalService(IOptions<ConnectLocalDBSettings> ConnecLocalDBSettings)
    {
        var mongoClient = new MongoClient(ConnecLocalDBSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(ConnecLocalDBSettings.Value.DatabaseName);
        _contratantes = mongoDatabase.GetCollection<Contratantes>(ConnecLocalDBSettings.Value.ContratantesCollectionName);
        _prestadores = mongoDatabase.GetCollection<Prestadores>(ConnecLocalDBSettings.Value.PrestadoresCollectionName);
    }

    public async Task<List<Prestadores>> GetAsyncPrestadores() => await _prestadores.Find(_ => true).ToListAsync();
    public async Task<Prestadores?> GetAsyncPrestadores(string id) => await _prestadores.Find(x => x.Id == id).FirstOrDefaultAsync();
    public async Task<Prestadores?> GetPrestadorByCNPJ(string CNPJ) => await _prestadores.Find(x => x.CNPJ == CNPJ).FirstOrDefaultAsync();
    public async Task CreateAsyncPrestadores(Prestadores newPrestador) => await _prestadores.InsertOneAsync(newPrestador);
    public async Task UpdateAsyncPrestadores(string id, Prestadores updatedPrestador) => await _prestadores.ReplaceOneAsync(x => x.Id == id, updatedPrestador);
    public async Task RemoveAsyncPrestadores(string id) => await _prestadores.DeleteOneAsync(x => x.Id == id);

    public async Task<List<Contratantes>> GetAsyncContratantes() => await _contratantes.Find(_ => true).ToListAsync();
    public async Task<Contratantes?> GetAsyncContratantes(string id) => await _contratantes.Find(x => x.Id == id).FirstOrDefaultAsync();
    public async Task<Contratantes?> GetContratanteByCPF(string CPF) => await _contratantes.Find(x => x.CPF == CPF).FirstOrDefaultAsync();
    public async Task CreateAsyncContratantes(Contratantes newContratante) => await _contratantes.InsertOneAsync(newContratante);
    public async Task UpdateAsyncContratantes(string id, Contratantes updatedContratante) => await _contratantes.ReplaceOneAsync(x => x.Id == id, updatedContratante);
    public async Task RemoveAsyncContratante(string id) => await _contratantes.DeleteOneAsync(x => x.Id == id);
}
```
