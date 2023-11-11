<template>
    <p>Среднее время: {{ averageTime }} секунд(ы).</p>
</template>

<script>
export default {
    name: "AverageTime",
    props: {
        averageTime: {
            type: Number,
            required: true
        }
    }
}
</script>