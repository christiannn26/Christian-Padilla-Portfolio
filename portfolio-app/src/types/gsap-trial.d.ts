declare module 'gsap-trial/SplitText' {
  export class SplitText {
    constructor(target: Element | string, vars?: any);
    chars: Element[];
    words: Element[];
    lines: Element[];
    revert(): void;
  }
}
