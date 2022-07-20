const fs = require("fs/promises");
const execSync = require("child_process").execSync;

async function main() {
  try {
    const version = await fs.readFile("version", { encoding: "utf-8" });
    const latestCommitHash = execSync("git rev-parse HEAD", {
      encoding: "utf-8",
    });

    if (version === latestCommitHash) {
      console.log("Frontend does not need to be rebuilt\n");

      return process.exit(0);
    }

    build();
  } catch (e) {
    if (e.message.includes("no such file or directory, open 'version'")) {
      build();

      return;
    }
    console.error(e);

    process.exit(1);
  }
}

main();

function build() {
  const output = execSync("npm run build:electron", {
    encoding: "utf-8",
  });

  console.log(output);
}
