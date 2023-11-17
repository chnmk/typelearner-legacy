<template>
    <!--TODO: 
        Add "...seconds." etc; 
        Add dynamic "...seconds." variations; 
        Come up with a fancy UI.
    -->
    <p>Таймер: {{ metricsTime }}</p>
</template>

<script>
export default {
    name: "MetricsTime",
    props: {
        metricsTime: {
            type: Number,
            required: true
        }
    }
}
</script>