async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-register").value.trim();
  const email = document.querySelector("#email-register").value.trim();
  const password = document.querySelector("#password-register").value.trim();

  console.log(username, email, password)

  if (username && email && password) {
    await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
    });
  }
}

document
  .querySelector("#register-btn")
  .addEventListener("submit", signupFormHandler);
