document.addEventListener('DOMContentLoaded', function () {
  const deleteProductButtons = document.querySelectorAll('.deleteProductBtn')
  deleteProductButtons.forEach(function (button) {
    button.addEventListener('click', async function () {
      try {
        const productId = button.getAttribute('data-product-id')
        const cartId = document.querySelector('.idCart').dataset.cartId

        await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        location.reload()
      } catch (error) {
        console.error(error)
      }
    })
  })
})
