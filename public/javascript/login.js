async function loginFormHandler(event) {


  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
console.log(response)

    if (response.ok) {
      document.location.replace("/dashboard")
    } else {
      alert(response.statusText);
    }
  }
}
  
  document
    .querySelector("#login-btn-form")
    .addEventListener("click", loginFormHandler);
  