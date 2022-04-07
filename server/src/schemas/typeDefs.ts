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

    type Query {
        answers(url: String!): [Answers]
    }
`;

export default typeDefs;
