const useRoundedRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 0,
  top_left?: boolean,
  top_right?: boolean,
  bottom_left?: boolean,
  bottom_right?: boolean
) => {
  var retval;
  retval = "M" + (x + radius) + "," + y;
  retval += "h" + (width - 2 * radius);
  if (top_right) {
    retval += "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius;
  } else {
    retval += "h" + radius;
    retval += "v" + radius;
  }
  retval += "v" + (height - 2 * radius);
  if (bottom_right) {
    retval += "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius;
  } else {
    retval += "v" + radius;
    retval += "h" + -radius;
  }
  retval += "h" + (2 * radius - width);
  if (bottom_left) {
    retval += "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius;
  } else {
    retval += "h" + -radius;
    retval += "v" + -radius;
  }
  retval += "v" + (2 * radius - height);
  if (top_left) {
    retval += "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius;
  } else {
    retval += "v" + -radius;
    retval += "h" + radius;
  }
  retval += "z";
  return retval;
};

export { useRoundedRect };
