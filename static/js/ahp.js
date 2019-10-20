$(document).ready(function () {
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
                    
                    var weightsMap = populateWeightsMap(data.weightsMap);
                    $( "#weightsMap" ).html(weightsMap);

                    var rankingMap = populateRankingMap(data.rankingMap);
                    $( "#rankingMap" ).html(rankingMap);

                    var ahpContent = populateCriticaliTable(data.nrOfPairwiseComparisons,
                        data.consistencyRatio, data.consistencyIndex);
               
                    $( "#ahpContentTable" ).html(ahpContent);

                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
    }

    function populateWeightsMap(weightsMap){

        var tableContent = "";
        for (var x in weightsMap) {
            tableContent += "<tr><td>" + x + "</td><td>"+ weightsMap[x] + "</td></tr>";       
        }
        return tableContent;
    }

    function populateRankingMap(rankingMap){        
        var tableContent = "";
        for (var y in rankingMap) {
            var key = y.replace("_"," in comparison with ");
            tableContent += "<tr><td>" + key + "</td><td>"+ rankingMap[y] + "</td></tr>";       
        }
        return tableContent;
    }

    function populateCriticaliTable(pairs, consistencyRatio, consistencyIndex ){
        var newRow = "<tr><td>Pair Comparison</td><td>"+ pairs + "</td></tr>";
        newRow +="<tr><td>Consistency Ratio</td><td>"+ consistencyRatio + "</td></tr>";
        newRow +="<tr><td>Consistency Index</td><td>"+ consistencyIndex + "</td></tr>";
        return newRow;
    }
 
});