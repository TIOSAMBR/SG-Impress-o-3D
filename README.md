# SG Impress 3D PRO

Esta versão evolui o catálogo para uma experiência mais próxima de uma loja online.

## Novidades
- Produtos em destaque na home
- Novidades automáticas pelos produtos mais recentes
- Página individual de produto (`product.html?id=...`)
- Galeria com até 3 imagens por URL
- Material, tamanho, cores e prazo de produção
- Opção "Personalizável"
- Opção "Produto em destaque"
- Produtos relacionados
- Carrinho persistente entre páginas com localStorage
- Painel administrativo ampliado

## Campos novos no Firestore
Os campos são criados automaticamente quando você salvar um produto pelo painel:
- material
- size
- colors
- leadTime
- customizable
- featured
- imageUrl2
- imageUrl3

Não é necessário alterar manualmente os produtos antigos. Os campos que não existirem simplesmente ficam ocultos.

## Firebase
Continua usando:
- Firebase Authentication
- Cloud Firestore
- Imagens por URL

As regras atuais continuam compatíveis, desde que o catálogo público possa ler produtos com `available == true` e o administrador possa ler todos.


## 🎨 Hero principal em HTML e CSS

A área principal do site foi reconstruída integralmente em **HTML + CSS**, sem utilizar uma imagem de banner.

Ela inclui:

- Fundo em degradê roxo e azul
- Formas decorativas feitas com CSS
- Título e textos em HTML
- Logo da SG integrada ao layout
- Botões reais e clicáveis para Instagram e WhatsApp
- Layout responsivo para desktop e celular

A única imagem usada nessa seção é a própria logo da empresa (`logo-sg.jpg`).


## Ajuste do hero

Nesta versão, o banner principal foi compactado para ocupar menos espaço em desktop e celular.
A logo grande do hero usa `logo-sg-hd.png`, uma versão otimizada para exibição maior, enquanto a logo original continua disponível no projeto.


## Hero compacto V2

O hero foi reduzido novamente para melhorar a experiência em telas menores:
- altura menor no desktop;
- logo reduzida;
- mensagem lateral escondida em tablets;
- logo de 105 px em celulares;
- em celulares muito pequenos, a logo lateral é ocultada para priorizar texto e botões.


## Atualização de layout

- O hero simples “Sua ideia pode ganhar forma.” voltou para o topo.
- A paleta dele foi atualizada para o roxo/azul atual da SG.
- O hero mais elaborado foi movido para a seção “Fale com a SG”, mantendo os botões de Instagram e WhatsApp.
