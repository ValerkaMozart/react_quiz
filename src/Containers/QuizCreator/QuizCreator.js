import React from "react"
import classes from './QuizCreator.module.css'
import Button from "../../Components/UI/Button/Button"
import Input from "../../Components/UI/Input/Input"
import {createControl, validate, validationForm} from '../../Form/FormFramework'
import Select from "../../Components/UI/Select/Select";

import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'

        }, {required: true}),
        option1: createControl({
            label: 'Вариант 1',
            errorMessage: 'Значение не может быть пустым',
            id: 1

        }, {required: true}),
        option2: createControl({
            label: 'Вариант 2',
            errorMessage: 'Значение не может быть пустым',
            id: 2
        }, {required: true}),
        option3: createControl({
            label: 'Вариант 3',
            errorMessage: 'Значение не может быть пустым',
            id: 3
        }, {required: true}),
        option4: createControl({
            label: 'Вариант 4',
            errorMessage: 'Значение не может быть пустым',
            id: 4
        }, {required: true})


    }
}

class QuizCreator extends React.Component {


    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()


        let {question, option1, option2, option3, option4} = this.state.formControls

        let questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem)
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = event => {
        event.preventDefault()

        this.setState({
            quiz: [],
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })

        this.props.finishCreateQuiz()

    }

    changeHandler = (value, controlName) => {
        let formControls = {...this.state.formControls}
        let control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        this.setState({
            formControls,
            isFormValid: validationForm(formControls)
        })

    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            let controls = this.state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input

                        label={controls.label}
                        value={controls.value}
                        valid={controls.valid}
                        shouldValidate={!!controls.validation}
                        touched={controls.touched}
                        errorMessage={controls.errorMessage}
                        onChange={(event) => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>

            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        let select = <Select
            label={'Выберете правильный овтет'}
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        {select}

                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>

            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)