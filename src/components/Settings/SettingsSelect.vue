<template>
    <div>
        Выбор языка:
    </div>
    <div>
        <DefaultSelect>
            <option value="eng">Английский</option>
            <option value="jpn">Японский</option>
            <option value="heb">Иврит</option>
        </DefaultSelect>
    </div>
</template>

<script setup lang="ts">
import DefaultSelect from '../UI/DefaultSelect.vue'
</script>