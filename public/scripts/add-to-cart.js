$(document).ready(function() {

  if(localStorage.getItem("cart") != null){
    var items = JSON.parse(localStorage.getItem("cart")).items;
    for(var i=0; i<items.length; i++){
      addItem(items[i]);
      $('#' + items[i]).toggleClass("btn-warning");
      toggleText(items[i]);
      cart.items.push(items[i]);
    }
    setBadge();
  }

  $(".btn-primary").click(function(e) {
    $(this).toggleClass("btn-warning");
    toggleText($(this).attr('id'));

    if (!$(`li[data-attribute="${e.target.id}"]`).length) {
      addItem(e.target.id);
    } else {
      $(`li[data-attribute="${e.target.id}"]`).remove();
    }
    setBadge();
    setLocalStorage(e.target.id, 0);
    $(".btn-danger").on('click', function() {
      removeItem($(this).parent("li"));
      setLocalStorage($(this).data('id'), 1);
    });
  });

  $(".btn-danger").on('click', function() {
    removeItem($(this).parent("li"));
    setLocalStorage($(this).data('id'), 1);
  });
});

function removeItem(item) {
  console.log(item);
  var id = item[0].attributes[1].value;
  $(`#${id}`).removeClass("btn-warning");
  toggleText(id);
  item.remove();
  setBadge();
}

function addItem(item) {
  $("ul").append(
        `<li class='well' data-attribute='${item}'>
${$(`.${item}-container p`).text()}
<button class='btn btn-danger' data-id='${item}'>-</button>
</li>`
      );
}

function setBadge() {
  $(".badge").remove();
  $("h3").after("<span class='badge'>" + $("li").length + "</span>");
}

function toggleText(item) {
  if ($('#' + item).hasClass("btn-warning")) {
    $('#' + item).text("-");
  } else {
    $('#' + item).text("+");
  }
}


var cart = {};
cart.items = [];

function setLocalStorage(id, flag) {
  if(flag) {
    cart.items.splice(cart.items.indexOf(id), 1);
  } else {
    cart.items.push(id);
  }
  console.log(JSON.stringify(cart));
  localStorage.setItem("cart", JSON.stringify(cart));
}
