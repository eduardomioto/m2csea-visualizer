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
                url: 'http://localhost:19099/microservices/issues/grouped',
                dataType: 'json',
                async: false,
                success: function (data) {
                    console.log(data);
                    var newHtml = "";
                    for(var k in data) {
                        var newRow = populateCriticaliTable(k, data[k].project, data[k].efforInMinutes);
                        newHtml = newHtml + newRow;
                    }
                    $( "#microservicesTable" ).html(newHtml);
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
    }

    function populateCriticaliTable(id, microservice, efforInMinutes){
        
        var newRow = "";
        if(id === "0"){
            newRow = "<tr class=\".danger\">";

            $("#mostCritical").html(microservice);
        }else{
            newRow = "<tr>";
        }

        newRow +="<td>"+ microservice + "</td>";
        newRow +="<td>"+ efforInMinutes + " minutes</td>";
        newRow += "</tr>";
        return newRow;
    }
 
});