<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Request</h3>
    <!-- <nuxt-link to="/">Home page</nuxt-link>
    <nuxt-link to="/kraken">ID</nuxt-link> -->
    <div>
      <b-list-group v-for="todo in todos" :key="todo._id">
        <nuxt-link :to="'/' + todo">
          <b-list-group-item
            id="list-nodes"
            button
            :class="{ active: isSelected(todo) }"
            @mouseover="selected = todo"
          >
            {{ todo }}
          </b-list-group-item>
        </nuxt-link>
      </b-list-group>
    </div>
    <div>
      <p>selected todo is {{ selected }}</p>
      <p>todos are {{ todos }}</p>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      selected: 0,
      todos: [],
      sysInfos: [],
    }
  },
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  created: function() {
    this.fetchTodo()
  },
  methods: {
    fetchTodo() {
      const uri = 'http://167.86.97.235:3000/wallets'
      axios.get(uri).then(response => {
        this.todos = response.data
      })

      // hardcoded json for testing
      // this.todos = [
      //   'bootstrap.txt',
      //   'mastercoin-cli_mn01.sh',
      //   'mastercoind_mn01.sh',
      //   'masternode_config.txt',
      //   'masternode_count.txt',
      //   'masternode_debug_14e48.k.time4vps.cloud.log',
      //   'masternode_debug_all.sh',
      //   'masternode_report.log',
      //   'monk.sh',
      //   'monk_check_sync_seeds.sh',
      //   'monk_list.sh',
      //   'monk_setupv2.sh',
      //   'monk_update_bootstrap.sh',
      //   'monkey-cli_bootstrap.sh',
      //   'monkey_logo.sh',
      //   'monkeyd_bootstrap.sh',
      //   'opcx-cli_mn02.sh',
      //   'opcxd_mn02.sh',
      //   'seeds.txt',
      //   'zest-cli_bootstrap.sh',
      //   'zest-cli_test001.sh',
      //   'zest_update_bootstrap.sh',
      //   'zestd_bootstrap.sh',
      //   'zestd_test001.sh'
      // ]
    },
    isSelected(i) {
      return i === this.selected
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
definitions: VueJS-sandbox\hello-world\node_modules\bootstrap\dist\css\bootstrap.css
-->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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
