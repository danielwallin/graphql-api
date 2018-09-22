const fetch = require("node-fetch");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} = require("graphql");
const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

const SpeciesType = new GraphQLObjectType({
  name: "Species",
  fields: () => ({
    base_happiness: {
      type: GraphQLString
    },
    capture_rate: {
      type: GraphQLInt
    },
    habitat: {
      type: GraphQLString,
      resolve: parent => {
        return parent.habitat.name;
      }
    }
  })
});

const PokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: () => ({
    name: {
      type: GraphQLString
    },
    sprite: {
      type: GraphQLString,
      resolve: parent => {
        return parent.sprites.front_default;
      }
    },
    height: {
      type: GraphQLInt
    },
    weight: {
      type: GraphQLString
    },
    base_experience: {
      type: GraphQLInt
    },
    species: {
      type: SpeciesType,
      resolve: async (parent, args, context) => {
        const response = await fetch(parent.species.url);
        return response.json();
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      getPokemon: {
        type: PokemonType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${args.id}/`
          );
          return response.json();
        }
      }
    })
  })
});

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