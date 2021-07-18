<template>
  <v-list-item class="input-row">
    <v-btn class="delete-btn" @click="$emit('delete', value)" plain icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-text-field
      class="short-input"
      label="Name"
      @input="onNameInput"
      v-model="name"
      outlined
      dense
      hint="do this"
    ></v-text-field>
    <!-- <p class="name-label">{{ name }}</p> -->

    <v-select
      v-if="type == 'flipflop'"
      :items="flipFlopOptions"
      class="short-input"
      label="Flip-flop"
      :menu-props="{ offsetY: true }"
      v-model="flipflop"
      @input="onFFInput"
      outlined
      dense
    ></v-select>
    <div class="eqns">
      <v-text-field
        class="long-input"
        :label="labelEqn1"
        :disabled="disableEqn1"
        v-model="eqn1"
        @input="onEqn1Input"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        v-if="type === 'flipflop' && !disableEqn2"
        class="long-input"
        :label="labelEqn2"
        v-model="eqn2"
        @input="onEqn2Input"
        outlined
        dense
      ></v-text-field>
    </div>
  </v-list-item>
</template>

<script>
export default {
  name: "ListItemInput",
  props: ["value"],

  data: () => ({
    flipFlopOptions: ["D", "T", "SR", "JK"],
    name: "",
    type: "",
    flipflop: "",
    eqn1: "",
    eqn2: "",
  }),

  computed: {
    disableEqn1() {
      return this.flipflop === "" && !(this.type === "output");
    },

    disableEqn2() {
      return !(this.flipflop === "SR" || this.flipflop === "JK");
    },

    labelEqn1() {
      return this.disableEqn1
        ? "---"
        : this.type === "output"
        ? "Output equation"
        : this.flipflop.charAt(0) + " equation";
    },

    labelEqn2() {
      return this.disableEqn2 ? "---" : this.flipflop.charAt(1) + " equation";
    },
  },

  methods: {
    onNameInput(name) {
      this.name = name;
      this.emitInput();
    },
    onFFInput(ff) {
      this.flipflop = ff;
      this.emitInput();
    },

    onEqn1Input(eqn) {
      this.eqn1 = eqn;
      this.emitInput();
    },

    onEqn2Input(eqn) {
      this.eqn2 = eqn;
      this.emitInput();
    },

    emitInput() {
      this.$emit("input", {
        name: this.name,
        type: this.type,
        flipflop: this.flipflop,
        eqn1: this.eqn1,
        eqn2: this.eqn2,
      });
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.name = val.name;
        this.type = val.type;
        this.flipflop = val.flipflop;
        this.eqn1 = val.eqn1;
        this.eqn2 = val.eqn2;
      },
    },

    disableEqn2() {
      this.eqn2 = "";
      this.emitInput();
    },
  },
};
</script>

<style lang="stylus" scoped>
.input-row {
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0px;
  margin-top: 8px;
  font-family: Consolas, monaco, monospace;
}

.short-input {
  margin-right: 16px;
  width: 5%;
}

.eqns {
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.long-input {
  margin-right: 16px;
}

.delete-btn {
  width: 5%;
}
</style>