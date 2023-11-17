<template>
    <!--TODO: 
        Add dynamic "...seconds." variations; 
        Come up with a fancy UI.
    -->
    <p>Среднее время: {{ metricsSpeed }} секунд(ы).</p>
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