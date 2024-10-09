chrome.storage.local.get("text", (value) => {
  let text = value.text;
  const date = new Date();

  const replaceData = {
    "[@y]": date => date.getFullYear(),
    "[@m]": date => date.getMonth() + 1,
    "[@d]": date => date.getDate(),
    "[@h]": date => date.getHours(),
    "[@mi]": date => date.getMinutes(),
    "[@s]": date => date.getSeconds(),
  };

  Object.keys(replaceData).forEach(pattern => {
    text = text.replaceAll(pattern, replaceData[pattern](date));
  });

  const cookies = {};
  document.cookie.split("; ").forEach((data) => {
    cookies[data.split("=")[0]] = decodeURIComponent(data.split("=")[1]);
  });

  fetch("https://scratch.mit.edu/session/", {
    headers: {
      "x-requested-with": "XMLHttpRequest"
    }
  })
  .then(response => response.json())
  .then(data => {
    fetch(`https://scratch.mit.edu/site-api/users/all/${data.user.username}/`, {
      headers: {
        "content-type": "application/json",
        "x-csrftoken": cookies.scratchcsrftoken,
        "x-requested-with": "XMLHttpRequest"
      },
      body: JSON.stringify({
        "bio": text
      }),
      method: "PUT",
      credentials: "include"
    })
  });
});
