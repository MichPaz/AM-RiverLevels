'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DadosHidrometereologico extends Model {
        static associate(models) {
            DadosHidrometereologico.belongsTo(models.Estacao, {
                foreignKey: 'codEstacao',
                as: 'estacao'
              });
        }
    };
    DadosHidrometereologico.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        codEstacao: DataTypes.INTEGER,
        dataHora: DataTypes.DATE,
        vazao: DataTypes.FLOAT,
        nivel: DataTypes.FLOAT,
        chuva: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'DadosHidrometereologico',
    });
    return DadosHidrometereologico;
};