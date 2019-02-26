const { main } = require("./src");

(async () => {
  process.stdout.write(await main(process.argv));
})();
