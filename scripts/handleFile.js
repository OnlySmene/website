const getFileText = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });

const downloadFiles = (...objs) => {
  const [validUsers, invalidUsers, privateUsers, filteredMatches] = objs;
  const zip = new JSZip();

  zip.file("validUsers.txt", validUsers.join("\n"));
  zip.file("invalidUsers.txt", invalidUsers.join("\n"));
  zip.file("privateUsers.txt", privateUsers.join("\n"));
  for (let element in filteredMatches) {
    zip.file(`${element}.txt`, filteredMatches[element].join("\n"));
  }

  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, `results.zip`);
  });
};

const handleFilesContent = (obj) => {
  const validUsers = [];
  const invalidUsers = [];
  const privateUsers = [];
  const filteredMatches = {
    $100: [],
    $100_500: [],
    $500_2000: [],
    $2000_5000: [],
    $5000_10000: [],
    $10000: [],
  };

  obj.forEach((element) => {
    let username = Object.keys(element)[0];
    const matches = element[username];
    username = username.split(atob("DQ==")).join("");

    const format = `${username}:${matches}`;
    if (matches) {
      switch (true) {
        case matches == "private":
          privateUsers.push(username);
          break;
        case matches < 100:
          filteredMatches.$100.push(format);
          break;
        case matches > 100 && matches < 500:
          filteredMatches.$100_500.push(format);
          break;
        case matches > 500 && matches < 2000:
          filteredMatches.$500_2000.push(format);
          break;
        case matches > 2000 && matches < 5000:
          filteredMatches.$2000_5000.push(format);
          break;
        case matches > 5000 && matches < 10000:
          filteredMatches.$5000_10000.push(format);
          break;
        case matches > 10000:
          filteredMatches.$10000.push(format);
          break;
      }
      if (matches !== "private") validUsers.push(format);
    } else {
      invalidUsers.push(username);
    }
  });

  downloadFiles(validUsers, invalidUsers, privateUsers, filteredMatches);
};

export { getFileText, downloadFiles, handleFilesContent };
