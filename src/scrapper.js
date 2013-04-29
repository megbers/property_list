// ==UserScript==
// @name          Property List Exporter
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include       http://*.realcomponline.com/*
// ==/UserScript==

$(document).ready(
    function() {
        $('body').append('<textarea id="output" style="width: 800px; height: 600px;"></textarea>');
        var splitter = "| ";
        var $table = $('.BuyEmailList');
        var propertyList = [];

        var rows = $table.find('tr');
        for(var i = 4; i < rows.length; i = i + 4) {
            var cells1 = $(rows[i]).find('td');
            var cells2 = $(rows[i+1]).find('td');
            var cells3 = $(rows[i+2]).find('td');
            var cells4 = $(rows[i+3]).find('td');

            propertyList.push(parseProperty(cells1, cells2, cells3, cells4))
        }

        $('#output').val(stringifyPropertyList(propertyList));
        //console.log(stringifyPropertyList(propertyList));

        function stringifyPropertyList(propertyList) {
            var returnString = "Image" + splitter + " Link" + splitter + " Price" + splitter + " Square Foot" + splitter + " Lot Size" + splitter + " Address" + splitter + " City" + splitter + " Style" + splitter + " Beds" + splitter + " Baths" + splitter + " Exterior" + splitter + " Garage"
                + splitter + "Basement" + splitter + "Status" + splitter + " Year Built" + splitter + " Summer Taxes" + splitter + " Winter Taxes" + splitter + " MLS" + splitter + " Area #" + splitter + " Property Type" + splitter + " Map Coords" + splitter + " School District\n";
            for(var i = 0; i < propertyList.length; i++) {
                var property = propertyList[i];
                returnString = returnString + stringifyProperty(property);
            }

            return returnString;
        }

        function stringifyProperty(property) {
            var returnString =
                property.image
                + splitter + property.link
                + splitter + property.price
                + splitter + property.squareFeet
                + splitter + property.lotSize
                + splitter + property.address
                + splitter + property.city
                + splitter + property.style
                + splitter + property.beds
                + splitter + property.baths
                + splitter + property.exterior
                + splitter + property.garage
                + splitter + property.basement
                + splitter + property.status
                + splitter + property.yearBuilt
                + splitter + property.summerTaxes
                + splitter + property.winterTaxes
                + splitter + property.mls
                + splitter + property.areaNumber
                + splitter + property.propType
                + splitter + property.mapCoords
                + splitter + property.schoolDist
                +"\n";

            return returnString;

        }

        function parseProperty(c1, c2, c3, c4) {
            if(!c1 || !c2 || !c3 || !c4) {
                return {};
            }
            var property = {
                image: $(c1[1]).find('a').find('img').attr('src'),
                link: $(c1[1]).find('a').attr('href'),
                price: c1[2] ? c1[2].innerText : "",
                address: c1[3] ? c1[3].innerText : "",
                beds: c1[4] ? c1[4].innerText : "",
                exterior: c1[5] ? c1[5].innerText : "",
                yearBuilt: c1[6] ? c1[6].innerText : "",

                status: c2[1] ? c2[1].innerText : "",
                city: c2[2] ? c2[2].innerText : "",
                baths: c2[3] ? c2[3].innerText : "",
                basement: c2[4] ? c2[4].innerText : "",
                summerTaxes: c2[5] ? c2[5].innerText : "",

                mls: c3[1] ? c3[1].innerText : "",
                areaNumber: c3[2] ? c3[2].innerText : "",
                style: c3[3] ? c3[3].innerText : "",
                garage: c3[4] ? c3[4].innerText : "",
                winterTaxes: c3[5] ? c3[5].innerText : "",

                propType: c4[1] ? c4[1].innerText : "",
                mapCoords: c4[2] ? c4[2].innerText : "",
                squareFeet: c4[3] ? c4[3].innerText : "",
                lotSize: c4[4] ? c4[4].innerText : "",
                schoolDist: c4[5] ? c4[5].innerText : ""
            };


            return property;
        }


    }
);

