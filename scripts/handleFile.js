const getFileText = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });

const download = (filename, text) => {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;base64," + btoa(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const handleUsers = (obj) => {
  const availableUsers = [];
  const notAvailableUsers = [];

  for (let o of obj) {
    let username = Object.keys(o)[0];
    const matches = o[username];
    username = username.split(atob("DQ==")).join("");

    if (matches) {
      availableUsers.push(`${username}:${matches}`);
    } else {
      notAvailableUsers.push(username);
    }
  }
  console.log(availableUsers);
  return [availableUsers.join("\n"), notAvailableUsers.join("\n")];
};

export { getFileText, download, handleUsers };
