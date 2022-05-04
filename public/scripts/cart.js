
// Client facing scripts here


// const createCartElement = function(cartData){
//   // creating cart elements


// }

 function setCookie(name, value){
//   let pid =$(this).find("#pid").text();
//   let name =$(this).find("#pname").text();

//   console.log(pid, name, desc, catog, units);
//   // let cokArray = [];
//   // cokArray.push(pid);
//   // $.cookie(JSON)
//   console.log("random", generateRandomNumber);
let cookie = name + "=" +encodeURIComponent(value);

 document.cookie = cookie;

};

function getCookie(name){
   let nameK = name + "=";
   let manyNameK= document.cookie.split(';');
  for(var i=0;i < manyNameK.length;i++) {
      var c = manyNameK[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameK) == 0) {
        return decodeURIComponent(c.substring(nameK.length,c.length));
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
$(document).ready(function() {
// On button click to add or delete create event handler
// checkout event handler
$(".delete-button").click((e) => {
e.preventDefault();
console.log("hello delete");

});

$(".add-button").click((e) => {
  e.preventDefault();
  console.log("hello add");

  //const get cartdata variable
  //console.log("product id", $(this).parents(".artcontent").children('.prodid'));
  let pid =$(this).find("#pid").text();
  let name =$(this).find("#pname").text();

  // let desc =$(this).find("#pdesc").text();
  // let catog =$(this).find("#catog").text();
  // let units =$(this).find("#punits").text();
let objData ={id: pid, name: name};
  //save to cookie

  //console.log(pid, name, desc, catog, units);
  console.log(getCookie("cart"));
  let presentCookie= JSON.parse(getCookie("cart"));
  if(presentCookie){
    presentCookie.push(objData);
  }
  else {
    presentCookie =[objData];

  }
  console.log({presentCookie});
  //console.log(JSON.stringify([]));

  setCookie("cart", JSON.stringify(presentCookie) );


//setCookie(pid, name);
//   console.log("random", generateRandomNumber);
//document.cookie += generateRandomNumber +"+"+pid;
//let cookieParts =`; ${document.cookie}`;
//console.log(JSON.parse(getCookie("cart")));
//cookie.clear();
// //const serializaedData =$(this).serialize();

// $.post('/add', serializedData, response =>{
//   console.log(response);
//   loadcart();

// })

  });

});
