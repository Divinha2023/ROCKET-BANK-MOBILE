# Rocket Bank Mobile

App mobile ficticio de banco digital feito com **Expo**, **React Native** e **TypeScript**. A aplicacao simula uma experiencia bancaria completa com login, home, cartoes, Pix, investimentos, shopping, cashback, comunidade, suporte, perfil, extrato e fatura.

##Tecnologias Usadas

- Expo 54
- React 19
- React Native 0.81
- TypeScript
- Expo Linear Gradient
- Expo Vector Icons

## Como iniciar o projeto

Instale as dependencias:

```bash
npm install
```

Inicie o Expo:

```bash
npm start
```

Depois, escolha uma opcao:

```bash
npm run android   # abre no Android
npm run ios       # abre no iOS, apenas macOS
npm run web       # abre no navegador
```

Para testar no celular, abra o **Expo Go** e leia o QR Code exibido pelo terminal.

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm start` | Inicia o servidor Expo |
| `npm run android` | Executa no Android |
| `npm run ios` | Executa no iOS |
| `npm run web` | Executa no navegador |
| `npm run typecheck` | Valida os tipos do TypeScript |

## Estrutura

```text
.
|-- assets/
|   |-- animations/
|   `-- images/
|-- src/
|   |-- components/
|   |-- data/
|   |-- screens/
|   |-- theme/
|   |-- types/
|   `-- utils/
|-- App.tsx
|-- app.json
|-- index.ts
`-- package.json
```

## Pastas principais

- `src/App.tsx`: estado principal, fluxo de login, splash e navegacao entre telas.
- `src/screens`: telas completas do app.
- `src/components`: componentes reutilizaveis.
- `src/data`: dados mockados de cartoes, produtos e fatura.
- `src/theme`: cores, medidas e estilos compartilhados.
- `src/types`: tipos usados no projeto.
- `src/utils`: funcoes auxiliares.

## Padrao dos arquivos

Os arquivos `.tsx` seguem esta organizacao:

```text
1. Imports
2. Constantes, tipos e funcoes auxiliares
3. Componente principal e logicas
4. Estilos no final com StyleSheet.create
```

Esse padrao facilita ler primeiro o comportamento da tela ou componente e deixar a parte visual agrupada no final.

## Validação

Antes de finalizar alterações, rode:

```bash
npm run typecheck
```

## Observacao

O projeto ainda não possui backend. Os fluxos usam estado local e dados mockados para simular a experiência do aplicativo.
