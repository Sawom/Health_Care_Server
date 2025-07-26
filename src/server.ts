import { Server } from "http";
import app from "./app";

const port = 5000;

// I implement exitHandler, uncaughtException, unhandledRejection. if try catch is fail to recognize the error then server will be stopped.
// this way we avoid server crashing
async function main() {
  const server: Server = app.listen(port, () => {
    console.log("health care app is listening on port", port);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed!");
      });
    }
    process.exit(1);
  };

  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
