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
