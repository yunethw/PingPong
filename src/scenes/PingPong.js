import { Scene } from 'phaser'

export class PingPong extends Scene {
    constructor () {
        super('PingPong')
        this.score = 0
        this.scoreText = null
    }

    preload () {
        this.load.image('ball', 'assets/tennis-ball.png')
        this.load.image('paddle', 'assets/paddle.png')
    }
    
    create () {
        
        this.ball = this.physics.add.sprite(Phaser.Math.Between(0, 800), 64, 'ball')
        this.ball.setBounce(1)
        this.ball.setVelocity(Phaser.Math.RND.pick([-250, 250]), 250)
        this.ball.setCollideWorldBounds(true)

        this.paddle = this.physics.add.sprite(400, 568, 'paddle')
        this.paddle.setCollideWorldBounds(true)
        this.paddle.setPushable(false)
        this.input.on('pointermove', (pointer) => {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 150, 650)
        })

        this.scoreText = this.add.text(16, 16, '0', { fontSize: '32px', fill: '#fff' })
        this.physics.add.collider(this.ball, this.paddle, this.hitBall, null, this)
    }
    
    update () {

        if (this.ball.y >= 568) {
            this.physics.pause()
            return
        }
    }

    hitBall (ball, paddle) {
        this.score += 1
        this.scoreText.setText(this.score.toString())

        if (this.score % 5 === 0) {
            this.increaseBallSpeed(ball)
        }
    }

    increaseBallSpeed (ball) {
        const speed = ball.body.speed
        if (speed < 5000) {
            ball.setVelocity(ball.body.velocity.x * 1.2, ball.body.velocity.y * 1.2)
        }
    }
        
}