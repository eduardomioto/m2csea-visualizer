$(document).ready(function () {
    $( "microservicesTable" ).empty();

    $.ajax({
        type: "GET",
        url: 'http://localhost:19192/microservices/vision/user/',
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
        newRow +="<input id=\"identifier_0.2_" +   visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.2\"> 1/5";
        newRow +="<input id=\"identifier_0.250_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.25\"> 1/4";
        newRow +="<input id=\"identifier_0.333_" + visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.333\"> 1/3";
        newRow +="<input id=\"identifier_0.5_" +   visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"0.5\"> 1/2";
        newRow +="<input id=\"identifier_1_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"1\"> 1";
        newRow +="<input id=\"identifier_2_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"2\"> 2";
        newRow +="<input id=\"identifier_3_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"3\"> 3";
        newRow +="<input id=\"identifier_4_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"4\"> 4";
        newRow +="<input id=\"identifier_5_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"5\"> 5";
        newRow +="<input id=\"identifier_6_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"6\"> 6";
        newRow +="<input id=\"identifier_7_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"7\"> 7";
        newRow +="<input id=\"identifier_8_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"8\"> 8";
        newRow +="<input id=\"identifier_9_" +     visionComparisonId + "\" type=\"radio\" name=\"" + visionComparisonId + "\" value=\"9\"> 9";
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
            url:"http://localhost:19192/microservices/vision/user/",
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