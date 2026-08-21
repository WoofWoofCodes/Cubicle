game.stats = true

let currentPalette = hex`__palette`
function fadeToPalette(to: Buffer, steps: number) {
    control.runInParallel(() => {
        let curP = currentPalette.toArray(NumberFormat.UInt8LE)
        let change = curP.slice()
        curP.forEach((value, index) => {
            change[index] = (to[index] - currentPalette[index]) / steps
        })
        for (let n = 0; n < steps; n++) {
            for (let i = 0; i < currentPalette.length; i++) {
                curP[i] += change[i]
            }
            image.setPalette(Buffer.fromArray(curP))
            currentPalette = Buffer.fromArray(curP)
            pause(20)
        }
    }) 
}

let homeCubicle = img`
    11111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111
    111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111
    111eeeeeeeeeeeeeeeeeeeeeeeddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111
    111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffeeeffddddeeeeeeeeeeeeeeeeeeeeeeeeee111
    111eeeeedddddddeeeeeeeeeeeeeeeeeeffffeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeee111
    111eeeeeeeeeeeeeeeeeeeeeeeeeeeefffff1e1fffffeeeeeeeeeeeeeeddeeeeeeeeeee111
    111eeeeeeeeeeeddddeeeeeeffffeeffff11eee11ffffeeffffeeeedddddddddddddddd111
    111eeeeeeeeeeeeeeeeeeefffffcfffff1eeeeeee1fffffcfffffeeeeeeeeeeeeeeeeee111
    111eeeddddeeeeeeeeeeeffffccffff11eeeeeeeee11ffffccffffeeeeeeeeeeeeeeeee111
    111eeeeeeeeeeeeeeeeeefffcfffff1eeeeeeeeeeeee1fffffcfffeeeeeeeeedddeeeee111
    111eeeeeeeeeeeeeeeeeffccffff11feeeeeeeeeeeeef11ffffccffeeeeeeeeedeeeeee111
    111eeeeeeeeeeeeeeeeefcfffff1fffeeeeeeeeeeeeefff1fffffcfeeeddddddddddeee111
    111eeeeeeeeeeeeeeeeecffff11ffffeeeedddddddddffff11ffffceeeeeeddeeeeeeee111
    111deeeeeeeeeeeeeeefffff1ffffffeeeeeeeeeeeeeffffff1fffffeeeddeeeeeeeeee111
    111eeeeeeeeeeedddeffff11ffffffeeeeeeeeeeeeeeeffffff11ffffeeeeeeeeddeeee111
    111eeeeeeeedddddfffff1fffffffeeeeeeeeeeeeeeeeefffffff1fffffedddddeeeeee111
    111eeeeeeeeeeeeffff11eeffffeeeeeeeeeeeeeeeeeeeeeffffee11ffffeeeeeeeeeee111
    111eeeeeeeeeefffff1eeeeeddddfffffffffffffffffffeeedddddd1fffffeeeeeeeee111
    111eeeeeeeeeffff11eeeeeeeeeefbbfbfbfbfbfbfbfbbfeeeeeeeeee11ffffeeeddddd111
    111eeeeeeeeefff1eeeeeeeeeeeefffffffffffffffffffeeeeeeeeeeee1fffeeeeeeee111
    111eeeeeeeeeef1eeeeeeeeeeeeefbbbfbfbfbfbfbfbfbfeeeeeeeeeeeee1feeeeeeeee111
    111eeeedddeeeeeeeeeeeeeeeeeeffffffffffffffffbffddeeeeeeeeeeeeeeeeeeeeee111
    111eeeeeeeeeeeeeeeeeeeeeeeeefbfbfbfbbbbbfbfbbbfeeeeeeeeeeeeeedddeeeeeee111
    111eeeeeeeffffffffffeeeeecccccccccffffffffcccccccccccccccccbccccccccccc111
    111eeeeeeefffffffffffeeeeccbcccccffffffffffccccccccbccccccccccccccccccc111
    111eeeeeeeffffffffffeeeeecccffccffffffffffffccffccccccccccccccccccccccc111
    111eeeeeeeeeeeedddeeeeeeeccffffcffffffffffffcffffcccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeeccffffcffffffffffffcffffcccccccccccccccccbcccc111
    111eeeeeeeeeeeeeeddeeeeeeccffffcffffffffffffcffffcccccbcccccccccccccccc111
    111ddddde111111111111ddddccffffcffffffffffffcffffcccccccccccccccccccccc111
    111eeeeee111111111111eeeeccffffffffffffffffffffffcccccccccccbcccccccccc111
    111eeeeee111111111111eeeeccffffffffffffffffffffffcccccccccccccccccccccc111
    111eeeedd111111111111eeeeccffffcffffffffffffcffffcccccccccccccccccccccc111
    111eeeeee111111111111eeeeccffffcffffffffffffcffffccccccccccbccccccccccc111
    111eeeeee111111111111eeeeccffffccffffffffffccffffcccccccccccccccccccccc111
    111eeeeee111111111111deeecbcffccccccffffbcccccffccccccccccccccccccccccc111
    111eeeeee111111111111ddeecccccccffffffffffffccccccccccccccccccccccccccc111
    111eeeeeeeedddddddddddeeecccccffffffffffffffffccbcccccccccccccccccccccc111
    111eeeeeeedddddddddddeeeeccccffffffffffffffffffcccccccccccccccccccbcccc111
    111eeeeeedddddddddddeeeeeccccffffffffffffffffffcccccccccccccccccccccccc111
    111eeeeeeedddddddddeeeeeecccccffffffffffffffffccccccccbccccccccccbccccc111
    111dddeeeeedddddddeddddeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeedddddeeeeeeeecccccccccccbcccccccccccccbcccccccccccccccccccc111
    111eeeeeeeeeedddeeeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeedeeeeeeddddcccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeeccccccccccccccccccccccccccccccccccccccccccccbc111
    111eeeeeeeeeeeeeeeeeeeeeeccccccbccbccccccccbccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecbcccccccccccccccccccccccccccbccccccbccccccccc111
    111eeeddddddddddeeeeeeeeecccccccccccccccccccccccbcccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeedddcccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecccccbcccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeddddddeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeddeeeeeeeeecccccccccccccccccbcccccccccbcccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecbccccccccbccccccccccccccccccccccccccccccbcccc111
    111eeeeeeedddddeeeeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111ddeeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111ddddeeeeeeeeeddddddeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeeccccccccccccccccccccccccccccccccccbccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecccccccccbcccccccccbccccccccbccccccccccccccccc111
    111eeeeeddddddeeeeeeeeeedcccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccbcccccccccccb111
    111eeeeeeeeeddddddddddeeecccccccccccccccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeeccccccccccccccccbccccccccccccccccccccccccccccc111
    111eeddddddddddeeeeeeeeeeccccccbccccccccccccccccccccbccccccccccccbccccc111
    111eeeeeeeeeeeeeeeeeeeeeeccccccccccccbccccccccccccccccccccccccccccccccc111
    111eeeeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccccccccccccc111
    1111111111111111111111111cccccccccccccccccccccccc1111111111111111111111111
    1111111111111111111111111f11111111111111111111111f111111111111111111111111
    1111111111111111111111111f11111111111111111111111f111111111111111111111111
`
let baseCubicle = img`
    111111111111111111111111f11111111111111111111111f1111111111111111111111111
    111111111111111111111111f11111111111111111111111f1111111111111111111111111
    1111111111111111111111111cccccccccccccccccccccccc1111111111111111111111111
    111cccccccccccccccccccccccccccccccccccbcccccccccccccccccccccccccccccccc111
    111cccccccccccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccb111
    111cccccbccccccccccccccccccbccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccbcccccccccccbcccccccccccccccccccccc111
    111ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccbccccccccccccccccccccccccccccccccccccccccccbccccc111
    111ccccccccccbcccccccccccccccccccccccccccccccccccccccccccbccccccccccccc111
    111cccccccccccccccccccccccccccbcccccccccccccccccccccccccccccccccccccccc111
    111bcccccccccccccccccccccccccccccccbcccccccbccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccccccc111
    111cccccccccccccccccccbcccccccccccccccccccccccccccccccccccccccccbcccccc111
    111ccccccbccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccc111
    111cccccccccccccccccccccbcccccccccccccbcccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccbccccbcccccccccccbccccccccccccccccccccccc111
    111ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbc111
    111ccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccc111
    111cccccccccccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1ff
    ffcccccccccccccccccccccccccccccccccccccbcccccccccccccccccccccccccccccccc11
    11cccccccccccccccccccccccccbcccccccccccccccccccccccbcccccccccccccccccccc11
    11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11ccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11cccccccccccccccccccbcccccccccccccccccccccbccccccccccccccccccccccbccccc11
    11ccbcccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccccccccc11
    11ccccccccccccccbccccccccccccccccccbcccccccccccccccccccccccccccccccccccc11
    11ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccc11
    11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccc11
    11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11ccccccbcccccccccccccccccbcccccccccccccbccccccccccccccccccccccccccccccc11
    11ccccccccccccccccccccbcccccccccccbccccccccccccccccccccccccccccccccccccc11
    11ccccccccccccccccccccccccccccccccccccccccccccccbccccccccccccccccccccccc11
    11cccccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccbccccc11
    11ccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11ccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccbcccccc11
    11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11ccccccccccccccccccccccccccccccccccbcccccccccccccbccccccccccccccccccccc11
    11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11ccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11
    11ccccccccccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccbcc11
    11cccccccccccccccccccccccccccccbccbccccccccbccccccccccccccccccccccccccccff
    ff1cccccccccccccccccccccccbcccccccccccccccccccccccccccbccccccbccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111ccccbcccccccccccbccccccccccbcccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccbcccccccccccccccccccccccccccccbcccccccccbcccccccccccccccccc111
    111cccccccccccccccccccccccbccccccccbccccccccccccccccccccccccccccccbcccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111ccccccbcccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccc111
    111cccccccccccccccccccccccccccccccbcccccccccbccccccccbccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccb111
    111bcccccccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111ccccccccccccccccccccccccccccccccccccccbccccccccccccccccccccccccccccc111
    111ccccccccccccccccccccccccccccbccccccccccccccccccccbccccccccccccbccccc111
    111ccccccccccccccccccccccccccccccccccbccccccccccccccccccccccccccccccccc111
    111cccccccccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    1111111111111111111111111cccccccccccccccccccccccc1111111111111111111111111
    1111111111111111111111111f11111111111111111111111f111111111111111111111111
    1111111111111111111111111f11111111111111111111111f111111111111111111111111
`
let doorsOpenCubicle = img`
    .
`



