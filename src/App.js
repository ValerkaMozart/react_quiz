import React from 'react'
import Layout from "./hoc/layout/Layout";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Quiz from "./Containers/Quiz/Quiz";
import QuizCreator from "./Containers/QuizCreator/QuizCreator"
import QuizList from "./Containers/QuizList/QuizList"
import Auth from "./Containers/Auth/Auth";
import Logout from "./Components/Logout/Logout";
import {connect} from "react-redux";
import {autoLogin} from "./store/actions/auth";

class App  extends React.Component{
    componentDidMount() {
        this.props.autoLogin()
    }

    render () {
       let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" exact component={QuizList}/>
                <Redirect to={'/'}/>
            </Switch>
        )

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator}/>
                    <Route path="/quiz/:id" component={Quiz}/>
                    <Route path={'/logout'} component={Logout}/>
                    <Route path="/" exact component={QuizList}/>
                    <Redirect to={'/'}/>
                </Switch>
            )
        }

        return (
            <Layout>
                { routes }
            </Layout>
        )
    }


}
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}
function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
