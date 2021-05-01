'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Medicao extends Model {
        static associate(models) {
            Medicao.belongsTo(models.Estacao, {
                foreignKey: 'horEstacao',
                as: 'estacao'
              });
        }
    };
    Medicao.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        horEstacao: DataTypes.INTEGER,
        horDataHora: DataTypes.DATE,
        horQChuva: DataTypes.FLOAT,
        horChuva: DataTypes.FLOAT,
        horQNivelAdotado: DataTypes.FLOAT,
        horNivelAdotado: DataTypes.FLOAT,
        horQVazao: DataTypes.FLOAT,
        horVazao: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Medicao',
    });
    return Medicao;
};