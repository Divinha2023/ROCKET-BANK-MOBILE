# Rocket Bank Mobile

Aplicativo mobile ficticio de banco digital construido com Expo, React Native e TypeScript. O projeto simula a experiencia de um super app financeiro com tela inicial, cartoes, Pix, investimentos, shopping, cashback, comunidade, suporte, perfil, extrato e fatura.

## Visao Geral

O Rocket Bank Mobile foi pensado como uma interface completa para demonstrar fluxos comuns de um app bancario moderno:

- Login e cadastro com validacoes de CPF, e-mail e telefone.
- Splash screen animada com Lottie.
- Home com saldo, atalhos, cartao em destaque e ultimas transacoes.
- Gestao de cartoes, cartoes virtuais, bloqueio, visualizacao de dados e fatura.
- Pix com contatos favoritos, limite diario e validacao de saldo.
- Investimentos com simulacao de carteira e compra de ativos.
- Shopping com categorias, produtos, carrinho, cupom e cashback.
- Cashback, comunidade, suporte, perfil, extrato e pagamento de fatura.

## Tecnologias

- Expo 54
- React 19
- React Native 0.81
- TypeScript
- Expo Linear Gradient
- Expo Vector Icons
- Lottie React Native
- React Native Safe Area Context

## Requisitos

Antes de rodar, instale:

- Node.js 20 ou superior
- npm
- Expo Go no celular, se quiser testar em dispositivo fisico
- Android Studio, se quiser testar em emulador Android
- Xcode, se quiser testar em simulador iOS no macOS

Para confirmar as versoes:

```bash
node -v
npm -v
```

## Como Rodar o Projeto

### 1. Instale as dependencias

Na raiz do projeto, execute:

```bash
npm install
```

### 2. Inicie o servidor Expo

```bash
npm start
```

O terminal vai abrir o painel do Expo com um QR Code.

### 3. Escolha onde executar

Para rodar no celular:

1. Instale o app Expo Go.
2. Abra o Expo Go.
3. Leia o QR Code exibido no terminal ou navegador.
4. Aguarde o app carregar.

Para rodar no Android:

```bash
npm run android
```

Para rodar no iOS, apenas no macOS com Xcode:

```bash
npm run ios
```

Para rodar no navegador:

```bash
npm run web
```

## Scripts Disponiveis

```bash
npm start
```

Inicia o servidor de desenvolvimento do Expo.

```bash
npm run android
```

Inicia o projeto no emulador Android ou dispositivo conectado.

```bash
npm run ios
```

Inicia o projeto no simulador iOS. Requer macOS e Xcode.

```bash
npm run web
```

Inicia o projeto no navegador.

```bash
npm run typecheck
```

Executa a verificacao de tipos do TypeScript sem gerar arquivos.

## Estrutura de Pastas

```text
.
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── assets/
│   ├── animations/
│   └── images/
└── src/
    ├── App.tsx
    ├── components/
    ├── data/
    ├── screens/
    ├── theme/
    ├── types/
    └── utils/
```

## Principais Diretorios

`assets/`

Guarda icones, imagens e animacoes usadas pelo app, incluindo a animacao Lottie da splash screen e imagens do shopping.

`src/App.tsx`

Concentra o estado principal da aplicacao, controla login, splash screen, tela ativa, saldo, cashback, cartoes, Pix, investimentos e pagamento de fatura.

`src/components/`

Componentes reutilizaveis, como layout geral, menu inferior, cards, botoes, linhas de menu, popup customizado e componentes visuais de cartao.

`src/screens/`

Telas principais do aplicativo. Cada arquivo representa uma area da experiencia, como Home, Pix, Cartoes, Shopping e Investimentos.

`src/data/`

Dados mockados usados para alimentar produtos, categorias, cartoes e fatura.

`src/theme/`

Cores, medidas globais e estilos comuns.

`src/types/`

Tipos compartilhados entre telas, componentes e dados.

