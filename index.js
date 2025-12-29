import random from "random";
import moment from "moment";
import jsonfile from "jsonfile";
import simpleGit from "simple-git";

const git = simpleGit();
const FILE_PATH = "./data.json";

// CONFIG
const TOTAL_COMMITS = 300;
const MAX_COMMITS_PER_DAY = 3;

const usedDates = {};

const randomDateLastYear = () => {
  const weeks = random.int(0, 52);
  const days = random.int(0, 6);

  return moment()
    .subtract(1, "year")
    .add(weeks, "weeks")
    .add(days, "days")
    .startOf("day")
    .format();
};

const makeCommits = async (count) => {
  for (let i = 0; i < count; i++) {
    let date;

    // Ensure realistic daily limits
    do {
      date = randomDateLastYear();
      usedDates[date] = (usedDates[date] || 0) + 1;
    } while (usedDates[date] > MAX_COMMITS_PER_DAY);

    jsonfile.writeFileSync(FILE_PATH, { date });

    await git.add(FILE_PATH);
    await git.commit("chore: update data", { "--date": date });

    console.log(`✔ Commit ${i + 1}/${count} → ${date}`);
  }

  await git.push();
};

makeCommits(TOTAL_COMMITS).catch(console.error);
