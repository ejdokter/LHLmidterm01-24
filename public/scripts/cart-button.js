$(document).ready(function() {
  $(".add-to-cart-button").click((e) => {
    e.preventDefault();
    const cart = JSON.parse(getCookie("cart"));
    $(".cart-quantity").text(cart.length);

  });
  const cart = JSON.parse(getCookie("cart"));
  $(".cart-quantity").text(cart.length);
});
