import GameModel from "../model/game_model";
import BattlefieldGenerator from "../generator/battlefield_generator";
import PlayerModel from '../model/player_model';

export default class GameGenerator {
    /**
     * @param {Number} number
     * @param {Number} size
     *
     * @returns {GameModel}
     */
    static generate(number, size) {
        const model = new GameModel();

        for (let i = 0; i < number; i++) {
            const battlefield = BattlefieldGenerator.generate(size);
            const player = new PlayerModel();
                battlefield.setPlayer(player);

            model.addBattlefield(battlefield)
        }

        return model;
    }
}