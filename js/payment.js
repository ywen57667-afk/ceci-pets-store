const paymentPage = document.getElementById('payment-page');
const params = new URLSearchParams(window.location.search);

const fullName = params.get('fullName');
const phone = params.get('phone');
const postalCode = params.get('postalCode');
const address = params.get('address');
const total = params.get('total');
const itemCount = params.get('itemCount');
const firstItem = params.get('firstItem');

if(!fullName || !phone || !postalCode || !address || !total){
  paymentPage.innerHTML = `
    <article class="payment-card">
      <h1>Payment info missing</h1>
      <p>Please return to cart and submit your address details again.</p>
      <a class="detail-link" href="index.html#cart">Back to Cart</a>
    </article>
  `;
} else {
  paymentPage.innerHTML = `
    <article class="payment-card">
      <h1>Payment Confirmation</h1>
      <p><strong>Customer:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Postal Code:</strong> ${postalCode}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Items:</strong> ${itemCount} (starting with ${firstItem})</p>
      <p class="detail-price"><strong>Total:</strong> ¥${total}</p>
      <p>This is a demo payment page. You can now connect your real payment gateway API here.</p>
      <a class="detail-link" href="index.html#home">Back Home</a>
    </article>
  `;
}
