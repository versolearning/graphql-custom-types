import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export class GraphQLCustomScalarType extends GraphQLScalarType {
  constructor(name, description, parser, serializer) {
    super({
      name: name,
      description: description,
      serialize: value => {
        return serializer ? serializer(value) : value;
      },
      parseValue: value => {
        const kind =
          typeof value === "object" && value !== null
            ? Kind.OBJECT
            : Kind.STRING;

        const ast = {
          kind,
          value
        };
        return parser(ast);
      },
      parseLiteral: ast => {
        return parser(ast);
      }
    });
  }
}
