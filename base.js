var loadLevel = function(n) {
    n = n -1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(enable) {
    if(!enable) {
        return 
    }
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // stop function
            paused = !paused
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(Number(k))
        }
    })
}

var __main = function() {
    enableDebugMode(true)
    var game = PeachGame(30)
    var paddle = Paddle()
    var ball = Ball()

    var blocks = loadLevel(1)

    var paused = false

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
        // paused
        if (paused) {
            return 
        }
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