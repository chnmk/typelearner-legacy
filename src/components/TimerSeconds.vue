<template>
    <p>Таймер: {{ timerSeconds }}</p>
</template>

<script>
export default {
    name: "TimerSeconds",
    props: {
        timerSeconds: {
            type: Number,
            required: true
        }
    }
}
</script>