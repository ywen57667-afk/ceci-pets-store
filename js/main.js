// Buy function with modern toast notification
function buy(productName) {
  // 创建一个浮动提示
  const toast = document.createElement('div');
  toast.textContent = `You clicked Buy: ${productName}. Please use Alipay to complete payment.`;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(0,0,0,0.85)';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '25px';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '1000';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.5s ease';

  document.body.appendChild(toast);

  // Fade in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  // 自动消失
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 2500);
}

// Scroll reveal animation
const products = document.querySelectorAll('.product');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, idx) => {
    if(entry.isIntersecting){
      // 为每个产品加一个阶梯延迟
      entry.target.style.transitionDelay = `${idx * 0.15}s`;
      entry.target.classList.add('show');
      // 可选：观察一次就停止
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2 // 当 20% 出现在视口时触发
});

products.forEach(product => observer.observe(product));
