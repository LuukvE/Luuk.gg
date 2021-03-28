import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { parseJSON } from 'date-fns';

export default new GraphQLScalarType({
  name: 'Date',
  serialize: (value: Date) => value.toJSON(),
  parseValue: (value: string) => parseJSON(value),
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) return null;

    return parseJSON(`${ast}`);
  }
});
