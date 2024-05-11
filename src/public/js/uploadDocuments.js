const formUpload = document.getElementById("uploadForm")
const userId = document.getElementById('userId').value;

formUpload.addEventListener("submit", async (event) => {
  event.preventDefault()

  const data = new FormData(formUpload)

  const response = await fetch(`/api/users/${userId}/documents`, {
    method: "POST",
    body: data
  })

  const responseJson = await response.json()
  console.log(responseJson);

  if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: responseJson.payload,
      html: '<b>Documents uploaded successfully!</b>',
      showConfirmButton: false,
      timer: 1500
    })
    // Reset the form fields
   
      formUpload.reset()
    } else {
      Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.payload })
    }
  });