import { createStore } from 'vuex'
// @ts-ignore  
import myData from "../store/modules/myData"

//https://www.youtube.com/watch?v=O8epzPrsADI
const store = createStore({
    modules: {
        myData
    }
})

export default store