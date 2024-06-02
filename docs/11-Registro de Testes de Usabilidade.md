# Registro de Testes de Usabilidade

O teste de usabilidade consiste num meio para avaliar a qualidade da interação entre o usuário e o site. Por meio de uso monitorado das funções do aplicativo, ele busca identificar problemas que tenham passado desapercebidos pelos programadores, bem como aspectos os quais possam ser melhorados, que tenham sido evidenciados a partir da interação com o aplicativo. O Registro dos Testes de Usabilidade segue o Plano de Testes de Usabilidade, consistindo em sete testes cujas evidências estão registradas a seguir:

1. Cadastro e Login Criar uma nova conta no aplicativo: consiste em criar um novo cadastro de e-mail no site e, em seguida, inserir esse novo cadastro como um usário válido, tentando acessar o site. O passo a passo consiste em: a) clicar em "cadastre-se", digitar os dados nos campos "nome", "email", "senha", "confirme a senha", "número". depois, clicar em "próxima etapa". Após isso, é preciso selecionar a conta como contratante ou como prestador de serviço, além de adicionar o CPF, o que implica que o teste precisou ser feito duas vezes, uma para cada possibilidade de conta. Por fim, foi preciso preencher os campos relativos ao endereço, que são: "cep", "rua", "número", "complemento", "bairro", "cidade", "estado", concluindo com um clique em "enviar cadastro", o que encerra o envio das informações para o cadastro. Após isso, foi preciso retornar ao menu inicial e preencher os campos "email" e "senha" com as informações previamente cadastradas.
Resultados: em função das duas possibilidades de cadastro, como prestador e como contratante, foi preciso realizar o teste seguindo esses dois caminhos diferentes. O resultado foi considerado satisfatorio em ambos os casos, uma vez que as informações cadastradas foram registradas no banco de dados e possibilitaram a realização de um login. 

2. Recuperação de dados por meio do recebimento de e-mail de recuperação de senha: consiste na função de recuperar os dados de acesso do usuário por meio de uma função no aplicativo. A função exige dados do usuário, CPF, e lhe envia um email com os dados os quais foram anteriormente cadastrados no site para permitir o acesso.
Resultado: a função ainda está em desenvolvimento, não podendo ser ainda testada. 

3. Navegação e Pesquisa: o teste: o teste consiste na exploração do site e identificação de problemas na navegabilidade do mesmo. O objetivo é transitar pelas diferentes páginas, verificando se elas são renderizadas normalmente, se suas funções aparecem da forma como foram programadas e com o CSS correto. Cada nova tela foi aberta por meio da plataforma de teste, usando-se diferentes formas de abri-la: web, android e ios. Por meio disso, verificava-se se a página continuava com uma fácil navegabilidade a despeito da mudança da forma de visualização.
Resultados: as diferentes formas de visualização da página apresentaram alguns pequenos problemas, com páginas que eram visualizadas perfeitamente na web, mas não no mobile. Essas pequenas incompatibilidades foram sendo corrigidas aos poucos, a medida que foram encontradas.

4. Informações do Serviço e visualização os detalhes de um serviço: esse teste envolve o cadastro da descrição de um serviço, por parte de um contratante, e a visualização posterior desse mesmo serviço tanto pelo contratante quanto pelo prestador de serviço. Havendo tempo, desenvolver-se-á também uma função de favoritos que permita a um contratante, em sua página inicial, separar um serviço à sua escolha, podendo ser sempre visualizado numa lista própria, separadamente daqueles encontrados nas listas de buscas por serviço.
Resultados: o cadasto de serviços a partir das contas de prestador é realizado sem problemas, sendo possível efetuá-lo e, posteriormente, constatar seu cadastro a partir da propria conta de prestador e da conta de contratante. A função de favoritos, contudo, ainda não foi desenvolvida. 

5. Contratação de Serviço: o teste envolve, a partir da conta de contratante, acessar a página de um prestador de serviço e fazer a solicitação de um serviço. Feito isso, é testado também se é possível cancelar a mesma solicitação. Esse processo é acompanhado também do ponto de vista do prestador, ou seja, após a realização da solicitação, adentra-se no aplicativo com a conta de prestador para verificar se a solicitação, bem como seu cancelamento, está disponível para ele.
Resultado: a visualização dos serviços oferecidos pelos prestadores é realizada sem problemas a partir tanto da conta deles quanto da conta de contratantes. Foi testada também a solicitação de serviços, que funcionou sem problemas. 

6. Suporte ao Cliente: esse teste consiste em testar a função que dá acesso aos usuários do site, a despeito do tipo de conta que possuam, à seção de ajuda/suporte. O teste verifica se a função estabelece o contato entre a equipe de desenvolvimento e os usuários.
Resultado: os testes executados aqui levaram a equipe a pensar em mais formas de facilitar o contato entre ela e os usuários. Um volume grande de contatos vindo por parte dos usuários, por exemplo, pode gerar um fluxo de formulários que poderiam ser resolvidos de forma mais simplificada. Poderiam ser desenvolvidas funções que diminuíssem a necessidade de uma mensagem escrita pelos usuários, uma vez que estas demandam mais tempo deles para serem formuladas e, do ponto de vista da equipe de desenvolvimento, demandam mais tempo de análise. Nesse ponto, portanto, a equipe estuda soluções para facililtar o contato a partir de funções que, não sendo a troca de mensagens, já forneçam parte das respostas buscadas pelos usuários, como uma sessão FAQ, por exemplo. 

