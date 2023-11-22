<template>
    <div class="statisticsPanel">
        <StatisticsTime />
        <StatisticsCount />
        <StatisticsSpeed />
        {{ helloWorld }}
    </div>
</template>

<!--Components API:-->
<!-- <script setup lang="ts">
    import StatisticsTime from './StatisticsTime.vue'
    import StatisticsCount from './StatisticsCount.vue'
    import StatisticsSpeed from './StatisticsSpeed.vue'


    import { computed } from 'vue'
    import { useStore } from 'vuex'
    const store = useStore()
    const helloWorld = computed(() => {
        return store.getters.getMyData
    })
</script> -->

<script lang="ts">
import StatisticsTime from './StatisticsTime.vue'
import StatisticsCount from './StatisticsCount.vue'
import StatisticsSpeed from './StatisticsSpeed.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        StatisticsTime,
        StatisticsCount,
        StatisticsSpeed
    },

    computed: {
        ...mapGetters({
            helloWorld: "getHelloWorld"
        })
    }
}
</script>

<style scoped>
@media screen and (min-width: 800px) {
    .statisticsPanel {
        text-align: right;
        flex: 20%;
    }
}
</style>