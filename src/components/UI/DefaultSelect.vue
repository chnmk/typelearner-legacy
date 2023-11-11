<template>
    <select class="default-select">
        <slot></slot>
    </select>
</template>

<script>
export default {

}
</script>

<style scoped>
.default-select {
    border-radius: 3px;
    margin-top: 15px;
    padding: 5px;
    background: none;
    color: darkmagenta;
    border: 1px solid purple;
}
</style>