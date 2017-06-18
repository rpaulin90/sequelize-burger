/**
 * Created by rpaulin on 6/15/17.
 */

module.exports = function(sequelize, DataTypes) {

    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Burger;
};


