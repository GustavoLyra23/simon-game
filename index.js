$(document).keypress(function (event) {
  if ($("h1").text() === "Press a key to Start") {
    $("h1").text("Level 1");
  } else {
    console.log(event.key);
  }
});

//random para selecionar um quadrado e criar a sequencia
function selectOneSquare() {
  return Math.floor(Math.random() * 4) + 1;
}
