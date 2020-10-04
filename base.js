var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var Paddle = function() {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speed: 5,
    }
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }
    return o
}

var Ball = function() {
    var image = imageFromPath('ball.jpg')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 10,
        speedY: 10,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
        // log('fire')
    }
    o.move = function() {
        log('here is ball')
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    return o
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
