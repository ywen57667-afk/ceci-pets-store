const PRODUCTS = {
  'pet-ball': {
    id: 'pet-ball',
    name: 'Pet Ball',
    price: 50,
    image: 'images/toy1.jpg',
    description: 'Bouncy soft-rubber ball for medium-energy play sessions and basic fetch training.',
    highlights: ['Non-toxic rubber', 'Indoor & outdoor play', 'Easy to clean']
    description: 'Bouncy soft-rubber ball for medium-energy play sessions and basic fetch training.'
    description: 'Bouncy soft-rubber ball for medium-energy play sessions and basic fetch training.',
    paylink: 'https://example.com/payment-gateway/pet-ball'
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

const panelLinks = document.querySelectorAll('a[data-panel]');
const homeLink = document.querySelector('a[href="#home"]');
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
    description: 'Durable bite toy for teething pets and light chewers who need stress release.'
    description: 'Durable bite toy for teething pets and light chewers who need stress release.',
    paylink: 'https://example.com/payment-gateway/pet-bite-toy'
  }
};

function buy(productName){
  alert(`You clicked Buy: ${productName}\nPlease click Add to Cart to complete payment.`);
}

let cart = [];

function addToCart(productId){
  const product = PRODUCTS[productId];
  if(!product){
    return;
  }
  cart.push(product);
  updateCart();
  showToast(`${product.name} added to cart!`);
}

function updateCart(){
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

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
  toast.style.zIndex='1000';
  toast.style.opacity='0';
  toast.style.transition='opacity 0.5s ease';
  document.body.appendChild(toast);
  requestAnimationFrame(()=>{ toast.style.opacity='1'; });
  setTimeout(()=>{ toast.style.opacity='0'; toast.addEventListener('transitionend',()=>toast.remove()); },2000);
}

const products = document.querySelectorAll('.product');
const sectionTitle = document.querySelector('.section-title');

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
},{ threshold:0.3 });
titleObserver.observe(sectionTitle);

const bannerText = document.querySelector('.banner-text');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  bannerText.style.transform = `translate(-50%, calc(-50% - ${scrollY * 0.3}px))`;
  bannerText.style.opacity = `${Math.max(1 - scrollY / 400, 0)}`;
});


const detailModal = document.getElementById('detail-modal');
const detailImage = document.getElementById('detail-image');
const detailTitle = document.getElementById('detail-title');
const detailPrice = document.getElementById('detail-price');
const detailDescription = document.getElementById('detail-description');
const detailClose = document.getElementById('detail-close');
const detailTriggers = document.querySelectorAll('.product-image-link[data-detail-id]');

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

detailTriggers.forEach((trigger)=>{
  trigger.addEventListener('click', ()=>{
    const productId = trigger.dataset.detailId;
    openDetailModal(productId);
  });
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


const searchParams = new URLSearchParams(window.location.search);
const detailFromQuery = searchParams.get('detail');
if(detailFromQuery && PRODUCTS[detailFromQuery]){
  openDetailModal(detailFromQuery);
}

const panelLinks = document.querySelectorAll('a[data-panel]');
const homeLink = document.querySelector('a[href="#home"]');
const infoPanel = document.getElementById('information');
const aboutPanel = document.getElementById('about-us');

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

panelLinks.forEach(link=>{
  link.addEventListener('click', (event)=>{
    event.preventDefault();
    const panelId = link.dataset.panel;
    showPanel(panelId);
  });
});


const panelTriggerButtons = document.querySelectorAll('[data-panel-trigger]');
panelTriggerButtons.forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    const panelId = btn.dataset.panelTrigger;
    showPanel(panelId);
  });
});

    return;
  }
  detailImage.src = product.image;
  detailImage.alt = product.name;
  detailTitle.textContent = product.name;
  detailPrice.textContent = `¥${product.price}`;
  detailDescription.textContent = product.description;
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

detailTriggers.forEach((trigger)=>{
  trigger.addEventListener('click', ()=>{
    const productId = trigger.dataset.detailId;
    openDetailModal(productId);
  });
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

const panelLinks = document.querySelectorAll('a[data-panel]');
const homeLink = document.querySelector('a[href="#home"]');
const infoPanel = document.getElementById('information');
const aboutPanel = document.getElementById('about-us');

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

panelLinks.forEach(link=>{
  link.addEventListener('click', (event)=>{
    event.preventDefault();
    const panelId = link.dataset.panel;
    showPanel(panelId);
  });
const checkoutForm = document.getElementById('checkout-form');
const formError = document.getElementById('form-error');

function setFormError(message){
  formError.textContent = message;
}

checkoutForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  setFormError('');

  if(cart.length===0){
    setFormError('Your cart is empty. Please add at least one toy.');


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
    firstItem: firstItem.name
  });

  window.location.href = `payment.html?${query.toString()}`;
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
const checkoutForm = document.getElementById('checkout-form');
const formError = document.getElementById('form-error');
const clearCartBtn = document.getElementById('clear-cart-btn');

if(clearCartBtn){
  clearCartBtn.addEventListener('click', ()=>{
    cart = [];
    updateCart();
    setFormError('');
    showToast('Cart cleared.');
  });
}

function setFormError(message){
  formError.textContent = message;
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
      firstItem: firstItem.name
    });

    window.location.href = `payment.html?${query.toString()}`;
  });
}

updateCart();
