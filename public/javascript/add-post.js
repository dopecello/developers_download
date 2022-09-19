async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#enter-title").value;
  const post_url = document.querySelector("#enter-link").value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#create-post")
  .addEventListener("click", newFormHandler);
