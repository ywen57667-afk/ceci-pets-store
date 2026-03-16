// Buy 提示
function buy(productName){
  alert(`You clicked Buy: ${productName}\nPlease click Add to Cart to complete payment.`);
}

// 购物车功能
let cart = [];
function addToCart(name, price, paylink){
  cart.push({name, price, paylink});
  updateCart();
  showToast(`${name} added to cart!`);
}

// 更新购物车显示
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

// Toast 提示
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

// 滚动淡入效果 - 产品和标题
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

// WELCOME 滚动浮动效果（Apple 风格）
const bannerText = document.querySelector('.banner-text');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // 向上浮动，透明度渐淡
  bannerText.style.transform = `translate(-50%, calc(-50% - ${scrollY * 0.3}px))`;
  bannerText.style.opacity = `${Math.max(1 - scrollY / 400, 0)}`;
});

// Checkout 表单 - 先填写地址，再跳转支付
const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', (event)=>{
  event.preventDefault();

  if(cart.length===0){
    alert('Your cart is empty!');
    return;
  }

  const formData = new FormData(checkoutForm);
  const fullName = formData.get('fullName')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();
  const address = formData.get('address')?.toString().trim();

  if(!fullName || !phone || !address){
    alert('Please complete your delivery information before payment.');
    return;
  }

  // 简单示例：使用第一个商品支付链接
  const payLink = cart[0].paylink;
  if(payLink){
    showToast(`Thanks ${fullName}! Redirecting to payment...`);
    window.open(payLink,'_blank');
  } else {
    alert('No payment link available!');
  }
});
