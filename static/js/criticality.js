$(document).ready(function () {
    $( "microservicesTable" ).empty();

    call();
    $(document).ready(function() {
        setInterval(call, 30000);
    });

    $("#timeRangeSelect").change(function(){
        call();
    });

    function call(){
        console.log("new call")
        var days = $("#timeRangeSelect").val();
        console.log("days: " + days);
        $.ajax({
                type: "GET",
                url: 'http://localhost:19192/microservices/criticality/days/' + days,
                dataType: 'json',
                async: false,
                success: function (data) {
                    console.log(data);
                    var newHtml = "";
                    for(var k in data) {
                        var newRow = populateCriticaliTable(
                             k,
                             data[k].microservice,
                             data[k].vision,
                             data[k].criticalityFactor,
                             data[k].criticalityResult                 
                             );
                        newHtml = newHtml + newRow;
                    }
                    $( "#microservicesTable" ).html(newHtml);
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
    }

    function populateCriticaliTable(id, microservice, vision, factor, result ){
        
        var newRow = "<tr>";

        if(id === "0"){
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td><span class=\"label label-danger\">Most Critical</span></td>";
            $("#mostCritical").html(microservice);
        }else{
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td></td>";
        }

        newRow +="<td>"+ vision + "</td>";
        newRow +="<td>"+ factor + "</td>";
        newRow +="<td>"+ result + "</td>";
       
        newRow += "</tr>";
        return newRow;
    }
 
});