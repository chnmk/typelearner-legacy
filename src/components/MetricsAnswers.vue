<template>
    <p>Счётчик: {{ metricsAnswers }}</p>
</template>

<script>
export default {
    name: "MetricsAnswers",
    props: {
        metricsAnswers: {
            type: Number,
            required: true
        }
    }
}
</script>