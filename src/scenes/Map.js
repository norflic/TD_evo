import {Scene} from "phaser";

export class Map extends Scene{
    constructor ()
    {
        super('Map');
    }


    create ()
    {
        console.log('Create Map');
        // this graphics element is only for visualization,
        // its not related to our path
        var graphics = this.add.graphics();

        // the path for our enemies
        // parameters are the start x and y of our path
        var path = this.add.path(96, -32);
        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 544);

        graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        path.draw(graphics);
    }

    dropCoin ()
    {
    }

    clickCoin (coin)
    {
    }

    update ()
    {
        // this.timeText.setText('Time: ' + Math.ceil(this.timer.getRemainingSeconds()));
    }

    gameOver ()
    {

    }

}