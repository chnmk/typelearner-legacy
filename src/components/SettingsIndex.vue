<template>
    <div class="settings">
        <h1 style="font-size:24px; margin-bottom:25px;">typelearner</h1>
        <p>Язык предложений:
            <DefaultSelect @change="emitLanguageChange($event)">
                <option value="eng">Английский</option>
                <option value="jpn">Японский</option>
                <option value="heb">Иврит</option>
            </DefaultSelect>
        </p>
        <hr>
        <div class="info">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum quasi deserunt consequatur fugiat doloremque porro deleniti maxime magnam aperiam. Quo ipsa, possimus cum aliquid adipisci odio repudiandae, vero inventore, soluta molestiae suscipit quaerat ab rerum ex hic voluptatem atque? Expedita amet est facilis laudantium qui iusto harum obcaecati excepturi perferendis!</p>
        </div>
        <p>Предложения взяты с ресурса <a href="https://tatoeba.org/">tatoeba.org</a></p>
    </div>
</template>

<script>
import DefaultSelect from "./UI/DefaultSelect.vue"
export default {
    name: "SettingsIndex",
    components: {
        DefaultSelect
    },
    methods: {
        emitLanguageChange(event) {
            this.$emit('change', event.target.value)
        }
    }
}
</script>

<style scoped>
.settings {
    font-size: 14px;
    text-align: center;
    flex: 20%;
    border: 2px solid purple;
}

.info {
    font-size: 14px;
    text-align: justify;
}
</style>