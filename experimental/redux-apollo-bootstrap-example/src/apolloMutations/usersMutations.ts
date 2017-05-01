import { gql } from "react-apollo";

export default gql`
  mutation {
    addUser { 
        usersCount
    }
  }
`;