const productData = {
  'pet-ball': {
    name: 'Pet Ball',
    price: '¥50',
    image: 'images/toy1.jpg',
    intro: 'Perfect for fetch and active play. The elastic rubber core gives a safe bounce indoors and outdoors.',
    details: [
      'Material: non-toxic natural rubber',
      'Best for: small to medium dogs and active cats',
      'Care: rinse with mild soap and air dry'
    ]
  },
  'pet-bite-toy': {
    name: 'Pet Bite Toy',
    price: '¥30',
    image: 'images/toy2.jpg',
    intro: 'A light chew toy designed to reduce boredom and protect furniture from random biting behavior.',
    details: [
      'Material: flexible pet-safe polymer',
      'Best for: teething and light chewers',
      'Care: wash weekly and replace if cracked'
    ]
  }
};

const page = document.getElementById('detail-page');
const params = new URLSearchParams(window.location.search);
const productId = params.get('product');
const product = productData[productId];

if(!product){
  page.innerHTML = '<div class="detail-card"><h1>Product not found</h1><p>Please go back to home and choose a product.</p><a class="detail-link" href="index.html">Go Home</a></div>';
} else {
  const bullets = product.details.map(item => `<li>${item}</li>`).join('');
  page.innerHTML = `
    <article class="detail-card">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h1>${product.name}</h1>
        <p class="detail-price">${product.price}</p>
        <p>${product.intro}</p>
        <h3>Product Details</h3>
        <ul>${bullets}</ul>
        <a class="detail-link" href="index.html#cart">Back to Cart</a>
      </div>
    </article>
  `;
}
