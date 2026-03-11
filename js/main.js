function buy(productName) {
    alert('你点击了购买：' + productName + '\n请点击支付宝支付完成付款');
}
const products = document.querySelectorAll('.product');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

products.forEach(product => {
  observer.observe(product);
});
