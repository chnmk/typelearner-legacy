<template>
    <div class="metrics">
        <TimerSeconds
            :timerSeconds="timerSeconds"
        />
        <CountAnswers
            :countAnswers="countAnswers"
        />
        <AverageTime
            :averageTime="averageTime"
        />
    </div>
</template>

<script>
import TimerSeconds from "./TimerSeconds.vue"
import CountAnswers from "./CountAnswers.vue"
import AverageTime from "./AverageTime.vue"
export default {
    name: "Metrics",
    components: {
        TimerSeconds,
        CountAnswers,
        AverageTime
    },
    props: {
        timerSeconds: {
            type: Number,
            required: true
        },
        countAnswers: {
            type: Number,
            required: true
        },
        averageTime: {
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