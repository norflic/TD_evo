import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //  Get the current highscore from the registry
        const score = this.registry.get('highscore');

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(512, 384, 'background');

        const logo = this.add.image(512, -270, 'logo');

        this.tweens.add({
            targets: logo,
            y: 270,
            duration: 1000,
            ease: 'Bounce'
        });

        this.add.text(32, 32, `High Score: ${score}`, textStyle);

        const instructions = [
            'cliquer pour lancer une partie'
        ]

        this.add.text(512, 550, instructions, textStyle).setAlign('center').setOrigin(0.5);

        const btn_jouer = this.add.image(512, 600, 'btn_jouer').setInteractive();

        btn_jouer.on('pointerdown', () => {
            console.log('Bouton cliqué !');
            this.scene.start('Map');
            // Ici tu peux lancer la scène, jouer un son, etc.
        });

        // affiche la scene map quand l'ecran est clique
        // this.input.once('pointerdown', () => {
        //     this.scene.start('Map');
        // });
    }
}
