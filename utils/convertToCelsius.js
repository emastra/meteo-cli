module.exports = (f) => {
  // var x;
  // if (degree == "C") {
  //   x = document.getElementById("c").value * 9 / 5 + 32;
  //   document.getElementById("f").value = Math.round(x);
  // } else {
  //   x = (document.getElementById("f").value -32) * 5 / 9;
  //   document.getElementById("c").value = Math.round(x);
  // }
  return Math.round((f -32) * 5 / 9);
}
