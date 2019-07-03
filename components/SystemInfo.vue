<template>
  <div class="hello">
    <div>
      <b-list-group v-for="sysInfo in sysInfos" :key="sysInfo._id">
        <!-- <nuxt-link to="/freespace" class="pluslink">
            <b-list-group-item class="d-flex justify-content-between align-items-center"  
              button
              :class="{ active: isSelected(1) }"
              @mouseover="selected=1"
              @mouseleave="selected=0"
            >
              System Info 
              <b-badge variant="primary" pill> {{sysInfo.num_free_nodes_memory}}</b-badge>
            </b-list-group-item>
          </nuxt-link> -->

        <b-list-group-item id="system-info">
          Currently running nodes: {{ sysInfo.runnig_nodes }} <br />
          Total CPU%: {{ sysInfo.total_cpu }}%<br />
          Average CPU%: {{ sysInfo.average_cpu }}% per node<br />
          Total memory: {{ sysInfo.total_memory_mb }} Mb<br />
          Average memory: {{ sysInfo.average_memory_mb }} Mb per node<br />
          Free memory: {{ sysInfo.free_memory_mb }} Mb<br />
          <b
            >Free memory for approx. {{ sysInfo.num_free_nodes_memory }} new
            nodes<br />
            Free CPU for approx. {{ sysInfo.num_free_nodes_cpu }} new nodes<br
          /></b>
        </b-list-group-item>

        <nuxt-link
          :to="{ name: 'active', params: { activeNodes: true } }"
          class="pluslink"
        >
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            button
            :class="{ active: isSelected(2) }"
            @mouseover="selected = 2"
            @mouseleave="selected = 0"
          >
            Active
            <b-badge
              v-for="nodeCount in nodesCount"
              :key="nodeCount._id"
              variant="success"
              pill
            >
              {{ nodeCount.active }}
            </b-badge>
          </b-list-group-item>
        </nuxt-link>

        <nuxt-link
          :to="{ name: 'nonactive', params: { activeNodes: false } }"
          class="pluslink"
        >
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            button
            :class="{ active: isSelected(3) }"
            @mouseover="selected = 3"
            @mouseleave="selected = 0"
          >
            Non Active
            <b-badge
              v-for="nodeCount in nodesCount"
              :key="nodeCount._id"
              variant="danger"
              pill
            >
              {{ nodeCount.notactive }}
            </b-badge>
          </b-list-group-item>
        </nuxt-link>

        <nuxt-link
          v-if="nodesPhantomCount > 0"
          :to="{ name: 'phantom' }"
          class="pluslink"
        >
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            button
            :class="{ active: isSelected(4) }"
            @mouseover="selected = 4"
            @mouseleave="selected = 0"
          >
            Phantom
            <b-badge variant="danger" pill>
              {{ nodesPhantomCount }}
            </b-badge>
          </b-list-group-item>
        </nuxt-link>
      </b-list-group>
    </div>
  </div>
</template>

<script>
// VRZI VEN VSO BALASTNO KODO IN IZ NODELIST.VUE TUDI!!
import axios from 'axios'
export default {
  name: 'SystemInfo',
  props: {
    msg: {
      type: String,
      default: 'System Informations'
    },
    selected: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sysInfos: [],
      nodesCount: [],
      nodesPhantomCount: 0
    }
  },
  created: function() {
    this.fetchSysInfo()
    this.fetchNodesCount()
    this.fetchPhantomNodesCount()
  },
  methods: {
    fetchSysInfo() {
      const uri = process.env.baseUrl + '/sysInfo'
      axios.get(uri).then(response => {
        this.sysInfos = response.data
      })
    },
    fetchNodesCount() {
      const uri = process.env.baseUrl + '/nodescount'
      axios.get(uri).then(response => {
        this.nodesCount = response.data
      })
    },
    fetchPhantomNodesCount() {
      const uri = process.env.baseUrl + '/phantomcoins'
      axios.get(uri).then(response => {
        this.nodesPhantomCount = response.data.length
      })
    },
    isSelected(i) {
      return i === this.selected
    }
  }
}
</script>

<style scoped>
.pluslink,
.pluslink:visited,
.pluslink:hover,
.pluslink:active {
  text-decoration: none;
  color: #000;
}

.list-group-item {
  color: goldenrod;
  background-color: rgb(0, 0, 0);
  margin-bottom: 5px;
}

.list-group-item.active {
  z-index: 2;
  color: goldenrod;
  background-color: #552b54;
  border-color: #552b54;
}

#system-info {
  text-align: left;
}
</style>
