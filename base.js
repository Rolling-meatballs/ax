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

// events
window.addEventListener('keydown', function(event){
    var k = event.key
    // log(event)
    if (k == 'a') {
        x -= 5
        context.clearRect(0, 0, canvas.clientWidth, canvas.height)
        context.drawImage(img, x, y)
    } else if (k == 'd') {
        x += 5
        context.clearRect(0, 0, canvas.clientWidth, canvas.height)
        context.drawImage(img, x, y)
    }
})