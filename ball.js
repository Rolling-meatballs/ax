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