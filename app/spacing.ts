const BASE_SIZE = 8;

export default function spacing(...args: number[]) {
  if (!args.length) {
    return '0px';
  } else if (args.length <= 4) {
    return args.map((multiplier) => `${multiplier * BASE_SIZE}px`).join(' ');
  } else {
    console.error('[spacing] invalid spacing args provided: ' + args);
  }
}
