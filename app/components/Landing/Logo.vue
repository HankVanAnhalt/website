<template>
    <div class="wrapper" ref="wrapperRef">
        <div class="image" @pointerdown="logoPress" ref="imageRef" :style="imageStyle">
            <div v-if="logoDimensions.width.value && logoDimensions.height.value" class="radial-text" ref="radialTextRef">
                <span v-for="(word, index) in words" :key="index" :style="getWordStyle(index)">{{ word }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

const textToDisplay = 'VIDEO ・ VR ・ AUDIO ・ ART ・ GAME ・ WEB ・ MEDIA ・ ';
const words = textToDisplay.split('');

const imageRef = ref<HTMLElement | null>(null);
const logoDimensions = useElementSize(imageRef);

const wrapperRef = ref<HTMLElement | null>(null);
const wrapperDimensions = useElementSize(wrapperRef);
const imageSizeReduce = 75;
const imageStyle = computed((): CSSProperties => {

    const width = wrapperDimensions.width.value;
    const height = wrapperDimensions.height.value;
    const isWide = width > height;

    return {
        height: isWide ? `${imageSizeReduce}%` : 'auto',
        width: isWide ? 'auto' : `${imageSizeReduce}%` 
    }
});

const fractionalOffset = 1.11; // make the word ring slightly bigger
const getWordStyle = (index: number): CSSProperties => {
    const numWords = words.length;
    const angleIncrement = (2 * Math.PI) / numWords;
    const angle = index * angleIncrement;
    const circleRadius = (Math.max(logoDimensions.width.value, logoDimensions.height.value) / 2) * fractionalOffset; 
    const x = circleRadius * Math.cos(angle);
    const y = circleRadius * Math.sin(angle);
    const rotationAngle = angle * (180 / Math.PI) + 90;
    return  {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
    };
}

const radialTextRef = ref<HTMLElement | null>();
let rotationAnim: Animation | null = null;
let blurAnim: Animation | null = null;
const blurMax = 1;
const animateBlur = (start: boolean) => {
    if (!radialTextRef.value) return;
    if (blurAnim) {
        blurAnim.cancel();
    }
    blurAnim = radialTextRef.value!.animate(
        [
            { filter: `blur(${start ? 0 : blurMax}px)` },
            { filter: `blur(${start ? blurMax : 0}px)` }
        ],
        {
            duration: 30,
            fill: 'forwards',
            easing: start ? 'ease-out' : 'ease-in'
        }
    );
};

const animateRot = () => {
    if (radialTextRef.value && !rotationAnim) {
        rotationAnim = radialTextRef.value.animate(
            [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
            ],
            {
                duration: 40000,
                iterations: Infinity,
                easing: 'linear'
            }
        );
    }
}

watchEffect(animateRot); 

const logoPress = (event: MouseEvent) => {
    
    const logoEl = event.currentTarget as HTMLElement;

    if (!logoEl || !rotationAnim) return;

    logoEl.style.padding = '1%';
    rotationAnim.playbackRate = 75;    
    animateBlur(true);
    
    setTimeout(() => {
        logoEl.style.padding = '0';
    }, 125);

    setTimeout(() => {
        rotationAnim!.playbackRate = 1;
        animateBlur(false);
        
    }, 175);
}

onMounted(() => {
    document.fonts.ready.then(() => {
        imageRef.value!.style.opacity = '1';
        imageRef.value!.style.transform = 'translateY(0)';
    })
})
</script>

<style lang="scss" scoped>

.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    touch-action: none;
}

.image {
    scale: 0.95;
    margin: calc(1em * 1.11); //radial text font size + offset
    aspect-ratio: 1/1;
    background-image: url("/images/Logo.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-shadow: 0 0 18vw 5px rgba($color: #aaff00ea, $alpha: .7);
    transition: padding 0.1s ease-out;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0;
    transform: translateY(calc(-1 * $animTransY));
    transition: opacity $animSpeedLanding $steepEaseOut,
                transform $animSpeedLanding $steepEaseOut;
}

.radial-text {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 3.5vw;
    font-weight: 200;
    color: rgb(217, 255, 0);
    white-space: nowrap;

    > * {
        position: absolute;
        transform-origin: center;
    }
}


@media(orientation: landscape) {
    
    .image {
        box-shadow: 0 0 10vw 5px rgba($color: #aaff00ea, $alpha: .7);
    }

    .radial-text {
        font-size: 2.5vw;
    }
}

</style>