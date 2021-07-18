<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <div class="content-row">
          <div id="inputs">
            <InputForm @submit="onInputSubmit" />
          </div>
          <div id="instructions">
            <p>Instructions:</p>
          </div>
        </div>
        <!-- <div class="content-row"> -->
        <v-row>
          <v-col>
            <StateTable @change="onTableDataChange" :inputs="inputs" />
          </v-col>
          <v-col>
            <StateDiagram :inputs="inputs" :table-data="tableData" />
          </v-col>
        </v-row>
        <!-- </div> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import StateTable from "./components/StateTable";
import StateDiagram from "./components/StateDiagram";

export default {
  name: "App",
  components: {
    Header,
    InputForm,
    StateTable,
    StateDiagram,
  },
  data: () => ({
    inputs: null,
    tableData: [],
  }),
  methods: {
    onInputSubmit(inputs) {
      this.inputs = inputs;
      console.log(inputs);
      // console.log("inputs");
      /**
       * {
       * flipflopList: [{
       *  name: "",
       *  type: "",
       *  flipflop: "flipflop",
       *  eqn1: "",
       *  eqn1: ""
       * }],
       *
       * outputList: [{
       *  name: "",
       *  type: "",
       *  flipflop: "output",
       *  eqn1: "",
       *  eqn1: ""
       * }],
       *
       * inputList: ["x"]
       *
       * unusedStateList: [1,2,3]
       * }
       */
    },

    onTableDataChange(data) {
      this.tableData = data;
    },
  },
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 64px;
}

.content-row > * {
  width: 50%;
  margin-right: 64px;
}
</style>
