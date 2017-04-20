import { gql } from "react-apollo";

export default gql`
   query reposPageQuery {
       repos {
          reposCount
       }
   }
 `;