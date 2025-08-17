import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    {
      type: "input",
      name: "URL",
      message: "Enter the text to encode:",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr-img.png"));
    // Write the URL to a text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("URL saved to URL.txt");
    });
    // Read the URL file
    fs.readFile("URL.txt", "utf8", (err, data) => {
      if (err) throw err;
      console.log("URL read from URL.txt:", data);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
