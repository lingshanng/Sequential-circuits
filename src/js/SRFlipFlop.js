import FlipFlop from "./FlipFlop.js";
export class SRFlipFlop extends FlipFlop {
  constructor(name, eqnS, eqnR) {
    super(name, "SR", eqnS, eqnR);
  }
}
