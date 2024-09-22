import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandelers";
import notFound from "./app/middlewares/notfound";
import cookieParser from "cookie-parser";
import cors from "cors";

// const app = express();

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    // Allow cookies, authorization headers with the same origin, and credentials
  })
);
app.use(cookieParser());

// Add CORS middleware
// app.use((req: Request, res: Response, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

// Add body-parser middleware to handle JSON request bodies
app.use(express.json()); // This will parse incoming JSON requests

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!, This is car washing system.");
});

// application routes
app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
