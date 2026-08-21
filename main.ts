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
    1111111111111111111111111ccc1c11cc11cc111cc11cccc1111111111111111111111111
    1111111111111111111111111f11111111111111111111111f111111111111111111111111
    1111111111111111111111111f11111111111111111111111f111111111111111111111111
`
let baseCubicle = img`
    11111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111
    111ccccccccccccccccccccc1cccccccccccccbcccccccccc1ccccccccccccccccccccc111
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
    111c1ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111
    111ccccccccccccccccccccccccccccccccccccbccccccccccccccccccccccccccccccc111
    111ccccccccccccccccccccccccbcccccccccccccccccccccccbccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111ccccccccccccccccccbcccccccccccccccccccccbccccccccccccccccccccccbcccc111
    111cbcccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccc111
    111cccccccccccccbccccccccccccccccccbccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccbcccccccccccccccccbcccccccccccccbcccccccccccccccccccccccccccccc111
    111cccccccccccccccccccbcccccccccccbcccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccccccc111
    111ccccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccbcccc111
    111cccccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccbccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccbcccccccccccccbcccccccccccccccccccc111
    111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111
    111cccccccccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccbc111
    111ccccccccccccccccccccccccccccbccbccccccccbccccccccccccccccccccccccccc111
    1111ccccccccccccccccccccccbcccccccccccccccccccccccccccbccccccbcccccccc1111
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
    111cccccccccccccbccccccc1cccccccccccccccccccccccc1ccccccccccccccccccccc111
    11111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111
`
let doorClosedNorth = img`
    111111111111111111111111f11111111111111111111111f1111111111111111111111111
    111111111111111111111111f11111111111111111111111f1111111111111111111111111
    1111111111111111111111111cccccccccccccccccccccccc1111111111111111111111111
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
`
let doorOpenNorth = img`
    111111111111111111111111fcccccccccccccccccccccccc1111111111111111111111111
    111111111111111111111111fcccccccccccccccccccccccc1111111111111111111111111
    1111111111111111111111111cccccccccccccccccccccccc1111111111111111111111111
    .........................1................................................
    ........................111...............................................
    .......................1111...............................................
    ......................1111................................................
    .....................1111.................................................
    ....................1111..................................................
    ...................1111...................................................
    ..................1111....................................................
    .................1111.....................................................
    ................1111......................................................
    ...............1111.......................................................
    ..............1111........................................................
    .............1111.........................................................
    ............1111..........................................................
    ...........1111...........................................................
    ..........1111............................................................
    ..........f11.............................................................
    ...........f..............................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
    ..........................................................................
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
let playerX = 0
let playerY = 0
let playerSpeed = 0.8
let playerChangingRooms = 0 // 0: false, 1: horizontal door, 2: vertical door

let currentCubicle: cubicle

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
    Elevator, // must go down 3 elevators before the exit becomes a possible cubicle type
    Exit, // ?
}

let stairCount = 0 

class cubicle {
    image: Image

    north: cubicle
    south: cubicle
    east: cubicle
    west: cubicle
    northDoorOpen = false
    eastDoorOpen = false
    southDoorOpen = false
    westDoorOpen = false
    expanded = false
    type: CubicleType

    constructor(public parent: cubicle, public parentDir: Direction) {
        this.type = randint(1, (stairCount > 2) ? CubicleType.Exit : CubicleType.Elevator)
        this.updateImage()
    }

