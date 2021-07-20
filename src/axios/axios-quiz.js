import axios from "axios"

export default axios.create({
    baseURL: 'https://react-quiz-f1053-default-rtdb.firebaseio.com'
})