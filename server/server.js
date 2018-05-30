require("./config/config");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const { mongoose } = require("./db/mongoose");
const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => console.log("new listening on port 4000"));