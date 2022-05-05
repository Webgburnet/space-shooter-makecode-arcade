namespace SpriteKind {
    export const Boulet = SpriteKind.create()
    export const Vague = SpriteKind.create()
    export const Bouclier = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Vague, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Boulet, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Bouclier, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 1 . . . . . . . 
        . . . . . . . 2 1 . . . . . . . 
        . . . . . . . 2 1 d . . . . . . 
        `, mySprite, 0, -50)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let Barriere: Sprite = null
let Mur: Sprite = null
let Boule: Sprite = null
let bonus = 0
let asteroide: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
let score_save = 0
let BtnB = 0
let BtnHaut = 0
let BtnBas = 0
info.setLife(1)
effects.confetti.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 6 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 6 . . . . . . . 
    . . . . . . 8 8 9 8 . . . . . . 
    . . . . . . 8 6 9 8 . . . . . . 
    . . . . . c c c 8 8 8 . . . . . 
    . . . . 8 8 6 6 6 9 8 8 . . . . 
    . . 8 f f f c c e e f f 8 8 . . 
    . 8 8 8 8 8 8 6 6 6 6 9 6 8 8 . 
    8 8 8 8 8 8 8 8 6 6 6 9 6 6 8 8 
    8 8 8 8 8 8 8 8 6 6 6 6 9 6 8 8 
    `, SpriteKind.Player)
mySprite.setPosition(80, 110)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    asteroide = sprites.createProjectileFromSide(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, 0, 50)
    asteroide.x = randint(0, scene.screenWidth())
    asteroide.setKind(SpriteKind.Enemy)
})
forever(function () {
    if (score_save == info.score()) {
    	
    } else {
        bonus = info.score() % 50
        if (bonus == 0) {
            info.setLife(info.life() + 1)
        }
        if (bonus == 10) {
            BtnB = BtnB + 1
        }
        if (bonus == 20) {
            BtnBas = BtnBas + 1
        }
        if (bonus == 30) {
            BtnHaut = BtnHaut + 1
        }
        score_save = info.score()
    }
    if (BtnB >= 1) {
        if (controller.B.isPressed()) {
            BtnB = BtnB - 1
            Boule = sprites.createProjectileFromSprite(img`
                ...4444444444...
                ..444444444444..
                .44445555554444.
                4444555555554444
                4445552222555444
                4455522112255544
                4455221111225544
                4455211111125544
                4455221111225544
                4455522112255544
                4445552222555444
                4444555225554444
                .44445522554444.
                ..444552255444..
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                ...4455225544...
                `, mySprite, 0, -50)
            Boule.setKind(SpriteKind.Boulet)
            music.knock.play()
        }
    }
    if (BtnHaut >= 1) {
        if (controller.up.isPressed()) {
            BtnHaut = BtnHaut - 1
            Mur = sprites.createProjectileFromSprite(img`
                .......44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444.......
                ......4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444......
                .....444555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555444.....
                ....44455555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555444....
                ...4445552222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222555444...
                ..444555222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222555444..
                .44455522211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222555444.
                4445552221111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222555444
                4445552221111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222555444
                .44455522211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222555444.
                ..444555222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222555444..
                ...4445552222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222555444...
                ....44455555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555444....
                .....444555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555444.....
                ......4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444......
                .......44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444.......
                `, mySprite, 0, -50)
            Mur.setKind(SpriteKind.Vague)
            music.beamUp.play()
        }
    }
    if (BtnBas >= 1) {
        if (controller.down.isPressed()) {
            BtnBas = BtnBas - 1
            Barriere = sprites.createProjectileFromSprite(img`
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . 4 4 4 4 4 4 . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 4 4 4 5 5 5 5 4 4 4 . . . 
                . . 4 4 4 5 5 5 5 5 5 4 4 4 . . 
                . 4 4 4 5 5 5 2 2 5 5 5 4 4 4 . 
                4 4 4 5 5 5 2 2 2 2 5 5 5 4 4 4 
                4 4 5 5 5 2 2 2 2 2 2 5 5 5 4 4 
                4 4 5 5 2 2 2 1 1 2 2 2 5 5 4 4 
                4 4 5 5 2 2 1 1 1 1 2 2 5 5 4 4 
                4 4 5 5 2 2 1 1 1 1 2 2 5 5 4 4 
                4 4 5 5 2 2 1 1 1 1 2 2 5 5 4 4 
                4 4 5 5 2 2 1 1 1 1 2 2 5 5 4 4 
                4 4 5 5 2 2 1 1 1 1 2 2 5 5 4 4 
                4 4 5 5 2 2 1 1 1 1 2 2 5 5 4 4 
                `, mySprite, 0, 0)
            Barriere.setKind(SpriteKind.Bouclier)
            music.beamUp.play()
        }
    }
})
