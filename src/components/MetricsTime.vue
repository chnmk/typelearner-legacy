<template>
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