const palette1 = currentPalette.slice()
palette1.fill(0, 0, 24)
const palette2 = currentPalette.slice()
palette2.shift(24)


//fadeToPalette(palette1, 100)
//pause(20 * 100)
//fadeToPalette(palette2, 100)

let player = img`
    ....................
    ....................
    ....................
    ....................
    ....222222222222....
    ....2..5.....5.2....
    ....2..5.....5.2....
    ....2..5.......2....
    ....2..........2....
    ....2..........2....
    ....2..........2....
    ....25.........2....
    ....2.55.......2....
    ....2...5555.552....
    ....2.......55.2....
    ....222222222222....
    ....................
    ....................
    ....................
    ....................
`
let playerX = 80
let playerY = 60

scene.createRenderable(0, (target) => {
    target.drawImage(homeCubicle, (160 - 74) / 2, (120 - 74) / 2)
})

enum Direction {
    North,
    East,
    South,
    West
}

enum CubicleType {
    Home,
    Normal,
    Static,
    Hole,
    Juicy,
    Empty, // No doors?
    Dark,
    JackInTheBox, // Pop goes the weasle plays, if you're still in the room when it finishes you... pop...
    Stairs, // must go down 3 flights of stairs before the exit becomes a possible cubicle type
    Exit, // ?
}

class cubicle {
    north: cubicle
    south: cubicle
    east: cubicle
    west: cubicle
    constructor(type: CubicleType, public parent: cubicle, public parentDir: Direction, ) {
        
    }
}