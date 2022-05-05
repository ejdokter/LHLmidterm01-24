function setCookie(name, value) {
  //   let pid =$(this).find("#pid").text();
  //   let name =$(this).find("#pname").text();

  //   console.log(pid, name, desc, catog, units);

  let cookie = name + "=" + encodeURIComponent(value);
  document.cookie = cookie;
};

function getCookie(name) {
  let nameK = name + "=";
  let manyNameK = document.cookie.split(';');
  for (var i = 0; i < manyNameK.length; i++) {
    var c = manyNameK[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameK) == 0) {
      return decodeURIComponent(c.substring(nameK.length, c.length));
    }
  }
  return null;
}
// const loadCartData = function(){
//    $.ajax({
//       type: "POST",
//       url: "/api/cart/add",
//       dataType: 'json',
//       data: obj,
//       xhrFields: {
//         withCredentials: true
//       },
//       crossDomain: true,
//       cache: false,
//       success: function (data) {
//         alert(data);
//       }
//     }).then((response) => {
//       console.log(response)
//     });

// }
// const generateRandomNumber = function() {
//   let result= ''
//   let char = '0123456789';
//   for (let i = 0; i < 8; i++) {
//     result += char[Math.round(Math.random() * (char.length - 1))];
//   }
//   return parseInt(result);
// };
$(document).ready(function () {
  // On button click to add or delete create event handler
  // checkout event handler
  // $(".add-to-cart-button").click((e) => {
  //   e.preventDefault();
  //   console.log("hello add to cart");
  // });

  $(".add-to-cart-button").click((e) => {
    //$(document).on('click', '.buttonitem .add-button', function(e) {
    e.preventDefault();
    console.log("hello add", $(e.currentTarget).data());


    //const get cartdata variable
    //console.log("product id", $(this).parents(".artcontent").children('.prodid'));
    //console.log(this);
    //console.log($(".artcontent"));
    // let pid =$(".artcontent").not($(this).parents(".artcontent")).find("#pid").text();
    // let name =$(".artcontent").not($(this).parents(".artcontent")).find("#pname").text();
    //let pid = $(this).find("#pid").text();
    //let name = $(this).find("#pname").text();
    let pid =$(e.currentTarget).data().id;
    let name =$(e.currentTarget).data().name

    // let pid =$(this).closest(find("#pid")).text();
    // let name =$(this).closest(find("#pname")).text();

    let objData = { id: pid, name: name };
    //save to cookie

    //console.log(pid, name, desc, catog, units);
    console.log(getCookie("home"));
    let presentCookie = JSON.parse(getCookie("home"));
    if (presentCookie) {
      presentCookie.push(objData);
    }
    else {
      presentCookie = [objData];

    }
    console.log({ presentCookie });
    //console.log(JSON.stringify([]));

    setCookie("home", JSON.stringify(presentCookie));

    //cookie.clear();
    // $.post('/add', serializedData, response =>{
    //   console.log(response);
    //   loadcart();
    // })

  });

});
