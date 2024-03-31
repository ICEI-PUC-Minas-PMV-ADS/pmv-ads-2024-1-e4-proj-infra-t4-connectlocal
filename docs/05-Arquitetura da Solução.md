# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-connectlocal/assets/114544326/4403dda8-ee7d-418b-83f6-70d7149103fa)




## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Justificativa e avaliação do modelo de dados NoSQL para o contexto da aplicação

O principal motivo para a adoção do banco de dados não relacional é a flexibilidade que este modelo fornece, uma vez que ele permite a organização de dados de uma maneira mais livre do que o relacional. Embora o modelo relacional possa funcionar inicialmente na plataforoma, a medida que a marketplace aumentasse seu volume de dados e sofresse mudanças para se adequar às novidades do negócio, uma estrutura muito rígida dificultaria que o armazenamento de dados seja redesenhado. Com isso, o modelo não relacional ganha relevância como uma solução nesse sentido, uma vez que ele permite que ocorra uma reorganização da estrutura de dados e que ela seja adaptada a novas funcionalidades e necessidades advindas do modelo de negócio.

Além disso, mesmo com o crescimento do negócio, esse modelo de banco de dados mantém uma boa agilidade, sendo bastante escalável, o que permitirá manter a plataforma rápida e as atualizações fáceis.

Quanto ao modelo de armazenamento, os dados do projeto serão armazenados a partir da estrutura de chave valor. Trata-se de uma estrutura simples e ágil, adequada para tratar dados de baixa persistência e que apresenta uma boa escalabilidade horizontal, caso seja preciso reorganizar os dados de algum modo que requeira a reorganização das informações ligadas a cada chave. 

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

## O modelo de qualidade

Qualidade consiste no cumprimento dos requisitos funcionais e não funcionais de um projeto, dentro do prazo e orçamento estipulado. Trata-se de uma característica que indica o quão bem a realização de um projeto atinge os objetivos estipulados por ele. Para que a qualidade seja atingida é necessário que se estabeleça um modelo que determine como ela será verificada e indicadores por meio dos quais ela será atestada. O modelo estabelece o que será entendido como qualidade, isto é, como cumprimento dos objetivos, e os indicadores medirão quão bem esses objetivos são cumpridos. Há um laço entre o modelo de qualidade, seus indicadores e os elementos resultantes do projeto, portanto.
Contudo, enquanto o prazo e orçamento possuem valores ou datas que não podem ser ultrapassados e que, em função disso, servem como métricas claras de qualidade, outros aspectos do projeto não estabelecem automaticamente suas métricas. Assim, é preciso elaborá-las a partir de um modelo de qualidade. Existem diferentes modelos desse tipo, no entanto, para os fins deste projeto, adotaremos a norma técnica ISO/IEC 25010 (uma atualização da ISO/IEC 9126) e usaremos alguns de seus indicadores para avaliar se os requisitos do ConnectLocal foram bem cumpridos ou não na entrega do aplicativo. Serão identificadas a partir de métricas que, de um lado, medirão a eficiência do software em cumprir o que foi estipulado, de outro, medirão a lucratividade do negócio em função de suas metas comerciais. Elas serão derivadas diretamente da ISO/IEC 25010 e relacionadas com os requisitos (funcionais e não funcionais) do projeto e seus objetivos como negócio.

## Métricas de qualidade

Dentro da ISO serão utilizadas características atinentes à Funcionalidade, Portabilidade e Usabilidade. 
No que diz respeito à Funcionalidade do software, duas subcaracterísticas serão priorizadas: Acurácia e Segurança de Acesso. A primeira indica o quanto as funcionalidades desenvolvidas cumprem os objetivos estipulados no projeto, algo que, nesse caso, aplica-se especificamente ao funcionamento “mecânico” do aplicativo; não propriamente a sua capacidade de produzir um negócio de sucesso. A Acurácia será aqui tomada como uma medida qualitativa, que será considerada satisfatória se os requisitos implementados funcionarem tal como foram planejados. Para indicá-la serão elaborados testes de qualidade nas diferentes plataformas (PC, Mobile etc.) para verificar se as funcionalidades cumprem seu objetivo. A segunda subcaracterística, Segurança de Acesso, indica se o sistema está protegido de acessos externos indesejados. Ela é crucial para garantir que o aplicativo não divulgue sem querer dados do cliente ou do comerciante/prestador de serviço (confidencialidade), o que poderia levar a problemas como prática abusiva e outras infrações. Por isso, a Segurança de Acesso será medida qualitativamente, como existindo ou não de acordo com os dispositivos implementados para garantir o acesso limitado de usuários. 
Quanto à Portabilidade, será priorizada a Adaptabilidade. O ConnectLocal visa integrar pessoas e clientes de uma mesma região, disponibilizando para tanto uma plataforma que pode ser acessada pelo PC e pelo Mobile. Em função disso, é fundamental que a plataforma possa ser acessada, sem diferença de performance ou qualidade, a partir das duas formas, estando adaptada as singularidades de cada meio de acesso. Se seu objetivo é conectar, ela mesma precisa ser um meio eficiente e acessível para realizar essa conexão.
Por fim, no que diz respeito à Usabilidade, a subcaracterística a ser priorizada será a Estética da interface de usuário e a Operabilidade. Como se trata de uma plataforma de serviços locais, é preciso que a interface seja, ao mesmo tempo, simples e agradável, o que requer um trabalho esmerado no que diz respeito à construção da Estética de interface, bem como no que diz respeito aos mecanismos de navegação do site. O usuário precisa estar no controle todo o tempo, sabendo o que está a fazer e como conseguir, por meio dos mecanismos disponibilizados, aquilo que deseja no site. Nesse caso, é possível medir a eficiência ds plataforma de duas formas: mapeando o fluxo da mesma conforme ela for acessado, o que ajuda a verificar quais são as funções mais utilizadas pelos usuários, quais são aquelas que estão sendo ignoradas e que, portanto, podem ser repensadas etc.; outro modo é disponibilizar pesquisas de satisfação para o usuário a respeito da experiência do mesmo na plataforma, utilizando-se o resultado delas para aprimorar da mesma.

