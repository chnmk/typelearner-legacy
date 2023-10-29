<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Typing Test VUE + JS</h1>
        <select>
            <option value="Japanese">Японский</option>
            <option value="Hebrew">Иврит</option>
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
        <button @click="changeSentence">Пропустить</button>
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
            isTextCorrect: false,
            isTextWrong: false,
        }
    },
  mounted() {
      axios
      //https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
      //https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&trans=rus
      //Вообще в идеале надо смотреть сколько страниц перевода вообще есть для данного языка.
      .get('https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&trans=rus&page=' + String(Math.floor(Math.random() * 101)))
      .then((response) => {
          console.log(response.data.data)
          
          var rnd_num = Math.floor(Math.random() * 10);
          this.fetchedOriginalText = response.data.data[rnd_num].text
          if (response.data.data[rnd_num].text.length > 10) {
              this.slicedOriginalText = response.data.data[rnd_num].text.slice(0,11) + "・・・"
          } else {
              this.slicedOriginalText = response.data.data[rnd_num].text
          }

          try {
              try {
                  this.fetchedRussianText = response.data.data[rnd_num].translations[0][0].text
                  console.log("OPTION 0")
              } catch (err) {
                  this.fetchedRussianText = response.data.data[rnd_num].translations[1][0].text
                  console.log("OPTION 1")
              }
          } catch (err) {
              this.fetchedRussianText = "***error*** (handle later)"
          }
      })
    },
    methods: {
        changeSentence() {
            console.log("FORCE CHANGE")
        },
    },
    watch: {
        inputText: function(value) {
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
                console.log("CHANGE")
            }
        }
    }

}
</script>

<style>
</style>
