import GameModel from "../model/game_model";
import BattlefieldGenerator from "../generator/battlefield_generator";
import CellModel from "../model/cell_model";
import PlayerModel from "../model/player_model";

export default class GameGenerator {
    /**
     * @param {Number} players
     * @param {Number} size
     *
     * @returns {GameModel}
     */
    static generate(players, size) {
        const model = new GameModel();

        for (let i = 0; i < players; i++) {
            const battlefield = BattlefieldGenerator.generate(size);
            const player = new PlayerModel();
            battlefield.setPlayer(player);

            model.addBattlefield(battlefield)
        }

        GameGenerator.applyPlayerShips(model);

        return model;
    }

    /**
     * @param {GameModel} model
     */
    static applyPlayerShips(model) {
        let cells = ['A1', 'A2', 'A3', 'A5', 'C1', 'C2', 'C5'];

        for (const battlefield of model.getBattlefields()) {
            if (battlefield.getPlayer().hasBytes(0x01)) {
                continue;
            }

            cells.forEach(coordinate => battlefield.getCell(coordinate).setBytes(CellModel.flags.ship));
        }

        cells = ['B1', 'B2'];

        for (const battlefield of model.getBattlefields()) {
            if (battlefield.getPlayer().hasBytes(0x01)) {
                continue;
            }

            cells.forEach(coordinate => battlefield.getCell(coordinate).setBytes(CellModel.flags.dead));
        }
    }
}