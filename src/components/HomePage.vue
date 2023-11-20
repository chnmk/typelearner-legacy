<template>
    <div class="settingsPanel">
        Settings Panel
    </div>
    <div class="mainPanel">
        Main Panel
    </div>
    <div class="metricsPanel">
        Metrics Panel
    </div>
</template>

<style scoped>
@media screen and (min-width: 800px) {
    .settingsPanel {
    text-align: left;
    flex: 20%;
    }
.mainPanel {
    text-align: center;
    flex: 60%;
    } 

.metricsPanel {
    text-align: end;
    flex: 20%;
    }
}
</style>