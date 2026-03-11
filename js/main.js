function buy(productName){
  alert(`You clicked Buy: ${productName}\nPlease click Add to Cart to complete payment.`);
}

// Cart
let cart = [];
function addToCart(name, price, paylink){
  cart.push({name, price, paylink});
  updateCart();
  showToast(`${name} added to cart!`);
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

// Scroll animation for products and title
const products=document.querySelectorAll('.product');
const title=document.querySelector('.section-title');

const observer=new IntersectionObserver((entries, obs)=>{
  entries.forEach((entry, idx)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay=`${idx*0.15}s`;
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
},{ threshold:0.2 });

products.forEach(product=>observer.observe(product));

const titleObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      title.style.opacity='1';
      title.style.transform='translateY(0)';
    }
  });
},{ threshold:0.3 });
titleObserver.observe(title);

// Checkout button - 跳转支付宝支付（示例使用第一个商品的支付链接）
document.getElementById('checkout-btn').addEventListener('click',()=>{
  if(cart.length===0){
    alert('Your cart is empty!');
    return;
  }
  // 这里示例：使用第一个商品的支付链接
  const payLink = cart[0].paylink;
  if(payLink){
    window.open(payLink,'_blank');
  }else{
    alert('No payment link available!');
  }
});
