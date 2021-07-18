import FlipFlop from "./FlipFlop.js";
export class JKFlipFlop extends FlipFlop {
  constructor(name, eqnJ, eqnK) {
    super(name, "JK", eqnJ, eqnK);
  }
}
