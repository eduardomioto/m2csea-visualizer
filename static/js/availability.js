$(document).ready(function () {
    $( "microservicesTable" ).empty();

    call();
    $(document).ready(function() {
        setInterval(call, 10000);
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
                url: 'http://localhost:19099/microservices/healthchecks/days/' + days,
                dataType: 'json',
                async: false,
                success: function (data) {
                    console.log(data);
                    var newHtml = "";
                    for(var k in data) {
                        var newRow = populateCriticaliTable(
                            k,
                            data[k].name,
                            data[k].downtimeOccurrences);
                        newHtml = newHtml + newRow;
                    }
                    $( "#microservicesTable" ).html(newHtml);
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
    }

    function populateCriticaliTable(id, microservice, downtimeOccurrences){
        
        var newRow = "<tr>";

        if(id === "0"){
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td><span class=\"label label-danger\">Most Critical</span></td>";
            $("#mostCritical").html(microservice);
        }else{
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td></td>";
        }

        newRow +="<td>"+ downtimeOccurrences + " checks</td>";
        newRow += "</tr>";
        return newRow;
    }
 
});