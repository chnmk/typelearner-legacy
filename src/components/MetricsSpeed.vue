<template>
    <!--TODO: 
        Add and actual WPM (Word Per Minute) metric for other languages.
        Come up with a fancy UI.
    -->
    <p>Символов в минуту: {{ metricsSpeed }}</p>
</template>

<script>
export default {
    name: "MetricsSpeed",
    props: {
        metricsSpeed: {
            type: Number,
            required: true
        }
    }
}
</script>