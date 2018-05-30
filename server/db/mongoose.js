const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/graphql_local_auth");

mongoose.connection.once("open", () => {
    console.log("connected to database.");
});

module.exports = { mongoose };