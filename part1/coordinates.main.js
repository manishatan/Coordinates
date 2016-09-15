"use strict";

$(function () {
    var form = document.getElementById("form");

    $('button').on('click',function () {
        var temp, d, distance, id, value;
        var arr = [], result = [], text='';
        var p = form.x.value;
        var q = form.y.value;

        $.ajax({
            url: "coordinates.json",
            type: 'GET',
            success: function (data) {
                console.log("Success");
                var coordinates = data;
                coordinates.map(function (obj) {
                        id = obj.id,
                        value = obj.value;
                        distance = distanceToOrigin(value);
                        arr.push({id: obj.id, value: value, dist: distance});
                });
                result = arr.sort(function (a, b) {
                    return a.dist - b.dist
                });
                result.map(function (obj) {
                    text  +=  "<li> ( " + obj.value  + " ) </li>";
                });
                document.getElementById('display').innerHTML = text;
            },
            error: function (error) {
                console.log("Error");
            }
        });

        var distanceToOrigin = function (value) {
            temp = value.split(",");
            var x = temp[0];
            var y = temp[1];
            d = Math.sqrt(Math.pow(x - p, 2) + Math.pow(y - q, 2));
            return d;
        }
    });
});