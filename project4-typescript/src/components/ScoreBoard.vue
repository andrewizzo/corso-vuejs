<script lang="ts">
    export default{
        props:['playerCount','computerCount']
    }
</script>

<template>
    <section class="score">
      Player <span>{{ playerCount }}</span> x 
     <span>{{ computerCount }}</span> Computer
    </section>
</template>

<style lang="css">
    .score {
        border-bottom: 1px solid black;
        padding: 24px;
        font-size: 18px;
    }

    span{
        padding: 8px;
        font-weight: bold;
        border: 1px solid black;
    }
</style>