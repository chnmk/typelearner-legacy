<template>
    <div class="typingPanel">
        <TypingOriginalText />
        <TypingTranslatedText />
        <TypingSkipButton />
        <TypingHistoryTable />
    </div>
</template>

<script setup lang="ts">
    import TypingOriginalText from './TypingOriginalText.vue'
    import TypingTranslatedText from './TypingTranslatedText.vue'
    import TypingSkipButton from './TypingSkipButton.vue'
    import TypingHistoryTable from './TypingHistoryTable.vue'
</script>

<style scoped>
@media screen and (min-width: 800px) {
    .typingPanel {
        text-align: center;
        flex: 60%;
    } 
}
</style>