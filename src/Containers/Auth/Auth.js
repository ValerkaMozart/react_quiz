import React from 'react'
import classes from './Auth.module.css'
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import {connect} from 'react-redux'
import {auth} from "../../store/actions/auth";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

 class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: true,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: true,
                touched: false,
                validation: {
                    required: true,
                    email: false,
                    minLength: 6
                }
            }
        }

    }
    loginHandler =  () => {
        this.props.auth(this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )

    }

    registerHandler = () => {
        this.props.auth(this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )

    }

    submitHandler = (evt) => {
        evt.preventDefault()
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        let formControls = {...this.state.formControls}
        let control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            let control = this.state.formControls[controlName]

            return (


                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })

    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form action="" onSubmit={this.submitHandler} className={classes.AuthForm}>

                        {this.renderInputs()}
                        <Button type='primary' onClick={this.loginHandler} disabled={!this.state.isFormValid}>
                            Войти
                        </Button>

                        <Button type='primary' onClick={this.registerHandler} disabled={!this.state.isFormValid}>
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth : (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)