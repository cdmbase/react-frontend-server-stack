import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import userActions from "../../actions/user_actions";
import Counter from "../../components/counter_component";
import * as Redux from "redux";
import { withUser } from "@accounts/react";
import { graphql } from "react-apollo";
import usersPageQuery from "../../apolloQueries/usersQueries";
import addUserMutation from "../../apolloMutations/usersMutations";

const CounterMutation = graphql(addUserMutation)(Counter);

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
        let label: any;
        const { data: { loading, error, users } } = this.props;

        if (loading) {
            label = "Loading ...";
        } else if (error) {
            label = error.message;
        } else {
            label = users.usersCount;
        }

        return (
            <div>
                <h1>Users Page!</h1>
                <CounterMutation count={label}
                    apolloQuery={usersPageQuery}
                    addBtnTextLabel={"Add User"}
                    incrementAsync={() => { this.props.actions.addUserAsync(); }} />
            </div>);
    }
}

export default withUser(({ user }) => <UsersPage />);
