$(document).ready(function () {
    $( "#ahpContent" ).empty();
    $( "#ahpContent" ).hide();

    call();

    $("#showHideCalculusButton").click(function(){
        $("#ahpContent").toggle();
    });
   
    function call(){
        console.log("new call")
        $.ajax({
                type: "GET",
                url: 'http://localhost:19192/microservices/ahp/',
                dataType: 'json',
                async: false,
                success: function (data) {
                    console.log(data);
                    
                     var newHtml = populateCriticaliTable(
                             data.weightsMap,
                             data.rankingMap,
                             data.nrOfPairwiseComparisons,
                             data.consistencyRatio,
                             data.consistencyIndex                             
                             );
                    
                    $( "#ahpContent" ).html(newHtml);
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
    }

    function populateCriticaliTable(id, weightsMap, rankingMap, pairs, ratio, index ){
        
        var newRow = "<tr><td> Weights Map </td></tr>";
        newRow += "<tr><td>"+ weightsMap + "</td></tr>";
        newRow +="<tr><td>RankingMap</td></tr>";
        newRow +="<tr><td>"+ rankingMap + "</td></tr>";
        newRow +="<tr><td>Pair Comparison</td></tr>";
        newRow +="<tr><td>"+ pairs + "</td></tr>";
        newRow +="<tr><td>Consistency Ratio</td></tr>";
        newRow +="<tr><td>"+ ratio + "</td></tr>";
        newRow +="<tr><td>Consistency Index</td></tr>";
        newRow +="<tr><td>"+ index + "</td></tr>";
        return newRow;
    }
 
});