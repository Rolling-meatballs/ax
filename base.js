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
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    //draw
    g.drawImage = function(peachImage) {
        g.context.drawImage(peachImage.image, peachImage.x, peachImage.y)
    }

    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    setInterval(function() {
        // event
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // if key was passdown, run register action
                g.actions[key]()
            }
        }
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

    game.registerAction('a', function() {
        paddle.moveLeft()
    })

    game.registerAction('d', function() {
        paddle.moveRight()
    })

    game.update = function() {
        // update x
        // log('update', Leftdown, Rightdown)
    }

    game.draw = function() {
        // draw
        game.drawImage(paddle)
    }

}

__main()