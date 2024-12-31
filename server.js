import jsonServer from "json-server";
import cors from "cors";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

server.use(router);

server.listen(() => {
  console.log(`JSON Server is running on http://localhost:${3000}`);
});
