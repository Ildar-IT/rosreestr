<template>
  <v-app>
      <home/>
  </v-app>
</template>
<script>

import Home from '@/views/home'

export default {
  name: 'App',
  components: {
    Home
  }


};
</script>

<style lang="scss">

:root {
  --vh: 1vh;
  --gray: #B3B8CB;
}


html {
  overflow-y: inherit;
  overflow-x: hidden;
}

body {
  overflow: hidden;
  min-width: 320px;
  cursor: default;
  font-family: Avenir, Helvetica, Arial, sans-serif;;
  padding: 0;
  margin: 0;
  color: $black;
  font-style: normal;

  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  opacity: 0.7;

}

#app {

}


a {
  @include transition();
  &:hover {
    opacity: 0.7;
  }
}

p {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: $black;
}

label {
  font-size: 10px;
  line-height: 13px;
  letter-spacing: -0.02em;
}


h4, h5, h6 {
  color: $black;
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
}

h1, .h1 {
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;

  color: $primary-2;
}

h2, .h2 {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: $black;
}
h3, .h3 {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: $black;
}

ul {
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;
    & + li {
      margin-top: 10px;
    }
  }
}
span {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;

}



</style>
