var Block = function(position) {
    // The form of position is [0, 0]
    var p = position
    var image = imageFromPath('block.jpg')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 60,
        h: 20,
        alive: true,
        lifes: p[2] || 1,
    }
    o.kill = function() {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = function(b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
        }
    return o
}
