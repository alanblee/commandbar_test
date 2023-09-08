const baseUrl = import.meta.env.VITE_APP_BASE_URL;

async function httpGetPosts() {
  try {
    const response = await fetch(`${baseUrl}/api/v1/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    return { ok: false };
  }
}

async function httpGetPostsById(id) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    return { ok: false };
  }
}

async function httpCreatePost(post) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return response.json();
  } catch (err) {
    return { ok: false };
  }
}

async function httpPostPrompt(prompt) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/dalle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    return await response.json();
  } catch (err) {
    return { ok: false };
  }
}

export { httpGetPosts, httpCreatePost, httpPostPrompt, httpGetPostsById };
