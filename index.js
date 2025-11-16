import random from "random";
import moment from "moment";
import jsonfile from "jsonfile";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    // Random date within last year
    const daysAgo = random.int(0, 364);
    const date = moment().subtract(daysAgo, "days").format();

    const data = { date };
    console.log(date);
    jsonfile.writeFileSync(path, data);

    await git.add([path])
             .commit("Commit at " + date, { "--date": date });
  }

  // Push all commits at the end
  await git.push();
};

makeCommits(300);
