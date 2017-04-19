import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import userActions from "../../actions/user_actions";
import Counter from "../../components/counter_component";
import * as Redux from "redux";
import { withUser } from "@accounts/react";
import { gql, graphql } from "react-apollo";

const usersPageQuery = gql`
   query usersPageQuery {
       users {
          usersCount
       }
   }
 `;

function mapStateToPropsUserPage(state: any) {
    return { users: state.users };
}

function mapDispatchToPropsUserPage(dispatch: Redux.Dispatch<any>) {
    return { actions: bindActionCreators(userActions, dispatch) };
}

@graphql(usersPageQuery)
@connect(mapStateToPropsUserPage, mapDispatchToPropsUserPage)
class UsersPage extends React.Component<any, any> {
    public render() {
        //let label = "Loading...";
        let label: any;
        //if (this.props.users !== undefined && this.props.users.loading === false) {
        //    label = this.props.users.usersCount;
        //}
        console.log("*********UsersPage**************");
        console.log("this.props.data=");
        console.log(this.props.data);

        const {loading, error, users } = this.props.data;

        console.log("loading=")
        console.log(loading)

        console.log("error=")
        console.log(error)

        console.log("users=")
        console.log(users)

        if (loading) {
            label = "Loading ...!!!";
        } else if (error) {
            label = this.props.error.message;
        } else {
            label = users.usersCount;
        }

        return (
            <div>
                <h1>Users Page!</h1>
                <Counter count={label}
                    addBtnTextLabel={"Add User"}
                    incrementAsync={() => { this.props.actions.addUserAsync(); }} />
            </div>);
    }
}

// export default UsersPage;
export default withUser(({ user }) => <UsersPage />);
