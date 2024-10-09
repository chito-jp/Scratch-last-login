const el_text = document.getElementById("text");

chrome.storage.local.get("text",(value) => {
 if(value.text)el_text.value = value.text;
});

el_text.onchange = () => {
chrome.storage.local.set({text: el_text.value},() => {
  
 });
};

el_text.onkeyup = () => {
 document.getElementById("span").innerText = 200 - el_text.value.length;
};

document.getElementById("span").innerText = 200 - el_text.value.length;