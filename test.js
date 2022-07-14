try {
  throw new Error("I'm Evil");
  console.log("You'll never reach to me", 123465);
} catch (e) {
  console.log(e.name, e.message); // Error I'm Evil
}
