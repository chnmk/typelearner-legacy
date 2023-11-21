<template>
    <div class="settingsPanel">
        <SettingsSelect />
        <SettingsInfo />
        <SettingsCredits />
    </div>
</template>

<script setup lang="ts">
    import SettingsSelect from './SettingsSelect.vue'
    import SettingsInfo from './SettingsInfo.vue'
    import SettingsCredits from './SettingsCredits.vue'
</script>

<style scoped>
    @media screen and (min-width: 800px) {
        .settingsPanel {
            text-align: left;
            flex: 20%;
        }
    }
</style>