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
        y: 250,
        speed: 15,
    }
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}

var Ball = function() {
    var image = imageFromPath('ball.jpg')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 6,
        speedY: 6,
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
    o.back = function() {
        o.speedY *= -1
    }
    return o
}

var rectIntersects = function(o, b) {
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

var Block = function() {
    var image = imageFromPath('block.jpg')
    var o = {
        image: image,
        x: 100,
        y: 100,
        w: 60,
        h: 20,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }
    o.collide = function(b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
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
    }, 1000/60)

    return g
}


var __main = function() {
    var game = PeachGame()
    var paddle = Paddle()
    var ball = Ball()

    var blocks = []
    for (let i = 0; i < 3; i++) {
        var b = Block()
        // set block seat
        b.x = i * 150
        b.y = 60
        blocks.push(b)
    }

    var Rightdown = false
    var Leftdown = false

    game.registerAction('a', function() {
        paddle.moveLeft()
    })

    game.registerAction('d', function() {
        paddle.moveRight()
    })

    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        // update x
        ball.move()
        // for interface
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
        // judge ball and blocks interface
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.collide(ball)) {
                log('block interface')
                block.kill()
                ball.back()
            }
        }
        
    }

    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw block
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.alive) {
                game.drawImage(block)
            }
        }
        
    }

}

__main()