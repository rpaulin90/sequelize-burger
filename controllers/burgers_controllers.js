/**
 * Created by rpaulin on 6/5/17.
 */

var db = require("../models");

module.exports = function(app) {


    app.get("/", function (req, res) {

        db.Burger.findAll({}).then(function(resultsBurger) {
            console.log(resultsBurger);
            db.Customer.findAll({}).then(function (resultsCustomer) {

                console.log(resultsCustomer);

                var burgerArray = [];

                for (var x = 0; x < resultsBurger.length; x++) {

                    if(resultsBurger[x].dataValues.devoured === true) {

                        for (var y = 0; y < resultsCustomer.length; y++) {

                            if (resultsBurger[x].dataValues.id === resultsCustomer[y].dataValues.BurgerId) {

                                burgerArray.push({

                                id: resultsBurger[x].dataValues.id,
                                burger_name: resultsBurger[x].dataValues.burger_name,
                                devoured: resultsBurger[x].dataValues.devoured,
                                customer_name: resultsCustomer[y].dataValues.customer_name

                                });

                            }
                        }
                    } else {
                        burgerArray.push(resultsBurger[x].dataValues)
                    }

                }

                var hbsObject = {
                    burgers: burgerArray
                };

                // results are available to us inside the .then
                //console.log(hbsObject);
                res.render("index", hbsObject);
            });
        });

    });


    app.post("/", function(req, res) {

        db.Burger.create({
            burger_name: req.body.name
        }).then(function(results) {
            // `results` here would be the newly created chirp
            res.redirect("/");
        });

    });

    //
    app.post("/:id", function(req, res) {


        db.Burger.find({ where: { id: req.params.id} }).then(function(results) {
            // `results` here would be the newly created chirp
            results.updateAttributes({

                devoured: true

            });

            db.Customer.create({
                customer_name: req.body.name,
                BurgerId: req.params.id

            }).then(function(results) {
                // `results` here would be the newly created chirp
                res.redirect("/");
            });


        });
    });

};