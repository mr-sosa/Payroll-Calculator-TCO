<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col cols="6" md="4" >
        <v-img class="logo-img" src="@/assets/imgs/Logo_TCO.webp" alt="TCO logo"/>
      </v-col>
      <v-col class="container-shapes">
        <v-img src="@/assets/imgs/Image-shapes.webp" alt="Image shapes"/>
      </v-col>
      <v-col cols="4" md="3"  align="center">
        <v-btn size="medium"  href="https://treecareoffice.com/" target="_blank" variant="text" rounded="xl" class="btn_home">Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  //
</script>

<style lang="scss" scoped>
  .v-container {
    max-width: 90rem;
    width: 100%;
    margin: auto;
  }
  .logo-img {
    max-height: 6.25rem;
  }
  .container-shapes {
    width: 20%;
    position: absolute;
    top: -1%;
    left: 40%;
    max-width: 20rem;
    .v-responsive {
      max-width: 20rem;
    }
  }
  .btn_home { padding: 0.5em 2em; }
  @media screen and (max-width:  1279px) {
    .container-shapes{
      width: 30%;
      left: 35%;
    }
  }
</style>
