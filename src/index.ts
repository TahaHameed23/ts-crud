import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
import app from "./server";

app.listen(PORT, () => {
    console.log(`[server]: Listening on http://localhost:${PORT}`);
});
