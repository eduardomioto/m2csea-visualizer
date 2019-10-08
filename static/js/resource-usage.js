$(document).ready(function () {
    $( "microservicesTable" ).empty();

    call();
    $(document).ready(function() {
        setInterval(call, 5000);
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
        var newRow = "";
        if(id === "0"){
            newRow = "<tr class=\".danger\">";

            $("#mostCritical").html(microservice);
        }else{
            newRow = "<tr>";
        }

        newRow +="<td>"+ microservice + "</td>";
        newRow +="<td>"+ cpu + "%</td>";
        newRow +="<td>"+ ram + "%</td>";
        newRow += "</tr>";
        return newRow;
    }
 
});