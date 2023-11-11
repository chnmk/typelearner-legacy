<template>
    <p>Счётчик: {{ countAnswers }}</p>
</template>

<script>
export default {
    name: "CountAnswers",
    props: {
        countAnswers: {
            type: Number,
            required: true
        }
    }
}
</script>