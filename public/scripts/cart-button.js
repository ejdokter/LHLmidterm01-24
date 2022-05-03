$(document).ready(function() {
  $("#add-to-cart").click(function(){
    num = parseInt($(".cart-quantity").text());
    $(".cart-quantity").text(num+1);
  });
});
