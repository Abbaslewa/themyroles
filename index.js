import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const FILE_PATH = "./data.json";
const git = simpleGit();

const data = {
  message: "Auto update from Abbas Lewa 🚀",
  date: moment().format("YYYY-MM-DD HH:mm:ss"),
};

jsonfile.writeFile(FILE_PATH, data, { spaces: 2 })
  .then(() => {
    console.log("✅ Data saved successfully!");

    return git.add(".")
      .then(() => git.commit(`Updated data: ${moment().format("YYYY-MM-DD HH:mm:ss")}`))
      .then(() => git.push("origin", "main"));
  })
  .then(() => console.log("🚀 Changes pushed to GitHub successfully!"))
  .catch(err => console.error("❌ Error:", err));
