<template>
    <div>
        {{ helloTatoeba }}
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            helloTatoeba: "getOriginalText"
        })
    }
}
</script>
