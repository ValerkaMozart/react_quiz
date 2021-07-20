import React, {Component} from "react"
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop"
import {NavLink} from 'react-router-dom'



class Drawer extends Component {
    clickHandler = () => {
        this.props.onCloseMenu()
    }
    renderLinks(links) {
        return links.map((el, i) => {
            return (
                <li key={i}>
                    <NavLink
                        to={el.to}
                        exact={el.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {el.label}
                    </NavLink>
                </li>
            )
        })

    }

    render() {
        console.log(this.props.isAuthenticated )
        let cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        let links = [
            {to: '/', label: 'Список', exact: true}
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop isOpen={this.props.onCloseMenu}/> : null}
            </React.Fragment>

        )
    }
}

export default Drawer