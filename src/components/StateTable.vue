<template>
  <div>
    <h2>State Table</h2>
    <v-data-table
      id="state-table"
      :headers="headers"
      :items="items"
      :disable-sort="true"
      height="850"
      fixed-header
      hide-default-footer
      disable-pagination
    ></v-data-table>
  </div>
</template>

<script>
export default {
  props: ["inputs"],

  computed: {
    headers() {
      let headers = [];

      if (this.inputs === null) {
        return headers;
      }
      let ffNames = this.inputs.flipflopList.map((v) => v.name);
      let outputNames = this.inputs.outputList.map((v) => v.name);
      let allVars = ["state"];
      allVars = allVars.concat(ffNames);
      allVars = allVars.concat(this.inputs.inputList);
      allVars = allVars.concat(outputNames);
      this.inputs.flipflopList.forEach((v) => {
        Array.from(v.flipflop).forEach((f) => {
          allVars.push(f + v.name);
        });
      });
      allVars = allVars.concat(ffNames.map((v) => v + "+"));
      allVars.push("next");
      allVars.forEach((v) => {
        headers.push({ text: v, value: v });
      });

      return headers;
    },

    boolVars() {
      return this.inputs === null
        ? []
        : this.inputs.flipflopList
            .map((v) => v.name)
            .concat(this.inputs.inputList);
    },

    items() {
      let rows = [];
      if (this.inputs === null) {
        return rows;
      }
      const binLen = this.boolVars.length;
      // Generate Binary Combinations
      const binary = [];
      for (let i = 0; i < Math.pow(2, binLen); i++) {
        let row = [];
        for (let j = 0; j < binLen; j++) {
          row[j] = Math.floor(i / Math.pow(2, binLen - j - 1)) % 2;
        }
        binary.push(row);
      }

      for (var i = 0; i < Math.pow(2, binLen); i++) {
        let row = {};
        var rowBin = "";
        // binary digits
        for (var j = 0; j < binLen; j++) {
          row[this.boolVars[j]] = binary[i][j];
          rowBin += binary[i][j];
        }

        row.state = parseInt(
          rowBin.substring(0, binLen - this.inputs.inputList.length),
          2
        );

        if (this.inputs.unusedStateList.includes(row.state)) {
          // skip this row if curr state is unused
          continue;
        }

        // output
        this.inputs.outputList.forEach((d) => {
          // console.log(row["A"])
          row[d.name] = this.evaluate(d.eqn1, Object.keys(row), row);
        });
        // flipflop inputs
        this.inputs.flipflopList.forEach((d) => {
          let eqns = [d.eqn1, d.eqn2];
          Array.from(d.flipflop).forEach((f, i) => {
            row[f + d.name] = this.evaluate(eqns[i], Object.keys(row), row);
          });
        });

        var nextState = "";
        // next state
        this.inputs.flipflopList.forEach((d) => {
          var value = this.evaluate(this.getEqn(d), Object.keys(row), row);
          row[d.name + "+"] = value;
          nextState += value;
        });

        row.next = parseInt(nextState, 2);
        if (this.inputs.unusedStateList.includes(row.next.toString())) {
          // skip this row if next state is unused
          continue;
        }
        rows.push(row);
      }

      return rows;
    },
  },

  methods: {
    evaluate(eqn, variables, data) {
      variables = variables.reverse();
      variables.forEach((v) => {
        eqn = eqn.replace(new RegExp(v, "g"), data[v]);
      });
      // console.log(eqn);
      return this.solve(eqn);
    },
    solve(eqn) {
      while (eqn.indexOf("(") !== -1) {
        let start = eqn.lastIndexOf("(");
        let end = eqn.indexOf(")", start);
        if (start !== -1)
          eqn =
            eqn.substring(0, start) +
            this.solve(eqn.substring(start + 1, end)) +
            eqn.substring(end + 1);
      }
      eqn = eqn.replace(/''/g, "");
      eqn = eqn.replace(/0'/g, "1");
      eqn = eqn.replace(/1'/g, "0");
      eqn = eqn.replace(/\./g, "*");

      try {
        let safeEval = eval;
        let answer = safeEval(eqn);
        if (answer === 0) return 0;
        if (answer > 0) return 1;
        return "";
      } catch (e) {
        // console.log(eqn, e);
        return "";
      }
    },

    getEqn(data) {
      switch (data.flipflop) {
        case "JK":
          var eqn = "J.Q' + K'.Q";
          eqn = eqn.replace(/J/g, "J" + data.name);
          eqn = eqn.replace(/K/g, "K" + data.name);
          eqn = eqn.replace(/Q/g, data.name);
          return eqn;

        case "SR":
          var eqn = "S + R'.Q";
          eqn = eqn.replace(/S/g, "S" + data.name);
          eqn = eqn.replace(/R/g, "R" + data.name);
          eqn = eqn.replace(/Q/g, data.name);
          return eqn;

        case "D":
          return "D" + data.name;

        case "T":
          var eqn = "T.Q' + T'.Q";
          eqn = eqn.replace(/T/g, "T" + data.name);
          eqn = eqn.replace(/Q/g, data.name);
          return eqn;
        default:
          return "0";
      }
    },
  },

  watch: {
    items: {
      immediate: true,
      handler(value) {
        this.$emit("change", value);
      },
    },
  },
};
</script>

<style scoped>
#state-table {
  width: 100%;
  font-family: Consolas, monaco, monospace;
}
</style>