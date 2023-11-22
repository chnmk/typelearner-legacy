<template>
    <main class="typingmain">
        <!--Using the same name for languageChangeEmit and languageChange triggers languageChange() twice.-->
        <SettingsIndex
            @languageChangeEmit="languageChange"
        />
        <TypingIndex
            :fetchedOriginalText="fetchedOriginalText"
            :fetchedRussianText="fetchedRussianText"
            :slicedOriginalText="slicedOriginalText"
            :isTextCorrect="isTextCorrect"
            :isTextWrong="isTextWrong"
            :historyTable="historyTable"
            v-model:inputTextProp="inputText"
            @changeSentenceEmit="changeSentence"
        />
        <MetricsIndex
            :metricsTime="metricsTime"
            :metricsAnswers="metricsAnswers"
            :metricsAverage="metricsAverage"
            :metricsSpeed="metricsSpeed"
        />
    </main>
</template>

<script>
import SettingsIndex from "./components/SettingsIndex.vue"
import TypingIndex from "./components/TypingIndex.vue"
import MetricsIndex from "./components/MetricsIndex.vue"
//TODO: globally register UI components.
import DefaultButton from "./components/UI/DefaultButton.vue"
import axios from 'axios'
export default {
    name: 'TypeLearner',
    components: {
        SettingsIndex,
        TypingIndex,
        MetricsIndex,
        DefaultButton,
    },
    data() {
            return {
                fetchedOriginalText: "Загрузка...",
                slicedOriginalText: "Загрузка...",
                fetchedRussianText: "Загрузка...",
                inputText: "",
                currentLanguage: "eng",
                intervalVariable: undefined,
                isTextCorrect: false,
                isTextWrong: false,
                isTimerStarted: false,
                historyTable: [],
                historyId: 0,
                metricsTime: 0,
                metricsAnswers: 0,
                metricsAverage: 0,
                metricsSpeed: 0,
                historySpeed: [],
                isPreloaded: false,
                fetchedOriginalPreload: "Загрузка...",
                slicedOriginalTPreload: "Загрузка...",
                fetchedRussianPreload: "Загрузка...",
            }
        },
    mounted() {
        this.getSentence()
        },
    methods: {
        //API: https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
        //The number of fetchable sentences for one language is currently limited to 1000.
        getSentence() {
            //If there is currently no preloaded sentence (e.g. on a language change), 
            //load a new one directly into fetchedOriginalText variable:
            if (!this.isPreloaded) {
                //TODO: rewrite .get(...) using closure (or at least make it more readable). 
                axios
                .get('https://api.dev.tatoeba.org/unstable/sentences?lang=' + this.currentLanguage + '&trans=rus&page=' + String(Math.floor(Math.random() * 101)))
                .then((response) => {
                    //Pick a random sentence between #0 and #9 on the random API page fetched earlier in .get(...):
                    let rnd_num = Math.floor(Math.random() * 10);
                    this.fetchedOriginalText = response.data.data[rnd_num].text

                    //slicedOriginalText variable is used to display "..." at the end of long input placeholders.
                    //TODO: Manually handle other languages (.slice(0,11) for jp)
                    if (response.data.data[rnd_num].text.length > 22) { // >10 for jp
                        this.slicedOriginalText = response.data.data[rnd_num].text.slice(0,22) + "..."
                    } else {
                        this.slicedOriginalText = response.data.data[rnd_num].text
                    }
                    
                    //For some reason, sometimes translation #0 in API is empty. In this case, read trasnaltion #1:
                    try {
                        try {
                            this.fetchedRussianText = response.data.data[rnd_num].translations[0][0].text
                            console.log("API SECTION 0")
                        } catch (err) {
                            this.fetchedRussianText = response.data.data[rnd_num].translations[1][0].text
                            console.log("API SECTION 1")
                        }
                    //In case both #0 and #1 translations are empty (it has never happened so far):
                    } catch (err) {
                        this.fetchedRussianText = "error (handle later)"
                    }
                })
                //Start preloading the next sentence right away:
                this.preloadSentence()

            //If there already is a preloaded sentence, write it to fetchedOriginalText and preload another one:
            } else {
                this.fetchedOriginalText = this.fetchedOriginalPreload
                this.slicedOriginalText = this.slicedOriginalTPreload
                this.fetchedRussianText = this.fetchedRussianPreload
                this.isPreloaded = false
                this.preloadSentence()
            }
        },
        //TODO: think of a proper way to merge getSentence() and preloadSentence()
        preloadSentence() {
            axios
                .get('https://api.dev.tatoeba.org/unstable/sentences?lang=' + this.currentLanguage + '&trans=rus&page=' + String(Math.floor(Math.random() * 101)))
                .then((response) => {
                    var rnd_num = Math.floor(Math.random() * 10);
                    this.fetchedOriginalPreload = response.data.data[rnd_num].text
                    if (response.data.data[rnd_num].text.length > 22) {
                        this.slicedOriginalTPreload = response.data.data[rnd_num].text.slice(0,22) + "..."
                    } else {
                        this.slicedOriginalTPreload = response.data.data[rnd_num].text
                    }

                    try {
                        try {
                            this.fetchedRussianPreload = response.data.data[rnd_num].translations[0][0].text
                            console.log("API SECTION 0")
                        } catch (err) {
                            this.fetchedRussianPreload = response.data.data[rnd_num].translations[1][0].text
                            console.log("API SECTION 1")
                        }
                    } catch (err) {
                        this.fetchedRussianPreload = "error (handle later)"
                    }
                })
            this.isPreloaded = true
        },
        //isSentenceCorrect == true means the function was called by completing the sentence,
        //(from  watch: {inputText:...)
        //rather than by using the "skip" button.
        changeSentence(isSentenceCorrect) {
            if (isSentenceCorrect) {
                this.historyId++
                this.historyTable.unshift({id: this.historyId, Sentence: this.fetchedOriginalText, Time: this.metricsTime})
                this.metricsAverage = Math.round(this.historyTable.map(x => x.Time).reduce((a, b) => a + b, 0) / this.historyTable.map(x => x.Time).length);
                this.historySpeed.push((this.fetchedOriginalText.length/this.metricsTime)*60)
                this.metricsSpeed = Math.round(this.historySpeed.reduce((a, b) => a + b, 0) / this.historySpeed.length)
                this.metricsAnswers++
            }
            this.inputText = ""
            clearInterval(this.intervalVariable)
            this.metricsTime = 0
            this.isTimerStarted = false
            this.getSentence()

        },
        addTimer() {
            this.metricsTime++
        },
        languageChange(newLanguage) {
            console.log("CHANGED LANGUAGE")
            this.currentLanguage = newLanguage
            this.isPreloaded = false
            this.changeSentence()
        }
    },
    watch: {
        inputText: function(value) {
            //Automatically start the timer when writing the first letter:
            if ((this.isTimerStarted == false) && (this.inputText != "")) {
                this.isTimerStarted = true

                this.intervalVariable = setInterval(this.addTimer, 1000)
            }

            //Make input text green, red or grey depending on whether it's correct:
            if ((value == this.fetchedOriginalText.slice(0, value.length)) && (value.length !== 0)) {
                this.isTextCorrect = true
                this.isTextWrong = false
            } else if (value.length !== 0) {
                this.isTextCorrect = false
                this.isTextWrong = true
            } else {
                this.isTextCorrect = false
                this.isTextWrong = false
            }

            if (value == this.fetchedOriginalText) {
                this.changeSentence(true)
            }
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto Sans");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans JP");
@import url("https://fonts.googleapis.com/css2?family=Noto Sans Hebrew");

* {
    font-family:
        "Noto Sans",
        "Noto Sans JP",
        "Noto Sans Hebrew",
        sans-serif;
    color: #2c3e50;
    padding: 2px;
    margin: 10px;
}

.typingmain {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border: 2px solid purple;
    max-width: 1464px;
    margin: auto;
}
</style>
