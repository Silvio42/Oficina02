# Controle de presença - ELLP

Sistema desenvolvido para o gerenciamento de presença nas oficinas do projeto de extensão **ELLP - Ensino Lúdico de Lógica e Programação**. O projeto visa facilitar o acompanhamento de frequência e oferecer um controle mais acessível para alunos e voluntários.

## Sumário
- [Autores](#autores)
- [Objetivo do projeto](#objetivo-do-projeto)
- [Requisitos funcionais](#requisitos-funcionais)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura do sistema](#arquitetura-do-sistema)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)

## Autores

* Bruno Alves RA: 2426730
* Jhennifer Andrade RA: 2267896
* Silvio Jorge de Oliveira Filho RA: 2052261

## Objetivo do projeto

O Controle de presença - ELLP foi criado para auxiliar o controle de frequência de alunos e voluntários nas oficinas do projeto ELLP, que promove o ensino de lógica e programação para jovens de escolas públicas. O sistema permite o gerenciamento de cadastros, lançamentos de presença e consulta de faltas, visando democratizar o acesso ao ensino tecnológico.

## Requisitos funcionais

- **RF01**: O sistema deve permitir o cadastro de voluntários, exigindo informações como e-mail, data de nascimento e senha, que deve ser reinserida para garantir integridade.
- **RF02**: O sistema deve permitir que os voluntários realizem o login, utilizando o e-mail e a senha cadastrada e confirmada anteriormente.
- **RF03**: O sistema deve permitir que os voluntários cadastrem as workshops ofertadas pelo projeto.
- **RF04**: O sistema deve permitir a inclusão de voluntários em workshops.
- **RF05**: O sistema deve permitir a inclusão de alunos nos workshops.
- **RF06**: O sistema deve disponibilizar certificados de presença aos voluntários.
- **RF07**: O sistema deve disponibilizar certificados de presença aos alunos dos workshops.

## Tecnologias utilizadas

- Front-end: HTML, CSS e JavaScript
- Back-end: Node.js 
- Banco de dados: MongoDB

## Arquitetura do sistema

A arquitetura do sistema será baseada em uma arquitetura de três camadas para modularizar responsabilidades, garantir escalabilidade e facilitar a manutenção.

### Diagrama de arquitetura

![Diagrama de Arquitetura](docs/diagramas/Diagrama%20de%20Arquitetura.jpg)

### Fluxo de comunicação

1. Usuário interage com a Camada de Apresentação
2. Camada de Apresentação envia e recebe dados do back-end via requisições HTTP
3. Back-end processa as requisições, aplica a lógica de negócios e interage com o banco de dados
4. Banco de dados armazena e retorna dados ao back-end, que responde ao front-end


## Pré-requisitos

Antes de iniciar, certifique-se de que seu ambiente de desenvolvimento possui os seguintes requisitos:

- Um navegador moderno como Google Chrome, Mozilla Firefox, ou Safari.
- Acesso a um servidor web local ou remoto para hospedar os arquivos do projeto.
- VS Code para poder navegar com mais facilidades no código-fonte do projeto
- **Node.js** (versão mínima 14)
- **MongoDB** (local ou na nuvem)

## Instalação

Siga estas etapas para configurar o projeto em seu ambiente local:

1. Clone o repositório do projeto: Abra o terminal ou prompt de comando e execute o comando abaixo para clonar o repositório:

- git clone https://github.com/Silvio42/Oficina02
- Acesse o diretório do projeto

2. Configuração do MongoDB:

- Inicie o serviço MongoDB: Abra um terminal separado e execute o comando para iniciar o mongod: mongod
- Inicie o shell do MongoDB: Em outro terminal, inicie o shell mongosh para interagir com o MongoDB: mongosh

3. Instale as dependências:

- No diretório do projeto, execute o seguinte comando para instalar as dependências necessárias, incluindo o CORS:

- npm install
- npm install cors

4. Inicialize o servidor Node.js: Navegue até a pasta js e inicie o servidor Node.js com o seguinte comando:

- node app.js

5. Abra o projeto no VS Code: 

- No Visual Studio Code, abra o diretório onde o projeto foi clonado.
- Instale a extensão Live Server: No VS Code, instale a extensão Live Server, que facilita a execução do projeto no navegador.
- Execute o projeto: Com a extensão Live Server instalada, clique com o botão direito no arquivo index.html e selecione "Open with Live - Server" para rodar o projeto no navegador.




