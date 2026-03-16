const PRODUCTS = {
  'pet-ball': {
    id: 'pet-ball',
    name: 'Pet Ball',
    price: 50,
    image: 'images/toy1.jpg',
    description: 'Bouncy soft-rubber ball for medium-energy play sessions and basic fetch training.',
    highlights: ['Non-toxic rubber', 'Indoor & outdoor play', 'Easy to clean']
  },
  'pet-bite-toy': {
    id: 'pet-bite-toy',
    name: 'Pet Bite Toy',
    price: 30,
    image: 'images/toy2.jpg',
    description: 'Durable bite toy for teething pets and light chewers who need stress release.',
    highlights: ['Flexible chew-safe material', 'Great for teething pets', 'Helps reduce boredom']
  }
};

let cart = [];

const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutForm = document.getElementById('checkout-form');
const formError = document.getElementById('form-error');
const clearCartBtn = document.getElementById('clear-cart-btn');

const detailModal = document.getElementById('detail-modal');
const detailImage = document.getElementById('detail-image');
const detailTitle = document.getElementById('detail-title');
const detailPrice = document.getElementById('detail-price');
const detailDescription = document.getElementById('detail-description');
const detailHighlights = document.getElementById('detail-highlights');
const detailClose = document.getElementById('detail-close');


const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product[data-category]');

function dedupeProductCards(){
  const seen = new Set();
  productCards.forEach(card=>{
    const id = card.dataset.id;
    if(!id){
      return;
    }
    if(seen.has(id)){
      card.remove();
      return;
    }
    seen.add(id);
  });
}

dedupeProductCards();

function applyFilter(category){
  productCards.forEach(card=>{
    const show = category === 'all' || card.dataset.category === category;
    card.style.display = show ? 'block' : 'none';
  });
}

filterButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterButtons.forEach(other=>other.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter || 'all');
  });
});

const panelLinks = document.querySelectorAll('a[data-panel]');
const homeLink = document.querySelector('a[href="#home"]');
const cartLink = document.getElementById('cart-link');
const infoPanel = document.getElementById('information');
const aboutPanel = document.getElementById('about-us');

function showToast(message){
  const toast=document.createElement('div');
  toast.textContent=message;
  toast.style.position='fixed';
  toast.style.bottom='20px';
  toast.style.left='50%';
  toast.style.transform='translateX(-50%)';
  toast.style.background='rgba(0,0,0,0.85)';
  toast.style.color='white';
  toast.style.padding='12px 20px';
  toast.style.borderRadius='25px';
  toast.style.fontSize='14px';
  toast.style.zIndex='2000';
  toast.style.opacity='0';
  toast.style.transition='opacity 0.5s ease';
  document.body.appendChild(toast);
  requestAnimationFrame(()=>{ toast.style.opacity='1'; });
  setTimeout(()=>{ toast.style.opacity='0'; toast.addEventListener('transitionend',()=>toast.remove()); },1800);
}

function updateCart(){
  if(!cartItems || !cartTotal || !cartCount){
    return;
  }

  cartCount.textContent = String(cart.length);

  if(cart.length===0){
    cartItems.innerHTML='<p>Your cart is empty.</p>';
    cartTotal.textContent='';
    return;
  }

  cartItems.innerHTML='';
  let total=0;
  cart.forEach(item=>{
    const div=document.createElement('div');
    div.textContent=`${item.name} - ¥${item.price}`;
    cartItems.appendChild(div);
    total+=item.price;
  });
  cartTotal.textContent=`Total: ¥${total}`;
}

function addToCart(productId){
  const product = PRODUCTS[productId];
  if(!product){
    return;
  }
  cart.push(product);
  updateCart();
  showToast(`${product.name} added to cart!`);
}

function openDetailModal(productId){
  const product = PRODUCTS[productId];
  if(!product || !detailModal){
    return;
  }

  detailImage.src = product.image;
  detailImage.alt = product.name;
  detailTitle.textContent = product.name;
  detailPrice.textContent = `¥${product.price}`;
  detailDescription.textContent = product.description;

  if(detailHighlights){
    detailHighlights.innerHTML = '';
    product.highlights.forEach(item=>{
      const li = document.createElement('li');
      li.textContent = item;
      detailHighlights.appendChild(li);
    });
  }

  detailModal.classList.remove('hidden-panel');
  detailModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}

