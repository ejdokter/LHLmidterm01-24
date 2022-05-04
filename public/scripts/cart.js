
// Client facing scripts here

//const e = require("express");

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
  const obj= { 1: "google",
  2: "description"};

  $.ajax({
      type: "POST",
      url: "/add",
      dataType: 'json',
      data: obj,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      cache: false,
      success: function (data) {
        alert(data);
      }
    }).then((response) => {
      console.log(response)
    });


  });

});
