# 🧩 SG Impress 3D — Catálogo Online

Catálogo online desenvolvido para a **SG Impress 3D**, com foco na divulgação e venda de produtos personalizados feitos em impressão 3D.

O projeto possui uma área pública para os clientes visualizarem os produtos e montarem seus pedidos, além de um painel administrativo protegido por login para gerenciamento do catálogo.

---

## ✨ Funcionalidades

### 🛍️ Área do cliente

- Catálogo de produtos
- Produtos em destaque
- Seção de novidades
- Busca por produtos
- Filtro por categorias
- Página individual para cada produto
- Galeria de imagens
- Informações detalhadas dos produtos
- Material
- Tamanho
- Cores disponíveis
- Prazo de produção
- Indicação de produto personalizável
- Produtos relacionados
- Carrinho de compras
- Controle de quantidade
- Carrinho salvo durante a navegação
- Campo para observações
- Finalização do pedido pelo WhatsApp
- Integração com Instagram
- Layout responsivo para celular, tablet e computador

---

## 🔐 Painel administrativo

A área administrativa permite:

- Login com Firebase Authentication
- Cadastrar, editar e excluir produtos
- Definir preço e categoria
- Adicionar imagens por URL
- Adicionar descrição
- Informar material, tamanho, cores e prazo
- Definir se o produto é personalizável
- Marcar produto como destaque
- Ativar ou desativar produtos
- Configurar WhatsApp e Instagram
- Alterar o nome da loja

A página administrativa pode ser acessada por:

```text
/admin.html
```

---

## 🔥 Firebase

O projeto utiliza:

- **Firebase Authentication** para login da administradora
- **Cloud Firestore** para armazenar produtos, configurações e administradores

### Estrutura principal

```text
products
settings
admins
```

### Produtos

```text
products
└── ID_DO_PRODUTO
    ├── name
    ├── price
    ├── category
    ├── description
    ├── imageUrl
    ├── imageUrl2
    ├── imageUrl3
    ├── material
    ├── size
    ├── colors
    ├── productionTime
    ├── customizable
    ├── featured
    ├── available
    ├── createdAt
    └── updatedAt
```

### Administradores

```text
admins
└── UID_DO_USUARIO
    └── active: true
```

O ID do documento deve ser exatamente o **UID do usuário criado no Firebase Authentication**.

### Configurações da loja

```text
settings
└── store
    ├── storeName
    ├── whatsapp
    ├── instagram
    └── updatedAt
```

---

## 🔒 Regras do Firestore

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null
        && exists(
          /databases/$(database)/documents/admins/$(request.auth.uid)
        )
        && get(
          /databases/$(database)/documents/admins/$(request.auth.uid)
        ).data.active == true;
    }

    match /products/{productId} {
      allow read: if resource.data.available == true || isAdmin();
      allow create, update, delete: if isAdmin();
    }

    match /settings/store {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /admins/{uid} {
      allow read: if request.auth != null
        && request.auth.uid == uid;

      allow write: if false;
    }
  }
}
```

---

## 🖼️ Imagens dos produtos

O projeto **não utiliza Firebase Storage**.

As imagens são adicionadas através de URLs externas.

Tamanho recomendado:

```text
1080 × 1080 px
```

Formatos recomendados:

```text
WebP
JPG
PNG
```

---

## 📱 Integração com WhatsApp

O cliente pode montar o carrinho e finalizar o pedido diretamente pelo WhatsApp.

A mensagem inclui automaticamente:

- Nome do cliente
- Produtos
- Quantidades
- Valores
- Total
- Observações

---

## 🛒 Carrinho

O carrinho permite:

- Adicionar produtos
- Aumentar e diminuir quantidades
- Remover itens
- Visualizar subtotal
- Continuar comprando
- Finalizar pelo WhatsApp

O carrinho permanece salvo durante a navegação entre a página inicial e as páginas dos produtos.

---

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Firebase Authentication
- Cloud Firestore
- Firebase JavaScript SDK
- WhatsApp `wa.me`

---

## 📁 Estrutura do projeto

```text
SG-Impress3D/
│
├── index.html
├── product.html
├── admin.html
│
├── style.css
│
├── app.js
├── product.js
├── admin.js
│
├── firebase.js
├── firebase-config.js
│
├── firestore.rules
│
├── logo-sg.jpg
├── favicon.png
├── favicon.ico
│
└── README.md
```

---

## 🚀 Executando o projeto

Como o projeto utiliza módulos JavaScript, utilize um servidor local.

### VS Code

Uma opção simples é usar a extensão:

```text
Live Server
```

Depois abra:

```text
index.html
```

com:

```text
Open with Live Server
```

---

## ⚙️ Configuração do Firebase

1. Crie um projeto no Firebase Console.
2. Ative **Authentication**.
3. Habilite **Email/Password**.
4. Crie o usuário administrador.
5. Ative o **Cloud Firestore**.
6. Crie:

```text
admins
└── UID_DO_USUARIO
```

com:

```text
active = true
```

do tipo **Boolean**.

---

## 🌐 Configuração Firebase Web

Os dados do aplicativo Web ficam em:

```text
firebase-config.js
```

Exemplo:

```javascript
export const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};
```

> Nunca publique chaves privadas, Service Accounts ou credenciais administrativas.

---

## 🌐 Publicação

O projeto pode ser hospedado em:

- Firebase Hosting
- GitHub Pages
- Vercel
- Netlify

---

## 📲 Responsividade

O site foi desenvolvido para funcionar em:

- Desktop
- Notebook
- Tablet
- Smartphone

---

## 🎯 Objetivo do projeto

Facilitar a divulgação dos produtos da **SG Impress 3D** e permitir que clientes encontrem peças, visualizem informações detalhadas e façam seus pedidos pelo WhatsApp.

---

## 📸 SG Impress 3D

Instagram:

```text
@sg_impress3d
```

---

## 📄 Licença

Projeto desenvolvido para uso da **SG Impress 3D**.

Todos os direitos sobre a identidade visual, produtos, imagens e marca pertencem aos seus respectivos proprietários.
