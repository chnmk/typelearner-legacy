export default {

    state: {
        helloWorld: "Hello, Vuex!"
    },

    getters: {
        getMyData(state: any) {
            return state.helloWorld
        }
    },

    mutations: {},

    actions: {},

}