var PeachGame = function(fps) {
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
    }, 1000/fps)

    return g
}