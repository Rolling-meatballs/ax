var log = console.log.bind(console)

var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')

var x = 100
var y = 200

var img = new Image()
img.src = 'paddle.png'
log(img)
img.onload = function(){
    context.drawImage(img, x, y)
}

var leftDown = fales
var rightDown = fales


// events
window.addEventListener('keydown', function(event){
    var k = event.key
    // log(event)
    if (k == 'a') {
        leftDown = true
    } else if (k == 'd') {
         rightDown = true
    }
})

window.addEventListener('keyup', function(event){
  var k = event.key


})

setInterval(function(){
  // update x and y
  if(leftDown) {
    x -= 10
  } else {
    x += 10
  }
  // draw
  context.clearRect(0, 0, canvas.clientWidth, canvas.height)
  context.drawImage(img, x, y)
}, 1000/30)
