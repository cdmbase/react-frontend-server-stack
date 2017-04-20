import { gql } from "react-apollo";

export default gql`
   query usersPageQuery {
       users {
          usersCount
       }
   }
 `;