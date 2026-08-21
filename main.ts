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

let player = sprites.create(img`
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
`)
controller.moveSprite(player, 50, 50)
scene.cameraFollowSprite(player)
player.x = 0
player.y = 0

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
    northDoorOpen: false
    eastDoorOpen: false
    southDoorOpen: false
    westDoorOpen: false
    type: CubicleType

    constructor(public parent: cubicle, public parentDir: Direction) {
        this.type = randint(1, (stairCount > 2) ? CubicleType.Exit : CubicleType.Elevator)
        this.updateImage()
    }

    render(target: Image) {
        target.drawImage(this.image, (160 - 74) / 2 - player.x, (120 - 74) / 2 - player.y)
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
        this.image = base
    }

    expandCubicle() {
        
        if (this.type = CubicleType.Normal) {
            this.north = (this.parentDir == Direction.North) ? this.parent : new cubicle(this, Direction.South)
            this.east = (this.parentDir == Direction.East) ? this.parent : new cubicle(this, Direction.West)
            this.south = (this.parentDir == Direction.South) ? this.parent : new cubicle(this, Direction.North)
            this.west = (this.parentDir == Direction.West) ? this.parent : new cubicle(this, Direction.East)
        }

        let normalCount = 0
        if (this.north.isNormalIsh()) normalCount++
        if (this.east.isNormalIsh()) normalCount++
        if (this.south.isNormalIsh()) normalCount++
        if (this.west.isNormalIsh()) normalCount++

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
        return (this.type == CubicleType.Home || this.type == CubicleType.Normal || this.type == CubicleType.Elevator)
    }
}

currentCubicle = new cubicle(undefined, 5)
currentCubicle.type = CubicleType.Home
currentCubicle.south = new cubicle(currentCubicle, Direction.North)
currentCubicle.south.type = CubicleType.Normal
currentCubicle.north = undefined
currentCubicle.east = undefined
currentCubicle.west = undefined
currentCubicle.updateImage()

scene.createRenderable(-1, (target) => {
    currentCubicle.render(target)
    if (currentCubicle.north) currentCubicle.north.render(target)
    if (currentCubicle.east) currentCubicle.east.render(target)
    if (currentCubicle.south) currentCubicle.south.render(target)
    if (currentCubicle.west) currentCubicle.west.render(target)
})



















