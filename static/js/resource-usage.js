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
                url: 'http://localhost:19099/microservices/resourceUsage/',
                dataType: 'json',
                async: false,
                success: function (data) {
                    console.log(data);
                    var newHtml = "";
                    for(var k in data) {
                        var newRow = populateCriticaliTable(k, data[k].microservice, data[k].cpu, data[k].ram);
                        newHtml = newHtml + newRow;
                    }
                    $( "#microservicesTable" ).html(newHtml);
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
    }

    function populateCriticaliTable(id, microservice, cpu, ram){
        var newRow = "<tr>";
        
        if(id === "0"){
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td><span class=\"label label-danger\">Most Critical</span></td>";
            $("#mostCritical").html(microservice);
        }else{
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td></td>";
        }

        //success
        //warning
        //danger


        newRow +="<td> " + cpu + " %";
        newRow +="<div class=\"progress\">";
        newRow +="<div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"" + cpu + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + cpu + "0%;\">";
        newRow +="<span class=\"sr-only\">" + cpu + " % Complete (success)</span>";
        newRow +="</div>";
        newRow +="</div>";
        newRow +="</td>";

        newRow +="<td>"+ ram + "%";
        newRow +="<div class=\"progress\">";
        newRow +="<div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"" + ram + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + ram + "0%;\">";
        newRow +="<span class=\"sr-only\">" + ram + " % Complete (success)</span>";
        newRow +="</div>";
        newRow +="</div>";
        newRow +="</td>";

        newRow += "</tr>";
        return newRow;
    }
 
});