`src/utils/`

Funcoes utilitarias, como formatacao e leitura de valores monetarios.

## Padrao de Organizacao dos Arquivos

Os arquivos `.tsx` foram organizados para manter uma leitura consistente:

```text
1. Imports
2. Constantes, tipos locais e funcoes auxiliares
3. Componente principal e funcoes de logica/renderizacao
4. Estilos com StyleSheet.create no final do arquivo
```

Esse padrao deixa a parte visual isolada no final e facilita encontrar primeiro o fluxo, as regras de negocio e a renderizacao.

Exemplo:

```tsx
import { StyleSheet, Text, View } from 'react-native';

type ExampleProps = {
  title: string;
};

function formatTitle(value: string) {
  return value.trim();
}

export function Example({ title }: ExampleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formatTitle(title)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
```

## Fluxo da Aplicacao

1. `App.tsx` na raiz exporta o app real de `src/App.tsx`.
2. `src/App.tsx` envolve a aplicacao com `SafeAreaProvider` e `AppPopupProvider`.
3. A splash screen aparece por alguns segundos.
4. Se o usuario ainda nao estiver logado, a tela de login e exibida.
5. Depois do login, o app renderiza `AppLayout` com a tela ativa.
6. O menu inferior troca a tela usando o estado `activeScreen`.

## Estado Principal

O estado principal fica em `src/App.tsx` e controla:

- Saldo da conta.
- Saldo de cashback.
- Cartoes cadastrados.
- Cartoes com fatura paga.
- Cartao selecionado para fatura.
- Carteira de investimentos.
- Uso diario de Pix.
- Tela ativa.
- Login e splash.

## Dados Mockados

Os dados de exemplo ficam em `src/data/mockData.ts`:

- Categorias do shopping.
- Produtos do shopping.
- Cartoes do usuario.
- Cartoes virtuais disponiveis.
- Dados de fatura.

Esses dados permitem testar os fluxos sem backend.

## Estilo e Tema

As cores e estilos compartilhados ficam em `src/theme/index.ts`. A interface usa tema escuro com roxo, laranja, branco, verde e tons neutros.

Quando criar novos componentes, prefira reutilizar:

- `colors` para paleta.
- `commonStyles` para estilos compartilhados.
- `StyleSheet.create` ao final do arquivo.

## Validacao de Tipos

Para conferir se o TypeScript esta correto:

```bash
npm run typecheck
```

Esse comando deve ser executado antes de finalizar alteracoes importantes.

## Solucao de Problemas

Se o Expo nao iniciar, tente limpar o cache:

```bash
npm start -- --clear
```

Se as dependencias ficarem inconsistentes, reinstale:

```bash
rm -rf node_modules package-lock.json
npm install
```

No Windows PowerShell, use:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

Se o emulador Android nao abrir:

- Confirme se o Android Studio esta instalado.
- Abra o Android Studio ao menos uma vez.
- Crie um dispositivo virtual em Device Manager.
- Rode novamente `npm run android`.

Se estiver usando celular fisico:

- Celular e computador devem estar na mesma rede.
- O Expo Go precisa estar atualizado.
- Se o QR Code falhar, tente a opcao Tunnel no Expo.

## Boas Praticas para Continuar o Projeto

- Manter componentes reutilizaveis em `src/components`.
- Manter telas completas em `src/screens`.
- Evitar duplicar cores fora de `src/theme`.
- Criar tipos compartilhados em `src/types`.
- Colocar dados estaticos ou mocks em `src/data`.
- Deixar funcoes auxiliares antes do componente quando forem especificas do arquivo.
- Deixar `StyleSheet.create` sempre no final dos arquivos `.tsx`.
- Rodar `npm run typecheck` antes de entregar novas alteracoes.

## Status Atual

O projeto esta configurado para desenvolvimento local com Expo e TypeScript. Ainda nao ha backend integrado; os fluxos usam estado local e dados mockados.
