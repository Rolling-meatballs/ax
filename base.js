var log = console.log.bind(console)

var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')

var img = new Image()
img.src = 'paddle.png'
log(img)
img.onload = function(){
    context.drawImage(img, 100, 200)
}