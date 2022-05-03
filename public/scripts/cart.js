
// Client facing scripts here

//const e = require("express");

$(document).ready(function() {
// On button click to add or delete create event handler
// checkout event handler
$(".add-button").click((e) => {
e.preventDefault();
console.log("hello");

fetch ("/home/:user_id/delete", {method:'POST'})
.then(function(response){
  if(response.ok) {
    console.log('An item was deleted');
    return;
      }
      throw new Error ('Request failed.')
})
.catch (function(err){
  console.log(err);
})
});

});