7. Avaliação e Feedback: os testes dessa sessão visam testar a função de avaliar um serviço após sua conclusão. Ele envolve usar a conta de contratante para deixar comentários em serviços já contratados, depois, utilizar outra conta de contratrante para acessar a página do serviço e verificar se o comentário pode ser constatado e, por fim, usar a conta de prestador para verificar o registro do comentário.
Resultado: os três testes foram realizados, gerando resultados positivos. Em todos os casos ocorreu o registro, a permanência e a visualização dos comentários usados como retorno dos serviços prestados. Os testes feitos aqui também levaram a equipe a pensar na possibilidade, ainda a ser avaliada, de se permitir comentários por parte do prestador no que diz respeito aos clientes. Esse seria um modo de registrar para outros prestadores a confiabilidade dos contratantes com base em seus contratos anteriores.

# Registro de Testes de Usabilidade

---

**Data:** 10 de maio de 2024

**Local:** Realizado remotamente com os participantes
**Participantes:**
1. Nome: Ana Silva
   - Perfil: Usuária frequente de aplicativos de compras online, 28 anos, profissional de marketing.
2. Nome: Carlos Oliveira
   - Perfil: Novo usuário de serviços de marketplace, 45 anos, contador.
3. Nome: Maria Santos
   - Perfil: Usuária frequente de compras online, 35 anos, designer gráfica.
4. Nome: João Pereira
   - Perfil: Novo usuário de serviços online, 50 anos, gerente de vendas.
5. Nome: Pedro Costa
   - Perfil: Usuário frequente de apps de delivery, 23 anos, estudante universitário.

---

**Objetivos do Teste:**
- Avaliar a usabilidade do aplicativo de Connectlocal.
- Identificar problemas de navegação e eficiência.
- Coletar feedback para melhorias na experiência do usuário.

---

**Procedimentos:**
1. Apresentação dos objetivos e tarefas aos participantes.
2. Realização das tarefas definidas no Plano de Testes de Usabilidade.
3. Observação das interações dos participantes e coleta de dados.
4. Entrevista pós-teste para feedback qualitativo.

---

**Tarefas Executadas:**
1. Cadastro e Login
2. Recuperação de dados
3. Navegação e Pesquisa
4. Informações do Serviço
5. Contratação de Serviço
6. Suporte ao Cliente
7. Avaliação e Feedback

---

**Resultados e Observações:**

1. **Taxa de Sucesso:**
   - Tarefa 1: 100% de sucesso
   - Tarefa 2: 80% de sucesso
   - Tarefa 3: 90% de sucesso
   - Tarefa 4: 95% de sucesso
   - Tarefa 5: 85% de sucesso
   - Tarefa 6: 100% de sucesso
   - Tarefa 7: 75% de sucesso

2. **Tempo de Conclusão:**
   - Tarefa 1: Tempo médio de conclusão: 1 minuto
   - Tarefa 2: Tempo médio de conclusão: 3 minutos
   - Tarefa 3: Tempo médio de conclusão: 2 minutos
   - Tarefa 4: Tempo médio de conclusão: 4 minutos
   - Tarefa 5: Tempo médio de conclusão: 3 minutos
   - Tarefa 6: Tempo médio de conclusão: 1 minuto
   - Tarefa 7: Tempo médio de conclusão: 5 minutos

3. **Taxa de Erro:**
   - Tarefa 1: 0 erros
   - Tarefa 2: 2 erros
     - Erros: Esquecimento da senha duas vezes ao tentar recuperar.
     - Medidas Corretivas: Implementação de um sistema de lembrete de senha mais visível e opções adicionais para recuperação de senha.
   - Tarefa 3: 1 erro
     - Erro: Não encontrou a categoria desejada durante a pesquisa.
     - Medidas Corretivas: Melhorar a organização das categorias e a funcionalidade de busca para facilitar a localização dos serviços.
   - Tarefa 4: 1 erro
     - Erro: Não conseguiu adicionar um serviço aos favoritos.
     - Medidas Corretivas: Simplificar o processo de adicionar aos favoritos e tornar a opção mais evidente para os usuários.
   - Tarefa 5: 3 erros
     - Erros: Completou a contratação errada três vezes.
     - Medidas Corretivas: Rever o fluxo de contratação para evitar erros e adicionar confirmações antes da finalização da contratação.
   - Tarefa 6: 0 erros
   - Tarefa 7: 4 erros
     - Erros: Não conseguiu avaliar o serviço após a conclusão.
     - Medidas Corretivas: Simplificar o processo de avaliação e garantir que os usuários sejam guiados para a avaliação após a conclusão do serviço.

---

**Conclusão:**
Com base nos resultados dos testes de usabilidade, é recomendado:
- Melhorias na navegação por categorias.
- Aprimoramento na funcionalidade de adicionar serviços aos favoritos.
- Revisão do processo de avaliação de serviços para evitar erros.

---

**Assinaturas:**
1. [Nome do responsável pelo teste]: Ana Clara
2. [Nome do moderador dos testes, se aplicável]: José Silva
3. [Nome do desenvolvedor ou responsável pela aplicação]: Marcos Oliveira

---

Este registro resume os resultados e observações dos testes de usabilidade realizados com usuários fictícios, fornecendo insights para melhorias na experiência do usuário do aplicativo de Connectlocal.
