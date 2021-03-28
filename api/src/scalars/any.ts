import { GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
  name: 'Any',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => ast
});
