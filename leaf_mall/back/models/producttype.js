const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductType extends Model {

    static init(sequelize) {
        return super.init(
            {
                value : {
                    type : DataTypes.STRING(60),
                    allowNull : false
                },
                isDelete : {
                    type : DataTypes.BOOLEAN,
                    allowNull : false,
                    defaultValue : false,
                },
            },
            {
                modelName: "ProductType",
                tableName: "productTypes",
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
                sequelize,

            }
        );
    }

    static associate(db) {
        // db.ProductType.hasMany(db.Product);
    }

}