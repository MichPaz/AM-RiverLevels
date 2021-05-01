'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Estacao extends Model {
        static associate(models) {
            Estacao.hasMany(models.Medicao, {
                as: 'medicoes',
                foreignKey: 'horEstacao'
            });
        }
    };
    Estacao.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
        codigoEstacao: DataTypes.STRING(50),
        codigoAdicional: DataTypes.STRING(50),
        aneelPlu: DataTypes.STRING,
        aneelFlu: DataTypes.STRING,
        nome: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
        altitude: DataTypes.FLOAT,
        ultimaAtualizacao: DataTypes.DATE,
        baciaCodigo: DataTypes.INTEGER,
        codigoNomeBacia: DataTypes.STRING,
        codigoNomeSubBacia: DataTypes.STRING,
        nomeRio: DataTypes.STRING,
        nomeEstado: DataTypes.STRING,
        nomeMunicipio: DataTypes.STRING,
        subBaciaCodigo: DataTypes.INTEGER,
        rioCodigo: DataTypes.INTEGER,
        estadoCodigo: DataTypes.INTEGER,
        municipioCodigo: DataTypes.INTEGER,
        responsavelCodigo: DataTypes.INTEGER,
        operadoraCodigo: DataTypes.INTEGER,
        menorDataPeriodo: DataTypes.DATE,
        maiorDataPeriodo: DataTypes.DATE,
        responsavelSigla: DataTypes.STRING,
        operadoraSigla: DataTypes.STRING,
        tipoEstacao: DataTypes.STRING,
        operando: DataTypes.INTEGER,
        codigoNome: DataTypes.STRING,
        // medicoes: DataTypes.ARRAY(DataTypes.TEXT) ,
        // selecionada: DataTypes.,
        baixarChuva: DataTypes.BOOLEAN,
        baixarNivel: DataTypes.BOOLEAN,
        baixarVazao: DataTypes.BOOLEAN,
        latFormatada: DataTypes.STRING,
        lonFormatada: DataTypes.STRING,
        peridoDisponibilidade: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Estacao',
    });
    return Estacao;
};