import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.listen(3333);

export default app;
