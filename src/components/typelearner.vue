<!--TODO: Interface; Tatoeba reference; Pre-loading; Speed (per character) -->
<!--TODO*: Click map-->

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Typing Test VUE</h1>
        <select @change="languageChange($event)">
            <option value="eng">Английский</option>
            <option value="jpn">Японский</option>
            <option value="heb">Иврит</option>
        </select>
        <hr>
        <h1>{{ fetchedRussianText }}</h1>
        <p @click.right.prevent @copy.prevent @paste.prevent>
            {{ fetchedOriginalText }}
        </p>
        <input
            id="userInputText"
            :class="{ 'correct-text': isTextCorrect, 'wrong-text': isTextWrong }"
            type="text"
            :placeholder="slicedOriginalText"
            v-model="inputText"
        />
        <button @click="changeSentence(isSentenceCorrect)">Пропустить</button>
        <p>Таймер: {{ timerSeconds }}</p>
        <p>Счётчик: {{ countAnswers }}</p>
        <p>Среднее время: {{ averageTime }} секунд(ы).</p>
        <table class="table-center">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Предложение</th>
                <!--Сделать округляющимся-->
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
        <hr>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
            return {
                fetchedOriginalText: "",
                slicedOriginalText: "",
                fetchedRussianText: "",
                inputText: "",
                currentLanguage: "eng",
                intervalVariable: undefined,
                isTextCorrect: false,
                isTextWrong: false,
                isTimerStarted: false,
                timerSeconds: 0,
                countAnswers: 0,
                historyTable: [],
                historyId: 0,
                averageTime: 0,
            }
        },
    mounted() {
        this.getSentence()
        },
    methods: {
        getSentence() {
            axios
            //https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
            //https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&trans=rus

            //Получается количество предложений ограничено 1000. Надо посмотреть позволяет ли api больше взять.
            //При смене предложений загрузка слишком долго происходит, их бы предзагружать как-то.
            //***Возможно в api есть какой-нибудь random order? 
            .get('https://api.dev.tatoeba.org/unstable/sentences?lang=' + this.currentLanguage + '&trans=rus&page=' + String(Math.floor(Math.random() * 101)))
            .then((response) => {
                //console.log(response.data.data)
                var rnd_num = Math.floor(Math.random() * 10);
                this.fetchedOriginalText = response.data.data[rnd_num].text
                if (response.data.data[rnd_num].text.length > 24) { // jp = >10
                    //По-другому обработать другие языки (jp = 0,11)
                    this.slicedOriginalText = response.data.data[rnd_num].text.slice(0,25) + "..."
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
        },
        changeSentence(isSentenceCorrect) {
            if (isSentenceCorrect) {
                this.historyId++
                this.historyTable.push({id: this.historyId, Sentence: this.fetchedOriginalText, Time: this.timerSeconds})
                this.averageTime = this.historyTable.map(x => x.Time).reduce((a, b) => a + b, 0) / this.historyTable.map(x => x.Time).length;
                this.countAnswers++
            }
            this.inputText = ""
            clearInterval(this.intervalVariable)
            this.timerSeconds = 0
            this.isTimerStarted = false
            this.getSentence()

        },
        addTimer () {
            this.timerSeconds++
        },
        languageChange (event) {
            this.currentLanguage = event.target.value
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
.table-center {
  margin-left: auto;
  margin-right: auto;
}
</style>
