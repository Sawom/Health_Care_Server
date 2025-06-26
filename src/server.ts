import { Server } from "http";
import app from "./app";

const port = 3000;

async function main() {
  const Server: Server = app.listen(port, () => {
    console.log("health care app is listening on port", port);
  });
}

main();
