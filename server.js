const express = require("express");
const graphqlHTTP = require("express-graphql");
const Schema = require("./schema");
const app = express();

app.use(
  "/",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);

const server = app.listen(4000, () => {
  const { port } = server.address();
  console.log(`🚀  Server ready at http://localhost:${port}`);
});
