<template>
    <main class="typingmain">
        <SettingsIndex
            @languageChangeEmit="languageChange"
        />
        <div class="typingtext">
            <p @click.right.prevent @copy.prevent @paste.prevent style="font-weight: bold;">
                {{ fetchedOriginalText }}
            </p>
            <p>
                {{ fetchedRussianText }}
            </p>
            <input
                id="userInputText"
                :class="{ 'correct-text': isTextCorrect, 'wrong-text': isTextWrong }"
                type="text"
                :placeholder="slicedOriginalText"
                v-model="inputText"
            />
            <DefaultButton @click="changeSentence(isSentenceCorrect)">Пропустить</DefaultButton>
            <hr>
            <p style="margin-top: 25px">История:</p>
            <p v-if="historyTable.length==0" style="color:lightgrey; font-style:italic">Пусто...</p>
            <table class="table-center" v-if="historyTable.length>0">
                <thead>
                <tr>
                    <th scope="col">Номер</th>
                    <th scope="col">Предложение</th>
                    <th scope="col">Время</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="value in historyTable" :key="value.id">
                    <td>{{value.id}}</td>
                    <td>{{value.Sentence}}</td>
                    <td>{{value.Time}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <MetricsIndex
            :metricsTime="metricsTime"
            :metricsAnswers="metricsAnswers"
            :metricsSpeed="metricsSpeed"
        />
    </main>
</template>

<script>
import SettingsIndex from "./components/SettingsIndex.vue"
import MetricsIndex from "./components/MetricsIndex.vue"
import DefaultButton from "./components/UI/DefaultButton.vue"
import axios from 'axios'
export default {
    name: 'TypeLearner',
    components: {
        SettingsIndex,
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
                metricsSpeed: 0,
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
        getSentence() {
            if (!this.isPreloaded) {
                //API: https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
                axios
                //Получается количество предложений пока ограничено 1000.
                .get('https://api.dev.tatoeba.org/unstable/sentences?lang=' + this.currentLanguage + '&trans=rus&page=' + String(Math.floor(Math.random() * 101)))
                .then((response) => {
                    var rnd_num = Math.floor(Math.random() * 10);
                    this.fetchedOriginalText = response.data.data[rnd_num].text
                    if (response.data.data[rnd_num].text.length > 22) { // jp = >10 (11, там ведь всегда точка...)
                        //По-другому обработать другие языки (jp = 0,11)
                        this.slicedOriginalText = response.data.data[rnd_num].text.slice(0,22) + "..."
                    } else {
                        this.slicedOriginalText = response.data.data[rnd_num].text
                    }

                    try {
                        try {
                            this.fetchedRussianText = response.data.data[rnd_num].translations[0][0].text
                            console.log("API SECTION 0")
                        } catch (err) {
                            this.fetchedRussianText = response.data.data[rnd_num].translations[1][0].text
                            console.log("API SECTION 1")
                        }
                    } catch (err) {
                        this.fetchedRussianText = "error (handle later)"
                    }
                })
                this.preloadSentence()
            } else {
                this.fetchedOriginalText = this.fetchedOriginalPreload
                this.slicedOriginalText = this.slicedOriginalTPreload
                this.fetchedRussianText = this.fetchedRussianPreload
                this.isPreloaded = false
                this.preloadSentence()
            }
        },
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
        changeSentence(isSentenceCorrect) {
            if (isSentenceCorrect) {
                this.historyId++
                this.historyTable.unshift({id: this.historyId, Sentence: this.fetchedOriginalText, Time: this.metricsTime})
                this.metricsSpeed = Math.round(this.historyTable.map(x => x.Time).reduce((a, b) => a + b, 0) / this.historyTable.map(x => x.Time).length);
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
            if ((this.isTimerStarted == false) && (this.inputText != "")) {
                this.isTimerStarted = true

                this.intervalVariable = setInterval(this.addTimer, 1000)
            }

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
    height: 100%;
    width: 100%;
}

.settings {
    font-size: 14px;
    text-align: center;
    flex: 20%;
    border: 2px solid purple;
}

.info {
    font-size: 14px;
    text-align: justify;
}

.typingtext {
    font-size: 16px;
    text-align: center;
    flex: 60%;
    border: 2px solid purple;
    padding: 10px;
}

.table-center {
    font-size: 14px;
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid purple;
}

.correct-text{
    color: green
}

.wrong-text{
    color: red
}
</style>
