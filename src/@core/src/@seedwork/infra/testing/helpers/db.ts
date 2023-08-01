import { Sequelize, SequelizeOptions } from "sequelize-typescript";
//import { configTest as config } from "../../config";
//import { Config } from "sequelize/types";

const sequelizeOptions: SequelizeOptions = {
    dialect: "sqlite",
    host: ":memory:",
    logging: false
};

export function setupSequelize(options: SequelizeOptions = {}) {
    let _sequelize: Sequelize;

    beforeAll(
        () =>
            (_sequelize = new Sequelize({
                ...sequelizeOptions,
                ...options
            }))
    );

    beforeEach(async () => {
        await _sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await _sequelize.close();
    });

    return {
        get sequelize() {
            return _sequelize;
        }
    };
}
