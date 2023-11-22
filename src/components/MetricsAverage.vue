<template>
    <!--TODO: 
        Add dynamic "...seconds." variations; 
        Come up with a fancy UI.
    -->
    <p>Среднее время: {{ metricsAverage }} секунд(ы)</p>
</template>

<script>
export default {
    name: "MetricsAverage",
    props: {
        metricsAverage: {
            type: Number,
            required: true
        }
    }
}
</script>