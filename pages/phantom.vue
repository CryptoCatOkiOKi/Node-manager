<template>
  <section class="container">
    <div>
      <h1 class="title">
        {{msg}}
      </h1>
      <nuxt-link to="/" class="pluslink">
      <p>Home</p>
      </nuxt-link>
      <!-- <ActiveNodesList :active=isActiveNodes /> -->
      <PhantomNodesList />
    </div>
  </section>
</template>

<script>
import PhantomNodesList from '~/components/PhantomNodesList.vue'

export default {
  props: {
  },
  data() {
    return {
      msg: "List of Phantom Nodes",
      // activeNodes: this.$route.params.activeNodes
      activeNodes: false
    }
  },
  components: {
    PhantomNodesList
  },
  created: function() {
    this.isActiveNodes()
  },
  methods: {
    isActiveNodes() {
      let isActive = "Phantom"
      this.msg = isActive + " Nodes"
      return this.activeNodes ? "TRUE" : "FALSE"
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
.pluslink:active {
  text-decoration: none;
  color: #000;
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
</style>