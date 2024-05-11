document.addEventListener("DOMContentLoaded", function () {
  const role = document.querySelector(".role").dataset.roleUser;
  const email = document.querySelector(".EMAIL").dataset.emailUser;
  const deleteProductButtons = document.querySelectorAll(".deleteProductBtn");

  deleteProductButtons.forEach(function (button) {
    const ownerProduct = button.getAttribute("data-product-owner");
    if (role === "USER" || email !== ownerProduct && role !== 'ADMIN')
      button.style.display = "none";
    button.addEventListener("click", async function () {
      try {
        const productId = button.getAttribute("data-product-id");

        const productTitle = this.closest("div")
          .querySelector(".product-title")
          .getAttribute("data-product-title");

        await fetch(`/api/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        Toastify({
          text: `The product ${productTitle} was deleted`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
      } catch (error) {
        console.error(error);
      }
    });
  });

  const addToCartButtons = document.querySelectorAll(".addToCartBtn");
  addToCartButtons.forEach(function (button) {
    const ownerProduct = button.getAttribute("data-product-owner");
    const cartId = document.querySelector(".idCart").dataset.cartId;
    const productId = button.getAttribute("data-product-id");
    //if (email === ownerProduct) button.style.display = "none";
    button.addEventListener("click", async function () {
      try {
        const productTitle = this.closest("div")
          .querySelector(".product-title")
          .getAttribute("data-product-title");
          await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })

          
        Toastify({
          text: `The product ${productTitle} was added to your cart `,
          duration: 3000,
          destination: `/api/carts/${cartId}`,
          newWindow: false,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
      } catch (err) {
        console.log('test');
        Toastify({
          text: `That is your product, you cant add to your cart.`,
          duration: 3000,
          destination: `/api/carts/${cartId}`,
          newWindow: false,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "radial-gradient(circle at 10% 20%, rgb(221, 49, 49) 0%, rgb(119, 0, 0) 90%)",
          },
          onClick: function () {},
        }).showToast();
        console.log(err);
      }
    });
  });
});
