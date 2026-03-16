const PRODUCTS = {
  'pet-ball': {
    id: 'pet-ball',
    name: 'Pet Ball',
    price: 50,
    image: 'images/toy1.jpg',
    description: 'Bouncy soft-rubber ball for medium-energy play sessions and basic fetch training.',
    paylink: 'https://example.com/payment-gateway/pet-ball'
  },
  'pet-bite-toy': {
    id: 'pet-bite-toy',
    name: 'Pet Bite Toy',
    price: 30,
    image: 'images/toy2.jpg',
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

const productObserver = new IntersectionObserver((entries, obs)=>{
  entries.forEach((entry, idx)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay = `${idx*0.15}s`;
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
},{ threshold:0.2 });

products.forEach(product => productObserver.observe(product));

const titleObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      sectionTitle.style.opacity='1';
      sectionTitle.style.transform='translateY(0)';
    }
  });
},{ threshold:0.3 });
titleObserver.observe(sectionTitle);

const bannerText = document.querySelector('.banner-text');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  bannerText.style.transform = `translate(-50%, calc(-50% - ${scrollY * 0.3}px))`;
  bannerText.style.opacity = `${Math.max(1 - scrollY / 400, 0)}`;
});

const panelLinks = document.querySelectorAll('a[data-panel]');
const infoPanel = document.getElementById('information');
const aboutPanel = document.getElementById('about-us');

function showPanel(panelId){
  [infoPanel, aboutPanel].forEach(panel => panel.classList.add('hidden-panel'));
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
