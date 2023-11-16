<template>
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
            :value="inputTextProp"
            @input="$emit('update:inputTextProp', $event.target.value)"
        />
        <DefaultButton @click="emitChangeSentence(isSentenceCorrect)">Пропустить</DefaultButton>
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
</template>

<script>
import DefaultButton from "./UI/DefaultButton.vue"
export default {
    name: "TypingIndex",
    components: {
        DefaultButton
    },
    props: {
        //modelValue is a default name for v-model
        //App.vue: v-model="inputText" instead of v-model:MyNameHere="inputText"
        inputTextProp: {
            type: String,
            required: true
        },
        fetchedOriginalText: {
            type: String,
            required: true
        },
        fetchedRussianText: {
            type: String,
            required: true
        },
        slicedOriginalText: {
            type: String,
            required: true
        },
        isTextCorrect: {
            type: Boolean,
            required: true
        },
        isTextWrong: {
            type: Boolean,
            required: true
        },
        historyTable: {
            type: Object,
            required: true
        }
    },
    methods: {
        emitChangeSentence(isSentenceCorrect) {
            this.$emit('changeSentenceEmit', isSentenceCorrect)
        }
    }
}
</script>

<style scoped>
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