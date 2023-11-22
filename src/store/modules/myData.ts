export default {

    state: {
        helloWorld: "Hello, Vuex!",
        fetchedOriginalText: "Loading..."
    },

    getters: {
        getHelloWorld(state: any) {
            return state.helloWorld
        },
        getOriginalText(state: any) {
            return state.fetchedOriginalText
        }
    },

    actions: {

        async getNewSentence(context: any) {
            function fetchSentences<T>(url: string): Promise<T> {
                return fetch(url)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json() as Promise<{ data: T }>
                })
                .then(data => {
                    return data.data
                })
            }

            interface fetchedObjectStructure {
                text: string;
              }              
           
            
            const randomPage = String(Math.floor(Math.random() * 101));
            const fetchedArray: Array<fetchedObjectStructure> = await fetchSentences('https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&trans=rus&page=' + randomPage)
            const randomElement = Math.floor(Math.random() * 10);
            const fetchedObject = fetchedArray[randomElement]

            const fetchedOriginalText = fetchedObject.text

            console.log(fetchedObject)
            context.commit('updateSentence', fetchedOriginalText)
        }

    },

    mutations: {

        updateSentence(state: any, fetchedOriginalText: any) {
            state.fetchedOriginalText = fetchedOriginalText
        }

    }

}