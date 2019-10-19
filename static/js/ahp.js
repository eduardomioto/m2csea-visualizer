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
            tableContent += "<tr><th>" + x + "</th><td>"+ weightsMap[x] + "</td></tr>";       
        }
        return tableContent;
    }

    function populateRankingMap(rankingMap){        
        var rankingMap = "";
        for (var y in rankingMap) {
            rankingMap += "<tr><th>" + y + "</th><td>"+ rankingMap[y] + "</td></tr>";       
        }
        return rankingMap;
    }

    function populateCriticaliTable(pairs, consistencyRatio, consistencyIndex ){
        var newRow = "<tr><th>Pair Comparison</th><td>"+ pairs + "</td></tr>";
        newRow +="<tr><th>Consistency Ratio</th><td>"+ consistencyRatio + "</td></tr>";
        newRow +="<tr><th>Consistency Index</th><td>"+ consistencyIndex + "</td></tr>";
        return newRow;
    }
 
});