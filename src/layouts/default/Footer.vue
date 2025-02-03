<template>
  <div id="Footer">
    <v-container class="container-img-footer">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-img src="@/assets/imgs/bg-footer-trees.webp" alt="Background image of trees"></v-img>
          </v-col>
        </v-row>
    </v-container>
    <v-container class="copyright">
        <v-row>
            <v-col cols="12" class="pb-1 pt-1">
                <p class="text-white position-relative text-center txt-caption">
                    {{ currentYear }} ©. Tree Care Office. All Rights Reserved. Privacy Policy. Terms & Conditions.
                </p>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());

</script>

<style lang="scss" scoped>
#Footer {

    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    padding-top: 1em;
}

.container-img-footer {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;

  .v-row {
    margin: 0;
    .v-col {
      padding: 0;
    }
  }
}
.copyright {
    background-color: #233C36;
    width: 100%;
    padding: 1em;
    margin: 0;
    max-width: none;
}
</style>
```
