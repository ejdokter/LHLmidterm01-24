$(document).ready(function() {
  $(".add-to-cart-button").click((e) => {
    e.preventDefault();
    const cart = JSON.parse(getCookie("cart"));
    $(".cart-quantity").text(cart.length);
    // $(".add-to-cart-button").text("✅");

    // e.currentTarget.style.background = 'initial';
    // e.currentTarget.style.color = 'green';
    // innerText("hello");


  });
  const cart = JSON.parse(getCookie("cart"));
  $(".cart-quantity").text(cart.length);
  // if (getCookie("cart")) {
  // e.currentTarget.style.background = 'green';
  // }
});
