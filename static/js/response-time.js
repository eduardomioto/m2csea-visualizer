$(document).ready(function () {
    $( "microservicesTable" ).empty();

    call();
    $(document).ready(function() {
        setInterval(call, 10000);
    });

    function call(){
        console.log("new call")
        $.ajax({
                type: "GET",
                url: 'http://localhost:19199/microservices/responseTime',
                dataType: 'json',
                async: false,
                success: function (data) {
                    console.log(data);
                    var newHtml = "";
                    for(var k in data) {
                        var newRow = populateCriticaliTable(k,
                            data[k].project, 
                            data[k].mean,
                            data[k].average,
                            data[k].meanLastSevenDays,
                            data[k].averageLastSevenDays);

                        newHtml = newHtml + newRow;
                    }
                    $( "#microservicesTable" ).html(newHtml);
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
    }

    function populateCriticaliTable(id, microservice, mean, average, meanlastSevenDays, averagelastSevenDays){
        
        var newRow = "<tr>";

        if(id === "0"){
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td><span class=\"label label-danger\">Most Critical</span></td>";
            $("#mostCritical").html(microservice);
        }else{
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td></td>";
        }

        newRow +="<td>"+ mean + " seconds</td>";
        newRow +="<td>"+ average + " seconds</td>";
        newRow +="<td>"+ meanlastSevenDays + " seconds</td>";
        newRow +="<td>"+ averagelastSevenDays + " seconds</td>";
        newRow += "</tr>";
        return newRow;
    }
 
});