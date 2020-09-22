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

var PeachGame = function() {
    var g = {}
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context

    setInterval(function() {
        //update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.clientWidth, canvas.height)
        // draw
        g.draw()
    }, 1000/30)

    return g
}


var __main = function() {
    var game = PeachGame()
    var paddle = Paddle()

    var Rightdown = false
    var Leftdown = false

    // events
    window.addEventListener('keydown', function(event){
        var k = event.key
        log('keydown')
        if (k == 'a') {
            Rightdown = true
        } else if (k == 'd') {
            Leftdown = true
        }
    })

    // events
    window.addEventListener('keyup', function(event){
        var k = event.key
        log('keyup')
        if (k == 'a') {
            Rightdown = false
        } else if (k == 'd') {
            Leftdown = false
        }
    })

    game.update = function() {
        // update x
        // log('update', Leftdown, Rightdown)
        if (Leftdown) {
            paddle.moveLeft()
        } else if (Rightdown) {
            paddle.moveRight()
        }
    }

    game.draw = function() {
        // draw
        game.context.drawImage(paddle.image, paddle.x, paddle.y)
    }

}

__main()