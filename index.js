import random from "random";
import moment from "moment";
import jsonfile from "jsonfile";
import simpleGit from "simple-git";

const path = "./data.json";

const makeCommits = async (n) => {
    if (n === 0) return simpleGit().push();

    const x = random.int(0, 54);
    const y = random.int(0, 6);
    const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

    const data = { date };

    console.log(date);

    jsonfile.writeFileSync(path, data);

    await simpleGit()
        .add([path])
        .commit("date", { "--date": date });

    await makeCommits(--n);
};

makeCommits(500);