    render(target: Image, dir: number) {
        
        let offsetX = 0
        let offsetY = 0
        switch (dir) {
            case (1): 
                offsetY = -71
                break
            case (2): 
                offsetX = 71
                break
            case (3): 
                offsetY = 71
                break
            case (4): 
                offsetX = -71
                break
        }

        target.drawImage(this.image, (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)

        if (this.northDoorOpen) target.drawTransparentImage(doorOpenNorth, (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)
        if (this.eastDoorOpen) target.drawTransparentImage(doorOpenNorth.rotated(90), (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)
        if (this.southDoorOpen) target.drawTransparentImage(doorOpenNorth.rotated(180), (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)
        if (this.westDoorOpen) target.drawTransparentImage(doorOpenNorth.rotated(270), (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)

        if (!this.northDoorOpen && this.north) target.drawTransparentImage(doorClosedNorth, (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)
        if (!this.eastDoorOpen && this.east) target.drawTransparentImage(doorClosedNorth.rotated(90), (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)
        if (!this.southDoorOpen && this.south) target.drawTransparentImage(doorClosedNorth.rotated(180), (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)
        if (!this.westDoorOpen && this.west) target.drawTransparentImage(doorClosedNorth.rotated(270), (160 - 74) / 2 - (playerX | 0) + offsetX, (120 - 74) / 2 - (playerY | 0) + offsetY)
    }

    updateImage() {
        let base: Image

        switch (this.type) {
            case (CubicleType.Home):
                base = homeCubicle.clone()
                break
            case (CubicleType.Normal):
            case (CubicleType.JackInTheBox):
            case (CubicleType.Empty):
                base = baseCubicle.clone()
                break
            
        }
        //if (!base) {base = image.create(74, 74); base.fill(2)}
        if (!base) base = baseCubicle.clone()
        this.image = base
    }

    expandCubicle() {
        if (this.expanded) return
        this.expanded = true
        if (this.type = CubicleType.Normal) {
            this.north = (this.parentDir == Direction.North) ? this.parent : (randint(0, 1)) ? new cubicle(this, Direction.South) : undefined
            this.east = (this.parentDir == Direction.East) ? this.parent : (randint(0, 1)) ? new cubicle(this, Direction.West) : undefined
            this.south = (this.parentDir == Direction.South) ? this.parent : (randint(0, 1)) ? new cubicle(this, Direction.North) : undefined
            this.west = (this.parentDir == Direction.West) ? this.parent : (randint(0, 1)) ? new cubicle(this, Direction.East) : undefined
        }

        let validDirs = []
        if (this.north) validDirs.push(0)
        if (this.east) validDirs.push(1)
        if (this.south) validDirs.push(2)
        if (this.west) validDirs.push(3)
        if (validDirs.length == 1) {
            switch(validDirs[0]) {
                case (0): 
                    new cubicle(this, Direction.South)
                    break
                case (1):
                    new cubicle(this, Direction.West)
                    break
                case (2):
                    new cubicle(this, Direction.North)
                    break
                case (3):
                    new cubicle(this, Direction.East)
                    break

            }
        }

        let normalCount = 0
        if (this.north && this.north.isNormalIsh()) normalCount++
        if (this.east && this.east.isNormalIsh()) normalCount++
        if (this.south && this.south.isNormalIsh()) normalCount++
        if (this.west && this.west.isNormalIsh()) normalCount++

        if (normalCount == 0) {
            let room = randint(0, 3)
            switch (room) {
                case (0): this.north.type = CubicleType.Normal
                case (1): this.east.type = CubicleType.Normal
                case (2): this.south.type = CubicleType.Normal
                case (3): this.west.type = CubicleType.Normal
            }
        }
    }

    isNormalIsh() {
        //return (this.type == CubicleType.Home || this.type == CubicleType.Normal || this.type == CubicleType.Elevator)
        return true
    }
}

currentCubicle = new cubicle(undefined, 5)
currentCubicle.type = CubicleType.Home
currentCubicle.south = new cubicle(currentCubicle, Direction.North)
currentCubicle.south.type = CubicleType.Normal
currentCubicle.north = undefined
currentCubicle.east = undefined
currentCubicle.west = undefined
currentCubicle.expanded = true
currentCubicle.updateImage()

scene.createRenderable(-1, (target) => {
    if (controller.up.isPressed()) playerY -= playerSpeed
    if (controller.down.isPressed()) playerY += playerSpeed
    if (controller.left.isPressed()) playerX -= playerSpeed
    if (controller.right.isPressed()) playerX += playerSpeed
    
    if (playerChangingRooms == 0) {
        if (playerX < -56 / 2 && !currentCubicle.west) playerX = -56 / 2
        if (playerY < -56 / 2 && !currentCubicle.north) playerY = -56 / 2
        if (playerX > 56 / 2 && !currentCubicle.east) playerX = 56 / 2
        if (playerY > 56 / 2 && !currentCubicle.south) playerY = 56 / 2
    } else if (playerChangingRooms == 1) {

    } else {

    }

    if (playerX > 37) { currentCubicle = currentCubicle.east, playerX -= 70, currentCubicle.westDoorOpen = true, currentCubicle.expandCubicle() }
    if (playerY > 37) { currentCubicle = currentCubicle.south, playerY -= 70, currentCubicle.northDoorOpen = true, currentCubicle.expandCubicle() }
    if (playerX < -37) { currentCubicle = currentCubicle.west, playerX = 36, currentCubicle.eastDoorOpen = true, currentCubicle.expandCubicle() }
    if (playerY < -37) { currentCubicle = currentCubicle.north, playerY = 36, currentCubicle.southDoorOpen = true, currentCubicle.expandCubicle() }

    currentCubicle.render(target, 0)
    if (currentCubicle.north && currentCubicle.northDoorOpen) currentCubicle.north.render(target, 1)
    if (currentCubicle.east && currentCubicle.eastDoorOpen) currentCubicle.east.render(target, 2)
    if (currentCubicle.south && currentCubicle.southDoorOpen) currentCubicle.south.render(target, 3)
    if (currentCubicle.west && currentCubicle.westDoorOpen) currentCubicle.west.render(target, 4)

    target.drawTransparentImage(player, (screen.width - player.width) / 2, (screen.height - player.height) / 2)
})

controller.A.onEvent(2049, () => {
    
})