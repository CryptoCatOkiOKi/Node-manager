<template>
  <div class="hello">
    <b-list-group v-for="node in nodes" :key="node._id">
      <b-list-group-item 
      v-if="node.status === showActiveNodes()"
      id="node"
      button
      :class="{ active: isHoovered(node) }"      
      v-b-toggle="'node.name' + '-' + 'node.alias'"
      @click="doMouseClick(node)"
      @mouseover="doMouseOver(node)"
      @mouseleave="doMouseLeave()"        
      >
      {{ node.name }} {{ node.alias }}

      <div>
        <b-collapse id="node.name-node.alias" 
        v-if="isSelected(node)" 
        class="mt-1"
        >
          <b-card 
          :class="{ active: isHoovered(node) }"
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
  name: 'NonActivNodeList',
  props: {
    msg: { 
      type: String,
      default: 'Non-Active Nodes'
    }
  },
  data() {
    return {
      sysInfos: [],
      nodesCount: [],
      nodes: [],
      getinfo: 'Fetching data',
      hoovered: String,
      selected: []
    }
  },
  created: function() {
    this.fetchNodes()
  },
  methods: {
    fetchSysInfo() {
      const uri = 'http://167.86.97.235:3000/sysInfo'
      axios.get(uri).then(response => {
        this.sysInfos = response.data
      })      
    },
    fetchNodesCount() {
      const uri = 'http://167.86.97.235:3000/nodescount'
      axios.get(uri).then(response => {
        this.nodesCount = response.data
      })      
    },
      fetchNodes() {
      const uri = 'http://167.86.97.235:3000/nodes'
      axios.get(uri).then(response => {
        this.nodes = response.data
      })      
    },
    isHoovered(i) {
      return i === this.hoovered
    },
    showActiveNodes() {
      let i = false
      return i
    },
    testGetInfo(node) {
      this.getinfo = 'Fetching data'
      
      const uri = 'http://167.86.97.235:3000/getinfo?coin=' + node.name + '&alias=' + node.alias
       axios.get(uri).then(response => {
        let getInfoData = response.data
        // this.getinfo = getInfoData      
        this.getinfo = "Version: " + getInfoData.version + "<br>" +
        "Blocks: "  + getInfoData.blocks  + "<br>" +
        "Connections: "  + getInfoData.connections

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

