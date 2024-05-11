document.addEventListener('DOMContentLoaded', function () {
  const role = document.querySelector('.role').dataset.roleUser
  const addProductBtn = document.querySelectorAll('.nav-btn-create-product')
  const usersBtn = document.querySelectorAll('.nav-btn-users')
  if (role === 'USER') {
    addProductBtn.forEach(function (button) {
      button.style.display = 'none'
    })
  }

  if(role === 'USER' || role === 'PREMIUM'){
    usersBtn.forEach(function (button) {
      button.style.display = 'none'
    })
  }
})
