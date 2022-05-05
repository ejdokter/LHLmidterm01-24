
// Client facing scripts here


function setCookie(name, value) {

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

$(document).ready(function () {
  // On button click to add or delete create event handler
  // checkout event handler
  $(".delete-button").click((e) => {
    e.preventDefault();
    console.log("hello delete");
  });

  $(".add-button").click((e) => {

    e.preventDefault();
    console.log("hello add", $(e.currentTarget).data());

    //const get cartdata variable

    let pid =$(e.currentTarget).data().id;
    let name =$(e.currentTarget).data().name


    let objData = { id: pid, name: name };
    //save to cookie

    let presentCookie = JSON.parse(getCookie("cart"));
    if (presentCookie) {
      presentCookie.push(objData);
    }
    else {
      presentCookie = [objData];

    }
    console.log({ presentCookie });

    setCookie("cart", JSON.stringify(presentCookie));

  });

});
