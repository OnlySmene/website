import fetchMatches from "./handleRequests.js";
import {
  getFileText,
  downloadFiles,
  handleFilesContent,
} from "./handleFile.js";

var canStart = false;
var isReady = false;
var isLoading = false;
var fileContent;

const inputFile = document.getElementById("inputFile__input");
const loadingBar = document.getElementsByClassName("loading-bar")[0];
const downloadFile = document.getElementsByClassName("downloadFiles__users")[0];
const downloadResult = document.getElementsByClassName(
  "downloadFiles__content"
)[0];
const contentText = document.getElementsByClassName(
  "content-text__list-container"
)[0];

const timer = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Upload File
inputFile.onchange = async (e) => {
  const file = e.target.files[0];
  if (file.type == "text/plain" && !isLoading) {
    fileContent = (await getFileText(file))
      .split("\n")
      .filter((i) => i.length > 1);

    contentText.innerHTML = "";
    fileContent.map((e) => (contentText.innerHTML += `<li>${e}</li>`));
    downloadFile.classList.add("ready");
    canStart = true;
  }
};

// Start to call api
downloadFile.onclick = async (e) => {
  if (canStart && !isLoading) {
    isLoading = true;
    downloadFile.classList.remove("ready");

    loadingBar.style.display = "block";
    const results = [];
    for (let i = 0; i < fileContent.length; i += 1) {
      results.push(await fetchMatches(fileContent[i]));
      await timer(1000);
    }

    loadingBar.style.display = "none";

    handleFilesContent(results);
    downloadFile.classList.add("ready");
    isLoading = false;
    // const [availableUsers, notAvailableUsers] = handleUsers(results);
    // download("availableUsers.txt", availableUsers);
    // download("notAvailableUsers.txt", notAvailableUsers);
  }
};
