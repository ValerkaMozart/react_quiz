import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionsType";

import axios from "../../axios/axios-quiz";

export  function createQuizQuestion (item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }

}

export function resetQuizCreation () {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz () {
    return async (dispatch, getState) => {
        let state = getState()
        console.log(state.create.quiz)
        await axios.post(`https://react-quiz-f1053-default-rtdb.firebaseio.com/quizes.json`, state.create.quiz)
        dispatch(resetQuizCreation())
    }
}