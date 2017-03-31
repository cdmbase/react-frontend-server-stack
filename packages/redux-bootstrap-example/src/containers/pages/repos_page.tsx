import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import repoActions from "../../actions/repo_actions";
import Counter from "../../components/counter_component";
import * as Redux from "redux";

function mapStateToPropsReposPage(state: any) {
    return { repos: state.repos };
}

function mapDispatchToPropsReposPage(dispatch: Redux.Dispatch<any>) {
    return { actions : bindActionCreators(repoActions, dispatch) };
}

@connect(mapStateToPropsReposPage, mapDispatchToPropsReposPage)
class ReposPage extends React.Component<any, any> {
    public render() {
        let label = "Loading...";
        if (this.props.repos !== undefined && this.props.repos.loading === false) {
            label = this.props.repos.reposCount;
        }
        return (
            <div>
                <h1>Repos Page!</h1>
                <Counter count={label}
                         addBtnTextLabel={"Add Repo"}
                         incrementAsync={() => { this.props.actions.addRepoAsync(); } } />
            </div>
        );
    }
}

export default ReposPage;
