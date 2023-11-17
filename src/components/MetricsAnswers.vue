<template>
    <!--TODO: 
        Come up with a fancy UI.
    -->
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