<template>
    <div>
        <DefaultButton @click="emitChangeSentence">
            Get a random sentence
        </DefaultButton>
    </div>
</template>

<script setup lang="ts">
import DefaultButton from '../UI/DefaultButton.vue'
</script>

<script lang="ts">
import store from "@/store"
export default {
    methods: {
        emitChangeSentence() {
            store.dispatch("getNewSentence")
        }
    }

}
</script>