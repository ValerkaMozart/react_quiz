import React, {Component} from 'react'
import classes from './Layout.module.css'
import MenuToggle from "../../Components/Navigation/MenuToggle/MenuToggle"
import Drawer from "../../Components/Navigation/Drawer/Drawer"
import {connect} from "react-redux";
class Layout extends Component {
    state = {
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    onCloseMenu = () => {
        this.setState({
            menu: false
        })
    }
    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                isOpen={this.state.menu}
                onCloseMenu={this.onCloseMenu}
                isAuthenticated={this.props.isAuthenticated}
                />
                <MenuToggle
                onToggle={this.toggleMenuHandler}
                isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}
export default connect(mapStateToProps)(Layout)