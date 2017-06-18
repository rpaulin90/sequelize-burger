/**
 * Created by rpaulin on 6/15/17.
 */

module.exports = function(sequelize, DataTypes) {


    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Customer;


};