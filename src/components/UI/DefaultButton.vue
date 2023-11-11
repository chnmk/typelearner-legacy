<template>
    <button class="default-button">
        <slot></slot>
    </button>
</template>

<script>
export default {

}
</script>

<style scoped>
.default-button {
    border-radius: 3px;
    margin-top: 10px;
    padding: 5px;
    background: none;
    color: darkmagenta;
    border: 1px solid purple;
}
</style>