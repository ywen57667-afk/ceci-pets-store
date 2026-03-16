const paymentPage = document.getElementById('payment-page');
const params = new URLSearchParams(window.location.search);

const fullName = params.get('fullName');
const phone = params.get('phone');
const postalCode = params.get('postalCode');
const address = params.get('address');
const total = params.get('total');
const itemCount = params.get('itemCount');
const firstItem = params.get('firstItem');
const orderNote = params.get('orderNote');

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
      <p><strong>Order Note:</strong> ${orderNote ? orderNote : 'N/A'}</p>
      <p>This is a demo payment page. You can now connect your real payment gateway API here.</p>
      <a class="detail-link" href="index.html#home">Back Home</a>
    </article>
  `;
}
 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/js/payment.js b/js/payment.js
new file mode 100644
index 0000000000000000000000000000000000000000..8bb5e125f2f3766465cd479b89de0f2387d99d77
--- /dev/null
+++ b/js/payment.js
@@ -0,0 +1,36 @@
+const paymentPage = document.getElementById('payment-page');
+const params = new URLSearchParams(window.location.search);
+
+const fullName = params.get('fullName');
+const phone = params.get('phone');
+const postalCode = params.get('postalCode');
+const address = params.get('address');
+const total = params.get('total');
+const itemCount = params.get('itemCount');
+const firstItem = params.get('firstItem');
+const orderNote = params.get('orderNote');
+
+if(!fullName || !phone || !postalCode || !address || !total){
+  paymentPage.innerHTML = `
+    <article class="payment-card">
+      <h1>Payment info missing</h1>
+      <p>Please return to cart and submit your address details again.</p>
+      <a class="detail-link" href="index.html#cart">Back to Cart</a>
+    </article>
+  `;
+} else {
+  paymentPage.innerHTML = `
+    <article class="payment-card">
+      <h1>Payment Confirmation</h1>
+      <p><strong>Customer:</strong> ${fullName}</p>
+      <p><strong>Phone:</strong> ${phone}</p>
+      <p><strong>Postal Code:</strong> ${postalCode}</p>
+      <p><strong>Address:</strong> ${address}</p>
+      <p><strong>Items:</strong> ${itemCount} (starting with ${firstItem})</p>
+      <p class="detail-price"><strong>Total:</strong> ¥${total}</p>
+      <p><strong>Order Note:</strong> ${orderNote ? orderNote : 'N/A'}</p>
+      <p>This is a demo payment page. You can now connect your real payment gateway API here.</p>
+      <a class="detail-link" href="index.html#home">Back Home</a>
+    </article>
+  `;
+}
 
EOF
)
