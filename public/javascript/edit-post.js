async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#title-input-edit").value.trim();
  const post_url = document.querySelector("#url-input-edit").value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#save-post-edit")
  .addEventListener("click", editFormHandler);
