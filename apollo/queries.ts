import { gql } from '@apollo/client';

export const ANSWERS = gql`
    query answers($url: String!) {
        answers(url: $url) {
            title
            choices {
                answer
                correct
            }
        }
    }
`;
