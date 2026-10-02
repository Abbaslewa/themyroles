import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

const makeCommit = (n) => {
  if (n === 0) {
    console.log("Done committing");
    return;
  }

  const x = Math.floor(Math.random() * 55);
  const y = Math.floor(Math.random() * 7);

  const date = moment()
    .subtract(1, "y")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };

  console.log(`Commit ${n}: ${date}`);

  jsonfile.writeFile(path, data, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }

    git
      .add([path])
      .commit(date, { "--date": date }, (err) => {
        if (err) {
          console.error("Git commit error:", err);
          return;
        }

        makeCommit(n - 1);
      });
  });
};

// Start commits
makeCommit(400);