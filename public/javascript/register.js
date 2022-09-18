async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-register").value.trim();
  const email = document.querySelector("#email-register").value.trim();
  const password = document.querySelector("#password-register").value.trim();

  if (username && email && password) {
    await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("User Added!");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#register-btn")
  .addEventListener("click", signupFormHandler);
