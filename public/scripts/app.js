
// Client facing scripts here

$(document).ready(function() {

  const createProduct = function(productData) {

    const $product = $(`<div class="product"></div>`)

    const html = `

      <div class="product-name">
        <p>${productData.products.name}</p>
      </div>

      <div class="product-image">

      </div>

      <div class="description">
        <p>description</p>
        <p>${productData.products.description}</p>
      </div>
      <button class="button-24" role="button">Add to Cart</button>
      </div>
    `
  }

})

