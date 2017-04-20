import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import repoActions from "../../actions/repo_actions";
import Counter from "../../components/counter_component";
import * as Redux from "redux";
import { withUser } from '@accounts/react';
import { graphql } from "react-apollo";
import reposPageQuery from "../../apolloQueries/repos";

function mapStateToPropsReposPage(state: any) {
    return { repos: state.repos };
}

function mapDispatchToPropsReposPage(dispatch: Redux.Dispatch<any>) {
    return { actions : bindActionCreators(repoActions, dispatch) };
}

@graphql(reposPageQuery)
@connect(mapStateToPropsReposPage, mapDispatchToPropsReposPage)
class ReposPage extends React.Component<any, any> {
    public render() {
        let label: any;
        const { data: { loading, error, repos } } = this.props;

        if (loading) {
            label = "Loading ...";
        } else if (error) {
            label = error.message;
        } else {
            label = repos.reposCount;
        }
        return (
            <div>
                <h1>Repos Page!</h1>
                <Counter count={label}
                         addBtnTextLabel={"Add Repo"}
                         incrementAsync={() => { this.props.actions.addRepoAsync(); } } />
            </div>);
    }
}

export default withUser(({ user }) => <ReposPage />);
