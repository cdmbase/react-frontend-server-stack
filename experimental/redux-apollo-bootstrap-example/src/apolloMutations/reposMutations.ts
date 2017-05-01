import { gql } from "react-apollo";

export default gql`
  mutation {
    addRepo { 
        reposCount
    }
  }
`;