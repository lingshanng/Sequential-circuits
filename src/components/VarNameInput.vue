<template>
  <div>
    <div class="input-row">
      <v-text-field
        label="Variables"
        outlined
        v-model="variables"
      ></v-text-field>
      <v-text-field label="Inputs" outlined v-model="inputs"></v-text-field>
      <v-text-field label="Outputs" outlined v-model="outputs"></v-text-field>

      <v-text-field
        label="Unused States"
        outlined
        v-model="unused"
      ></v-text-field>
    </div>
    <v-btn @click="onUpdate">Update</v-btn>
  </div>
</template>

<script>
export default {
  name: "VarNameInput",
  data: () => ({
    variables: "",
    inputs: "",
    outputs: "",
    unused: "",
  }),
  methods: {
    onUpdate() {
      this.$emit("update", {
        variables: this.variables.split(",").filter((v) => v !== ""),
        inputs: this.inputs.split(",").filter((v) => v !== ""),
        outputs: this.outputs.split(",").filter((v) => v !== ""),
        unused: this.getUnused(),
      });
    },
    getUnused() {
      return this.unused
        .split(",")
        .filter((v) => v !== "")
        .reduce((acc, x) => {
          var arr = [];
          var v = x.split("-");
          if (v.length !== 0) {
            for (
              var i = parseInt(v[0], 10);
              i <= parseInt(v[v.length - 1], 10);
              i++
            ) {
              arr.push(i);
            }
          }
          return acc.concat(arr);
        }, []);
    },
  },
};
</script>

<style scoped>
.input-row {
  margin-top: 16px;
  display: flex;
  flex-direction: row;
}
.input-row > * {
  margin-right: 16px;
}
</style>