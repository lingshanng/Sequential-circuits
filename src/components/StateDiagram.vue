<template>
  <div>
    <h2>State Diagram</h2>
    <div class="btn-group">
      <v-btn @click="reset">Reset</v-btn>
      <v-btn @click="random">Random</v-btn>
    </div>
    <div id="graph-box">
      <network
        id="graph"
        ref="network"
        :nodes="nodes"
        :edges="edges"
        :options="options"
        :key="networkKey"
      >
      </network>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputs", "tableData"],
  data: () => ({
    options: {
      nodes: {
        borderWidth: 2,
        color: {
          background: "white",
        },
        font: {
          face: "consolas",
          size: 20,
        },
      },
      edges: {
        arrows: "to",
        color: "red",
        font: {
          face: "consolas",
          size: 16,
        },
        chosen: {
          label: function (values, id, selected, hovering) {
            values.size = 20;
          },
        },
      },
      layout: {
        improvedLayout: true,
      },
      physics: {
        enabled: false,
      },
    },
    networkKey: 0, // for re-rendering component
  }),
  methods: {
    // resets to original position before user interaction
    reset() {
      this.options.layout.randomSeed = this.$refs.network.getSeed();
      this.networkKey += 1;
    },
    // changes layout randomly
    random() {
      this.options.layout.randomSeed = undefined;
      this.networkKey += 1;
    },
  },
  computed: {
    nodes() {
      var nodeArr = [];
      if (this.inputs === null) {
        return nodeArr;
      }
      var numNodes = Math.pow(2, this.inputs.flipflopList.length);
      for (var i = 0; i < numNodes; i++) {
        if (!this.inputs.unusedStateList.includes(i)) {
          nodeArr.push({ id: i, label: i.toString() });
        }
      }
      return nodeArr;
    },

    edges() {
      var edgeArr = [];
      if (this.inputs === null) {
        return edgeArr;
      }

      this.tableData.forEach((row) => {
        var hasLabel =
          this.inputs.inputList.length > 0 || this.inputs.outputList.length > 0;
        var label = "";
        if (hasLabel) {
          var inLabel = "";
          this.inputs.inputList.forEach((v) => {
            inLabel += row[v];
          });
          var outLabel = "";
          this.inputs.outputList.forEach((v) => {
            outLabel += row[v.name];
          });
          label = inLabel + "/" + outLabel;
        }
        var match = edgeArr.find(
          (e) => e.from === row.state && e.to === row.next
        );
        if (match !== undefined) {
          if (hasLabel) {
            match.label += ", " + label;
            // only 1 edge from v to w to avoid overlapping problem
          }
        } else {
          edgeArr.push({
            from: row.state,
            to: row.next,
            label,
          });
        }
      });
      return edgeArr;
    },
  },
};
</script>

<style scoped>
#graph {
  height: 600px;
  border: 2px solid black;
}
.btn-group {
  margin-top: 16px;
  margin-bottom: 16px;
}

.btn-group > * {
  margin-right: 16px;
}
</style>