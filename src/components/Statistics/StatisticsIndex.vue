<template>
    <div class="statisticsPanel">
        <StatisticsTime />
        <StatisticsCount />
        <StatisticsSpeed />
    </div>
</template>

<script setup lang="ts">
    import StatisticsTime from './StatisticsTime.vue'
    import StatisticsCount from './StatisticsCount.vue'
    import StatisticsSpeed from './StatisticsSpeed.vue'
</script>

<style scoped>
@media screen and (min-width: 800px) {
    .statisticsPanel {
        text-align: right;
        flex: 20%;
    }
}
</style>