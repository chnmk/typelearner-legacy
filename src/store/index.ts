import { createStore} from 'vuex'
import myData from "../store/modules/myData"

const store = createStore({
    modules: {
        myData
    }
})

export default store