<template>
  <section class="container">
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        Node Manager
      </h1>
      <nuxt-link to="/" class="pluslink">
        <p>Home</p>
      </nuxt-link>
      <!-- <button @click="this.switch">Switch Test</button> -->
      <div v-show="showedSystemInfo">
        <SystemInfo />
      </div>
      <div v-show="showedHelloWorld">
        <HelloWorld />
      </div>
      <div class="nodes-button">
        <nuxt-link to="/addnodes" class="addnodes">
          <p>Add node(s)</p>
        </nuxt-link>   
              </div>  
              <div class="nodes-button">
        <nuxt-link to="/test" class="addnodes">
          <p>Test button</p>
        </nuxt-link>            
      </div>
    </div>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import HelloWorld from '~/components/NodesList.vue'
import SystemInfo from '~/components/SystemInfo.vue'

export default {
  components: {
    // Logo,
    HelloWorld,
    SystemInfo
  },
  props: {
    showedSystemInfo: { type: Boolean, default: true },
    showedHelloWorld: { type: Boolean, default: false }
  },
  methods: {
    switch() {
      if (this.showedSystemInfo) {
        this.showedSystemInfo = false
      } else {
        this.showedSystemInfo = true
      }

      if (this.showedHelloWorld) {
        this.showedHelloWorld = false
      } else {
        this.showedHelloWorld = true
      }

      return true
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: darkgrey;
  color: goldenrod;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 400%;
  color: black;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.pluslink,
.pluslink:visited,
.pluslink:hover,
.pluslink:active 
.pluslink p {
  text-decoration: none;
  color: goldenrod;
}

.list-group-item {
  color: goldenrod;
  background-color: white;
  margin-bottom: 5px;
}

.list-group-item.active {
  z-index: 2;
  color: goldenrod;
  background-color: rebeccapurple;
  border-color: rebeccapurple;
}

.addnodes,
.addnodes:visited {
  border-radius: 0.25rem;
  position: relative;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.125);
  color: goldenrod;
  background-color: rgb(0, 0, 0);
  border-color: #552b54;
  text-decoration: none;
  /* margin-right: 70%; */
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 1px;
}

.addnodes p {
margin-bottom: 0px;
}

.addnodes:hover,
.addnodes:active {
  background-color: #552b54;
  text-decoration: none;
}

.nodes-button {
  float: left;
}

</style>
