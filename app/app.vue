<template>
    <div id="app">
        <Landing/>
    </div>
</template>

<script setup lang="ts">

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({behavior: 'smooth'});
    else console.warn("ScrollManager: ID: ", id);
}
provide('SCROLL_TO_SECTION', scrollToSection);

</script>

<style lang="scss" scoped>

#app { // stacked full screen pages
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    > * {
        width: 100%;
        flex-shrink: 0;
    }
}
</style>
