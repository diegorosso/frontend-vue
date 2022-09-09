<template>
  <NavbarVue/>
  <div class="container p-4">
    <router-view/>
  </div>
</template>

<script>
  import NavbarVue from './components/NavbarVue.vue';
  
  export default{
    name: 'App',
    components:{
      NavbarVue
    }
  }
</script>

