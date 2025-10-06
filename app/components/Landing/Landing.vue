<template>
    <div class="root">
        <div class="logo">
            <Logo />
        </div>
        <div class="welcome">
            <WelcomeText />
        </div>
        
    </div>
</template>

<style lang="scss" scoped>

$padding: 5;

.root {

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
    padding: #{$padding}vw;

    > *{
        flex-grow: 1;
        height: 50%; 
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}


@media (orientation: landscape) {
    
    .root {

        flex-direction: row-reverse;
        padding: #{$padding}vh;
        > * {
            flex-grow: 1;
            width: 50%;        
            height: 100%;
        }
    }
}
</style>