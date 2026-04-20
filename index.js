import random from "random";
import moment from "moment";
import jsonfile from "jsonfile";
import simpleGit from "simple-git";

const FILE_PATH = "./data.json";
const git = simpleGit();

const makeCommits = async (total = 600) => {
  try {
    for (let i = 0; i < total; i++) {
      const x = random.int(0, 54);
      const y = random.int(0, 6);

      const date = moment()
        .subtract(1, "year")
        .add(x, "weeks")
        .add(y, "days")
        .format();

      const data = { date };

      console.log(`Commit ${i + 1}: ${date}`);

      jsonfile.writeFileSync(FILE_PATH, data);

      await git.add(FILE_PATH);
      await git.commit(`commit ${i + 1}`, { "--date": date });
    }

    await git.push();
    console.log("✅ 600 commits pushed successfully");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

makeCommits();