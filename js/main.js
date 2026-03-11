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
document.querySelectorAll('.slider').forEach(slider => {

let images = slider.querySelectorAll('img');
let index = 0;

images[0].classList.add('active');

setInterval(()=>{

images[index].classList.remove('active');

index = (index + 1) % images.length;

images[index].classList.add('active');

},2000);

});
const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('show')
}
})
})

document.querySelectorAll('.product').forEach(p=>{
observer.observe(p)
})
