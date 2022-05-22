import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// ??? is save book correct 

export const SAVE_BOOK = gql `
    mutation saveBook($bookData: BookInput){
        saveBook(bookData: $bookData){
            _id
            username
            email
            saveBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// ??? is remove book correct
export const REMOVE_BOOK = gql `
mutation removeBook($bookid: ID!){
    removeBook(bookId: $bookId){
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;