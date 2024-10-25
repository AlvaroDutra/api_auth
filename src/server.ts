import Express, { json } from "express";
import { router } from "./routes/auth.routes";

const app = Express();
app.use(json());
app.use(router);
app.listen(3000, () => {
    console.log("Aplication running")
});
