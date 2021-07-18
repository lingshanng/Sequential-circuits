<template>
  <div class="input-form">
    <div class="header-row">
      <h2>Circuit Information</h2>
    </div>
    <div class="header-row">
      <h3>Flip Flops</h3>
      <v-btn @click="addFlipFlop">+ Add</v-btn>
    </div>
    <v-list>
      <ListItemInput
        v-for="(input, i) in flipflopList"
        :key="i"
        :value="input"
        @input="onFlipFlopUpdate(i, $event)"
        @delete="onFlipFlopDelete"
      />
    </v-list>
    <div class="header-row">
      <h3>Outputs</h3>
      <v-btn @click="addOutput">+ Add</v-btn>
    </div>

    <v-list>
      <ListItemInput
        v-for="(input, i) in outputList"
        :key="i"
        :value="input"
        @input="onOutputUpdate(i, $event)"
        @delete="onOutputDelete"
      />
    </v-list>

    <div class="bottom-row">
      <div>
        <h3>Inputs</h3>
        <v-text-field
          class="input-box"
          v-model="inputsText"
          outlined
          dense
        ></v-text-field>
      </div>
      <div>
        <h3>Unused States</h3>
        <v-text-field
          class="input-box"
          v-model="unusedText"
          outlined
          dense
        ></v-text-field>
      </div>
    </div>
    <!-- <v-btn @click="addNewInput">+ ADD</v-btn> -->
    <div>
      <v-btn class="primary" @click="onSubmit">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import ListItemInput from "./ListItemInput.vue";

export default {
  name: "InputForm",
  components: {
    ListItemInput,
  },
  data: () => ({
    inputsText: "",
    unusedText: "",
    flipflopList: [],
    outputList: [],
  }),

  methods: {
    addFlipFlop() {
      this.flipflopList.push({
        name: "",
        type: "flipflop",
        flipflop: "",
        eqn1: "",
        eqn2: "",
      });
    },
    addOutput() {
      this.outputList.push({
        name: "",
        type: "output",
        flipflop: "",
        eqn1: "",
        eqn2: "",
      });
    },
    onFlipFlopUpdate(index, input) {
      this.$set(this.flipflopList, index, input);
    },
    onOutputUpdate(index, input) {
      this.$set(this.outputList, index, input);
    },
    onFlipFlopDelete(input) {
      this.flipflopList = this.flipflopList.filter((inp) => inp !== input);
    },
    onOutputDelete(input) {
      this.outputList = this.outputList.filter((inp) => inp !== input);
    },
    getUnusedStates(s) {
      return s
        .split(",")
        .filter((v) => v !== "")
        .reduce((acc, x) => {
          var range = x.split("-");
          for (
            var i = parseInt(range[0], 10);
            i <= parseInt(range[range.length - 1], 10);
            i++
          ) {
            acc.push(i);
          }
          return acc;
        }, []);
    },
    onSubmit() {
      this.$emit("submit", {
        flipflopList: this.flipflopList,
        outputList: this.outputList,
        inputList: this.inputsText.split(",").filter((v) => v !== ""),
        unusedStateList: this.getUnusedStates(this.unusedText),
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.header-row {
  display: flex;
  align-items: center;
  text-align: center;
}

.header-row > * {
  margin-right: 16px;
  margin-bottom: 8px;
}

.bottom-row {
  display: flex;
}

.bottom-row > div {
  width: 50%;
  margin-right: 32px;
}

.input-box {
  font-family: Consolas, monaco, monospace;
}
</style>