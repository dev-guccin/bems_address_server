const toBytesInt32 = (num) => {
  const arr = new ArrayBuffer(4);
  const view = new DataView(arr);
  view.setFloat32(0, num, false);
  console.log(arr);
  return arr;
};

toBytesInt32(10);
