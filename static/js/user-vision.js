$(document).ready(function () {
    $( "microservicesTable" ).empty();

    $.ajax({
        type: "GET",
        url: 'http://localhost:19092/microservices/vision/user/',
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data);
            for(var k in data) {
                populateCriticaliTable(k, 
                    data[k].visionComparisonId,
                    data[k].visionA,
                    data[k].visionB,
                    data[k].rating);
            }
        }, error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            console.log(thrownError);
        }
    });
   
    function populateCriticaliTable(id, visionComparisonId, visionA, visionB, rating){
        var newRow = "<tr>";
        newRow +="<td>"+ visionA + "</td>";
        newRow +="<td>"+ visionB + "</td>";
        newRow +="<td>";
        newRow +="<input id=\"identifier_0.111_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.111\"> 1/9";
        newRow +="<input id=\"identifier_0.125_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.125\"> 1/8";
        newRow +="<input id=\"identifier_0.142_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.142\"> 1/7";
        newRow +="<input id=\"identifier_0.166_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.166\"> 1/6";
        newRow +="<input id=\"identifier_0.200_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.200\"> 1/5";
        newRow +="<input id=\"identifier_0.250_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.250\"> 1/4";
        newRow +="<input id=\"identifier_0.333_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.333\"> 1/3";
        newRow +="<input id=\"identifier_0.500_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.500\"> 1/2";
        newRow +="<input id=\"identifier_1.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"1.0\"> 1";
        newRow +="<input id=\"identifier_2.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"2.0\"> 2";
        newRow +="<input id=\"identifier_3.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"3.0\"> 3";
        newRow +="<input id=\"identifier_4.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"4.0\"> 4";
        newRow +="<input id=\"identifier_5.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"5.0\"> 5";
        newRow +="<input id=\"identifier_6.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"6.0\"> 6";
        newRow +="<input id=\"identifier_7.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"7.0\"> 7";
        newRow +="<input id=\"identifier_8.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"8.0\"> 8";
        newRow +="<input id=\"identifier_9.0_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"9.0\"> 9";
        newRow += "</td>";
        newRow += "</tr>";
        $( "#microservicesTable" ).append(newRow);     
        $("input[name='"+visionComparisonId+"'][value='"+rating+"']").prop('checked', true);
    }

    $('[id^="identifier_"]').on('change', function(e) {
        var visionComparisonId = $(this).attr( "name" );
        var rating = $(this).attr( "value" );
        saveUserVision(visionComparisonId , rating);
    });

    function saveUserVision(visionComparisonId, rating) {
        $.ajax({
            url:"http://localhost:19092/microservices/vision/user/",
            type:"POST",
            data: JSON.stringify({"userId": 1, "visionComparisonId": visionComparisonId, "rating" : rating }),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(){
                console.log("OK");
            }
        })
    }

});