$(document).ready(function() {
  $(".add-to-cart-button").click((e) => {
    if ($(e.currentTarget).data()) {
    num = parseInt($(".cart-quantity").text());
    $(".cart-quantity").text(num+1);
    }
  });
});
