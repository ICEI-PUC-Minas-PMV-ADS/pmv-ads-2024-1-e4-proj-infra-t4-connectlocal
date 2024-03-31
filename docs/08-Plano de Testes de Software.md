# Plano de Testes de Software

O Plano de Teste do Software tem como finalidade atingir os seguintes objetivos:

1.	Garantir que a aplicação esteja funcionando corretamente em qualquer dispositivo móvel, tais como smartphones, tablets e computadores;
2.	Verificar se todas as funcionalidades estão operando corretamente, garantindo assim que a aplicação esteja cumprindo suas funções de forma eficaz;
3.	Assegurar que os usuários consigam utilizar a aplicação com facilidade e sem dificuldades;
4.	Assegurar a acessibilidade, independentemente de possíveis limitações do usuário.

Caso de Teste	CT-01 – Gerenciamento da Compra pelo Cliente
Requisito Associado	- O sistema deve permitir a adição, edição e exclusão de compras de prestação de serviços no sistema antes de ser efetuado o pagamento.
Objetivo do Teste	- Verificar se as funcionalidades de adição, edição e exclusão de compras estão funcionando corretamente e se as informações são armazenadas corretamente no sistema.
Passos	- Acessar o sistema.
- Acessar os serviços.
- Navegar pelo cardápio.
- Executar os seguintes casos de teste em sequência:
 Clicar no item que deseja fazer a compra.
a) Na tela de pedido clicar no pedido errado e excluir antes da compra.
B) Na tela do pedido fazer a edição acrescentando mais quantidade do mesmo item antes do envio.
c) Verificar os itens escolhidos foram encaminhados para o carrinho.
Critérios de Êxito	- Os casos de teste são executados sem erros ou falhas.
- O sistema é capaz de adicionar, editar e excluir o pedido
Caso de Teste	CT-02 – Acompanhar Status do Pedido pelo Cliente
Requisito Associado	- O sistema deve permitir o acompanhamento do status do pedido.
Objetivo do Teste	- Verificar se o sistema é capaz de acompanhar o status do pedido adquirido.
Passos	- Acessar o sistema.
- Navegar para a página do status da compra.
- Selecionar a compra.
- Verificar o status atual da compra.
Critérios de Êxito	- Os casos de teste são executados sem erros ou falhas.
- O sistema é capaz de acompanhar o status de cada ferramenta corretamente.
Caso de Teste	CT-03 – Gerenciamento do Serviço Adquirido pelo Cliente
Requisito Associado	- O sistema deve permitir a verificação do serviço contratado pelo cliente pelo prestador de serviço no sistema.
Objetivo do Teste	- Verificar se as funcionalidades de consulta ao sistema comprado estão funcionando corretamente e se as informações são armazenadas corretamente no sistema conforme a ação executada.
Passos	- Acessar o sistema.
- Acessar os pedidos realizado pelo cliente.
- Executar os seguintes casos de teste em sequência:
 Clicar no item que deseja verificar no pedido.
a) Na tela de pedido clicar no pedido.
Critérios de Êxito	- Os casos de teste são executados sem erros ou falhas.
- O sistema é capaz de exibir o serviço contratado e sua forma de pagamento.
Caso de Teste	CT-04 – Gerenciamento da Oferta de Serviços
Requisito Associado	- O sistema deve permitir que os vendedores adicione, altere e retire itens de venda e seu preço.
Objetivo do Teste	- Verificar se as funcionalidades de adição, edição e exclusão das prestações de serviços se estão funcionando corretamente e se as informações são armazenadas corretamente no sistema.
Passos	- Acessar o sistema.
- Realizar login como usuário.
- Acessar o serviço que será prestado.
- Executar os seguintes casos de teste em sequência:
 Clicar no item que deseja fazer alterar no serviço de venda.
a) Na tela de venda clicar no serviço e efetuar a exclusão.
B) Na tela de venda clicar no serviço e fazer a edição do serviço ofertado alterando preços e descrição de itens.
c) Na tela de venda acrescentar o serviço que deseja vender.

Critérios de Êxito	- Os casos de teste são executados sem erros ou falhas.
- O sistema é capaz de adicionar, editar e excluir os serviços que são colocados à venda



<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.
 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
