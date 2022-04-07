import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Choice {
        answer: String
        correct: Boolean
    }

    type Answers {
        title: String
        choices: [Choice]
    }

    type Token {
        token: String
    }

    type Query {
        answers(url: String!): [Answers]
        token: Token
    }
`;

export default typeDefs;