function closeDetailModal(){
  if(!detailModal){
    return;
  }
  detailModal.classList.add('hidden-panel');
  detailModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}

function setFormError(message){
  if(formError){
    formError.textContent = message;
  }
}

function hidePanels(){
  [infoPanel, aboutPanel].forEach(panel => panel && panel.classList.add('hidden-panel'));
}

function showPanel(panelId){
  hidePanels();
  const target = document.getElementById(panelId);
  if(target){
    target.classList.remove('hidden-panel');
    target.scrollIntoView({ behavior:'smooth', block:'start' });
  }
}

document.addEventListener('click', (event)=>{
  const target = event.target;
  if(!(target instanceof HTMLElement)){
    return;
  }

  const actionButton = target.closest('[data-action], .product-image-link[data-detail-id]');
  if(!(actionButton instanceof HTMLElement)){
    return;
  }

  if(actionButton.matches('.product-image-link[data-detail-id]')){
    const productId = actionButton.dataset.detailId;
    if(productId){
      openDetailModal(productId);
    }
    return;
  }

  const action = actionButton.dataset.action;
  const productId = actionButton.dataset.productId;

  if(action==='open-detail' && productId){
    openDetailModal(productId);
  }

  if(action==='add-to-cart' && productId){
    addToCart(productId);
  }
});

if(detailClose){
  detailClose.addEventListener('click', closeDetailModal);
}

if(detailModal){
  detailModal.addEventListener('click', (event)=>{
    const target = event.target;
    if(target instanceof HTMLElement && target.dataset.closeDetail === 'true'){
      closeDetailModal();
    }
  });
}

window.addEventListener('keydown', (event)=>{
  if(event.key === 'Escape'){
    closeDetailModal();
  }
});

panelLinks.forEach(link=>{
  link.addEventListener('click', (event)=>{
    event.preventDefault();
    const panelId = link.dataset.panel;
    showPanel(panelId);
  });
});

if(homeLink){
  homeLink.addEventListener('click', ()=>{
    hidePanels();
    closeDetailModal();
  });
}

if(cartLink){
  cartLink.addEventListener('click', ()=>{
    hidePanels();
    closeDetailModal();
  });
}

if(window.location.hash === '#information'){
  showPanel('information');
}
if(window.location.hash === '#about-us'){
  showPanel('about-us');
}

const searchParams = new URLSearchParams(window.location.search);
const detailFromQuery = searchParams.get('detail');
if(detailFromQuery && PRODUCTS[detailFromQuery]){
  openDetailModal(detailFromQuery);
}

if(clearCartBtn){
  clearCartBtn.addEventListener('click', ()=>{
    cart = [];
    updateCart();
    setFormError('');
    showToast('Cart cleared.');
  });
}

if(checkoutForm && formError){
  checkoutForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    setFormError('');

    if(cart.length===0){
      setFormError('Your cart is empty. Please add at least one toy.');
      return;
    }

    const formData = new FormData(checkoutForm);
    const fullName = formData.get('fullName')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const postalCode = formData.get('postalCode')?.toString().trim();
    const address = formData.get('address')?.toString().trim();
    const orderNote = formData.get('orderNote')?.toString().trim() || '';

    if(!fullName || !phone || !postalCode || !address){
      setFormError('Please complete your delivery information before payment.');
      return;
    }

    if(!/^\d{6}$/.test(postalCode)){
      setFormError('Please enter a valid 6-digit Singapore postal code.');
      return;
    }

    const total = cart.reduce((sum, item)=>sum + item.price, 0);
    const firstItem = cart[0];
    const query = new URLSearchParams({
      fullName,
      phone,
      postalCode,
      address,
      total: total.toString(),
      itemCount: cart.length.toString(),
      firstItem: firstItem.name,
      orderNote
    });

    window.location.href = `payment.html?${query.toString()}`;
  });
}

updateCart();
