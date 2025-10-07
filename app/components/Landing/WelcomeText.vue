<template>
    <div class="welcome-text">
        <h1 ref="textRef">
            <span class="fontM">👋🏻</span> <span class="thinner">I'm </span><span class="fontL">HÆNK</span>.<br>
            <span class="thinner">integrative</span><br>
            <span class="fontM focus-text">Developer</span><br>
            <span class="thinner">&</span> <span class="fontM focus-text">Designer</span>
        </h1>
    </div>
</template>

<script setup lang="ts">

import textFit from 'textfit';
const textRef = ref<HTMLElement | null>(null);

function refitText() {
    if (!textRef.value) return;
    textFit(textRef.value!, {
        alignVert: true,
        maxFontSize: 500
    });
}

onMounted(() => {

    document.fonts.ready.then(() => {
        refitText();
        textRef.value!.style.opacity = '1';
        textRef.value!.style.transform = 'translateY(0)';
    });

    window.addEventListener('resize', refitText);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', refitText);
})
</script>

<style lang="scss" scoped>
h1 {
    font-weight: bold;
    text-wrap: nowrap;
    width: 100%;
    height: 100%;

    // otherwise not scaled up properly on ios safari mobile
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;

    opacity: 0;
    transform: translateY($animTransY);
    transition: opacity $animSpeedLanding $steepEaseOut,
        transform $animSpeedLanding $steepEaseOut;
}

.welcome-text {
    height: 100%;
    width: 100%;
}

.thinner {
    font-weight: 200;
}

.focus-text {
    color: transparent;
    background: linear-gradient(-45deg, $color1 10%, $color2 90%);
    background-clip: text;
    animation: colorShift 8s infinite linear;
}

.fontL {
    font-size: 1.8em;
}

.fontM {
    font-size: 1.6em;
}
</style>
