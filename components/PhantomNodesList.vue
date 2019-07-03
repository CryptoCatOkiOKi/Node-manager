<template>
  <div class="hello">
    <b-list-group v-for="coin in coins" :key="coin._id">
      <b-list-group-item 
      id="coin"
      button
      :class="{ active: isHoovered(coin) }"      
      v-b-toggle="'coin.name'"
      @click="doMouseClick(coin)"
      @mouseover="doMouseOver(coin)"
      @mouseleave="doMouseLeave()"        
      >
      {{ coin.name }}

      <div>
        <b-collapse id="coin.name" 
        v-if="isSelected(coin)" 
        class="mt-1"
        >
          <b-card 
          :class="{ active: isHoovered(coin) }"
          >
            <p class="card-text" v-html="getinfo"></p>
          </b-card>
        </b-collapse>
      </div>

      </b-list-group-item>
    </b-list-group>

    <!-- <p>Hoovered: {{hoovered}}</p> -->
    <!-- <p v-for="select in selected" :key="select._id">
    Selected: {{select.name}} {{select.alias}}
    </p> -->

  </div>
</template>

<script>
// VRZI VEN VSO BALASTNO KODO IN IZ NODELIST.VUE TUDI!!
import axios from 'axios'
export default {
  name: 'PhantomNodeList',
  props: {
    msg: { 
      type: String,
      default: 'Phantom Nodes'
    }
  },
  data() {
    return {
      sysInfos: [],
      nodesCount: [],
      coins: [],
      nodes: [],
      getinfo: 'Fetching data',
      hoovered: String,
      selected: []
    }
  },
  created: function() {
    this.fetchCoins()
  },
  methods: {
      fetchCoins() {
      const uri = process.env.baseUrl + '/phantomcoins'
      axios.get(uri).then(response => {
        this.coins = response.data
      })      
    },
    isHoovered(i) {
      return i === this.hoovered
    },
    showActiveNodes() {
      let i = false
      return i
    },
    testGetInfo(coin) {
      console.log('testGetInfo ' + coin.name)
      const uri = process.env.baseUrl + '/phantomnodes?coin=' + coin.name
       axios.get(uri).then(response => {
        let getInfoData = response.data

        this.getinfo = 'Num. of nodes: ' + getInfoData.length + '<br>' +
        'Port: ' + coin.port + '<br>' +
        'Protocol number: ' + coin.protocol_number
        console.log(getInfoData)


        if (getInfoData.errors) {
          this.getinfo = this.getinfo  + "<br>" + "Errors: "  + getInfoData.errors       
        }
      })      
    },
    doMouseOver(node) {
      this.hoovered = node
    },
    doMouseLeave() {
      this.hoovered = 0
    },
    doMouseClick(node) {
      this.testGetInfo(node)
      this.selected = []
      this.selected.push(node)
    },
    isSelected(node) {
        return this.selected.includes(node)
    }
  }
}
</script>


<style scoped>
  .pluslink, .pluslink:visited,.pluslink:hover,.pluslink:active {
    text-decoration:none;
    color : #000000;
  }

  .list-group-item {
    color: goldenrod;
    background-color: black;
    margin-bottom: 5px; 
  }

  .list-group-item.active {
    z-index: 2;
    color: goldenrod;
    background-color: #552b54;
    border-color: #552b54;
  } 

  .card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #000000;
    background-clip: border-box;
    border: 0px solid #000000;
    border-radius: 0.25rem;
    margin: 0%;
  }    

  .card.active {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #552b54;
    background-clip: border-box;
    border: 0px solid #552b54;
    border-radius: 0.25rem;
    margin: 0%;
  }

  .card-body {
    margin: 0%;
    padding: 0%;
  }

</style>

