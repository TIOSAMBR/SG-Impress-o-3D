import { db } from "./firebase.js";
import { collection, getDocs, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

let products=[], activeCategory="Todos", visibleCount=8;
const PAGE_SIZE=8, CART_KEY="sgImpress3D_cart";
let cart=JSON.parse(localStorage.getItem(CART_KEY)||"[]");
let config={storeName:"SG Impress 3D",whatsapp:"",instagram:""};
const $=id=>document.getElementById(id);
const money=v=>Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const normalizeInstagram=v=>!v?"":/^https?:\/\//i.test(v.trim())?v.trim():`https://www.instagram.com/${v.trim().replace(/^@/,"")}/`;
const whatsappUrl=msg=>`https://wa.me/${String(config.whatsapp||"").replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;

async function loadConfig(){const s=await getDoc(doc(db,"settings","store"));if(s.exists())config={...config,...s.data()}}
async function loadProducts(){const q=query(collection(db,"products"),where("available","==",true));const s=await getDocs(q);products=s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0))}
function applyStoreConfig(){
  $("storeName").textContent=config.storeName;
  $("footerName").textContent=config.storeName;
  document.title=`${config.storeName} | Catálogo`;

  const ig=normalizeInstagram(config.instagram);
  const wa=whatsappUrl("Olá! Gostaria de saber mais sobre os produtos da SG Impress 3D.");

  [
    ["instagramLink",ig],
    ["whatsappLink",wa],
    ["heroInstagramLink",ig],
    ["heroWhatsappLink",wa]
  ].forEach(([id,url])=>{
    const el=$(id);
    if(!el) return;

    if(url){
      el.href=url;
      el.classList.remove("is-disabled");
    }else{
      el.href="#";
      el.classList.add("is-disabled");
    }
  });
}
function productCard(p){const tags=[];if(p.featured)tags.push('<span class="product-tag product-tag--featured">Destaque</span>');if(p.customizable)tags.push('<span class="product-tag">Personalizável</span>');return `<article class="product-card"><a class="product-card__image" href="product.html?id=${p.id}">${p.imageUrl?`<img src="${esc(p.imageUrl)}" alt="${esc(p.name)}" loading="lazy">`:'<span class="no-image">Sem imagem</span>'}<div class="product-card__tags">${tags.join("")}</div></a><div class="product-card__content"><span class="product-card__category">${esc(p.category||"Outros")}</span><a class="product-card__name" href="product.html?id=${p.id}">${esc(p.name)}</a><p>${esc(p.description||"")}</p><div class="product-card__bottom"><strong>${money(p.price)}</strong><button data-add="${p.id}" aria-label="Adicionar ${esc(p.name)} ao carrinho">＋</button></div><a class="view-product-link" href="product.html?id=${p.id}">Ver detalhes</a></div></article>`}
function bindAddButtons(root=document){root.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>addToCart(b.dataset.add,1))}
function renderSpecialSections(){const featured=products.filter(p=>p.featured).slice(0,4),news=products.slice(0,4);const f=$("featuredProducts"),n=$("newProducts");f.innerHTML=featured.map(productCard).join("");n.innerHTML=news.map(productCard).join("");$("destaques").classList.toggle("hide-section",!featured.length);$("novidades").classList.toggle("hide-section",!news.length);bindAddButtons(f);bindAddButtons(n)}
function renderCategories(){const cats=["Todos",...new Set(products.map(p=>p.category||"Outros"))];$("cats").innerHTML=cats.map(c=>`<button class="cat ${c===activeCategory?"active":""}" data-category="${esc(c)}">${esc(c)}</button>`).join("");document.querySelectorAll("[data-category]").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.category;visibleCount=PAGE_SIZE;renderCategories();renderProducts()})}
function renderProducts(){const term=$("search").value.trim().toLowerCase();const filtered=products.filter(p=>(activeCategory==="Todos"||(p.category||"Outros")===activeCategory)&&`${p.name} ${p.description||""} ${p.material||""} ${p.colors||""}`.toLowerCase().includes(term));const shown=filtered.slice(0,visibleCount);$("products").innerHTML=shown.map(productCard).join("");$("empty").classList.toggle("hide",!!filtered.length);$("loadMore").classList.toggle("hide",shown.length>=filtered.length);bindAddButtons($("products"))}
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCartCount()}
function addToCart(id,qty=1){const item=cart.find(x=>x.id===id);item?item.qty+=qty:cart.push({id,qty});saveCart();renderCart();openCart()}
function updateCartCount(){const n=cart.reduce((s,x)=>s+x.qty,0);$("cartCount").textContent=n;$("floatingCartCount").textContent=n}
function renderCart(){let total=0;$("cartItems").innerHTML=cart.length?cart.map(i=>{const p=products.find(x=>x.id===i.id);if(!p)return"";const sub=Number(p.price)*i.qty;total+=sub;return `<div class="cart-item"><img src="${esc(p.imageUrl||"")}" alt=""><div class="cart-item__info"><strong>${esc(p.name)}</strong><small>${money(p.price)}</small><div class="cart-item__qty"><button data-qty="${p.id}" data-change="-1">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-change="1">+</button></div></div><strong>${money(sub)}</strong></div>`}).join(""):'<div class="cart-empty"><span>🛍️</span><p>Seu carrinho está vazio.</p></div>';$("total").textContent=money(total);document.querySelectorAll("[data-qty]").forEach(b=>b.onclick=()=>changeQty(b.dataset.qty,Number(b.dataset.change)))}
function changeQty(id,n){const i=cart.find(x=>x.id===id);if(!i)return;i.qty+=n;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();renderCart()}
function openCart(){$("cart").classList.remove("hide");document.body.classList.add("cart-open")}
function closeCart(){$("cart").classList.add("hide");document.body.classList.remove("cart-open")}
$("search").oninput=()=>{visibleCount=PAGE_SIZE;renderProducts()};$("loadMore").onclick=()=>{visibleCount+=PAGE_SIZE;renderProducts()};$("cartButton").onclick=()=>{renderCart();openCart()};$("floatingCart").onclick=()=>{renderCart();openCart()};$("closeCart").onclick=closeCart;$("continueShopping").onclick=closeCart;$("cart").onclick=e=>{if(e.target===$("cart"))closeCart()};document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
$("checkout").onclick=()=>{if(!cart.length)return alert("Adicione pelo menos um produto ao carrinho.");const phone=String(config.whatsapp||"").replace(/\D/g,"");if(!phone)return alert("O WhatsApp da loja ainda não foi configurado.");let total=0,msg=`Olá! Gostaria de fazer um pedido na ${config.storeName}.\n\n*Nome:* ${$("customer").value.trim()||"Cliente"}\n\n*Pedido:*\n`;cart.forEach(i=>{const p=products.find(x=>x.id===i.id);if(!p)return;const sub=Number(p.price)*i.qty;total+=sub;msg+=`• ${i.qty}x ${p.name} — ${money(sub)}\n`});msg+=`\n*Total: ${money(total)}*`;const note=$("note").value.trim();if(note)msg+=`\n\n*Observação:* ${note}`;window.open(whatsappUrl(msg),"_blank")};
$("year").textContent=new Date().getFullYear();
(async()=>{try{await Promise.all([loadConfig(),loadProducts()]);applyStoreConfig();renderSpecialSections();renderCategories();renderProducts();updateCartCount()}catch(e){console.error(e);$("products").innerHTML='<div class="catalog-error"><strong>Não foi possível carregar o catálogo.</strong><span>Confira a conexão e tente novamente.</span></div>'}})();