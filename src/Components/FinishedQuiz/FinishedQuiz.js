import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom'

function FinishedQuiz(props) {

    const counter = Object.keys(props.results).reduce((total, i) => {
        if (props.results[i] === 'success') total++
        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, i) => {

                        let cls = ['fa',
                            props.results[i+1] === 'error' ? 'fa-times' : 'fa-check',
                            classes[props.results[i+1]]]

                        return (
                            <li
                                key={i}
                            ><strong>{i + 1}</strong>.&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>

                        )
                    }
                )

                }
            </ul>
            <p>Правильно {counter} из {props.quiz.length}</p>
            <div>
                <Button onClick={props.btnRestart} type='primary'>
                    Повторить
                </Button>
                <Link to={'/'}>
                    <Button type='success'>Перейти в список тестов</Button>
                </Link>

            </div>
        </div>
    )

}

export default FinishedQuiz