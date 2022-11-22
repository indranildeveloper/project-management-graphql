import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema/schema";
import connectDB from "./config/db";

dotenv.config();

const app = express();

// Connect to database
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
