<template>
    <div class="metrics">
        <MetricsTime
            :metricsTime="metricsTime"
        />
        <MetricsAnswers
            :metricsAnswers="metricsAnswers"
        />
        <MetricsAverage
            :metricsAverage="metricsAverage"
        />
        <MetricsSpeed
            :metricsSpeed="metricsSpeed"
        />
    </div>
</template>

<script>
// TODO: Add and actual WPM (Word Per Minute) metric.
import MetricsTime from "./MetricsTime.vue"
import MetricsAnswers from "./MetricsAnswers.vue"
import MetricsAverage from "./MetricsAverage.vue"
import MetricsSpeed from "./MetricsSpeed.vue"
export default {
    name: "MetricsIndex",
    components: {
        MetricsTime,
        MetricsAnswers,
        MetricsAverage,
        MetricsSpeed
    },
    props: {
        metricsTime: {
            type: Number,
            required: true
        },
        metricsAnswers: {
            type: Number,
            required: true
        },
        metricsAverage: {
            type: Number,
            required: true
        },
        metricsSpeed: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.metrics {
    font-size: 14px;
    text-align: left;
    flex: 20%;
    border: 2px solid purple;
}
</style>