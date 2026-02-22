# Lexis AI

Aplicação web para reconhecimento do alfabeto manual de Libras em tempo real, rodando **100% no navegador** com MediaPipe Hands.

## Objetivo

O projeto foi organizado para funcionar como site estático, ideal para deploy direto no **GitHub Pages**, sem backend e sem build.

## Funcionalidades

- Reconhecimento de sinais via webcam (MediaPipe Hands)
- Classificador geométrico simples para letras do alfabeto manual
- Auto-adição de letras ao manter o sinal estável
- Histórico de letras, estatísticas e referência visual do alfabeto
- Edição rápida de frase (espaço, apagar, limpar, copiar)
- Atalhos de teclado para UX mais fluida
- Interface responsiva para desktop e mobile

## Estrutura

```text
.
├── index.html
├── assets
│   ├── css
│   │   └── main.css
│   ├── icons
│   │   └── favicon.svg
│   └── js
│       └── app.js
└── .github
    └── workflows
        └── deploy-pages.yml
```

## Executar localmente

Como é estático, basta servir os arquivos com qualquer servidor HTTP.

Exemplo com Python:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Deploy no GitHub Pages

O workflow `deploy-pages.yml` publica automaticamente o conteúdo da branch `main` no GitHub Pages em push manual ou automático.

Pré-requisitos no repositório GitHub:

1. `Settings > Pages > Build and deployment`: selecione **GitHub Actions**.
2. Dê push da branch `main`.

## Privacidade

- O processamento acontece no browser.
- Não há upload de vídeo para servidor.

## Renomeação

O branding foi atualizado de **LibrasAI** para **Lexis AI** em interface, título e documentação.
