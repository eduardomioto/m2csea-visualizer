$(document).ready(function () {
    $( "microservicesTable" ).empty();

    call();
    $(document).ready(function() {
        setInterval(call, 10000);
    });

    function call(){
        console.log("new call");
        var days = $("#timeRangeSelect").val();
        console.log("days: " + days);
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
        var statusCPU = "";
        var statusRAM = "";

        
        if(id === "0"){
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td><span class=\"label label-danger\">Most Critical</span></td>";
            $("#mostCritical").html(microservice);
        }else{
            newRow +="<td>"+ microservice + "</td>";
            newRow +="<td></td>";
        }

        if(cpu <= 50.00){
            statusCPU = "success";  
        }else if(cpu > 50.00 && cpu <= 80.00){
            statusCPU = "warning";
        }else if(cpu > 80.00){
            statusCPU = "danger";
        }

        if(ram <= 50.00){
            statusRAM = "success";  
        }else if(ram > 50.00 && ram <= 80.00){
            statusRAM = "warning";
        }else if(ram > 80.00){
            statusRAM = "danger";
        }

        newRow +="<td> " + cpu + " %";
        newRow +="<div class=\"progress\">";
        newRow +="<div class=\"progress-bar progress-bar-"+ statusCPU + "\" role=\"progressbar\" aria-valuenow=\"" + cpu + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + cpu + "%;\">";
        newRow +="<span class=\"sr-only\">" + cpu + " %</span>";
        newRow +="</div>";
        newRow +="</div>";
        newRow +="</td>";

        newRow +="<td>"+ ram + "%";
        newRow +="<div class=\"progress\">";
        newRow +="<div class=\"progress-bar progress-bar-"+ statusRAM + "\" role=\"progressbar\" aria-valuenow=\"" + ram + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + ram + "%;\">";
        newRow +="<span class=\"sr-only\">" + ram + " %</span>";
        newRow +="</div>";
        newRow +="</div>";
        newRow +="</td>";

        newRow += "</tr>";
        return newRow;
    }
 
});