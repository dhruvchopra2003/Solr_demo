$(document).ready(function () {
    var i = 0;

    $("#addButton").click(function () {
        var newElement = $('<div><label>AND</label><input type="text" id="queryInput' + (i++) + '" placeholder="Enter Query"><button class="rmv">Remove</button><br></div>');

        $("#container").append(newElement);

        $(".rmv").click(function () {
            $(this).prev().val("");
            $(this).parent().hide();
        });
    });

    $("#searchButton").click(function () {
        console.log("Fetching the query");

        var orStmt = $("#searchQuery").val();
        var query = "(" + orStmt + ")";

        // AND STATEMENTS
        var andStmt = "";
        for (let j = 0; j < i; j++) {

            if (document.getElementById("queryInput" + j).value !== "") {
                var inputValue = $('#queryInput' + j).val();
                andStmt = andStmt + ' AND (' + inputValue + ')';

            } else {
                continue;
            }
        }
        console.log("The final AND query is:", andStmt);

        query += andStmt;

        var encoded_query = encodeURIComponent(query);

        // IF USING PROXY.PHP
        // var solrUrl = "http://localhost/Solr_demo/proxy.php?q=" + encodeURIComponent(query);

        // GETTING THE NUMBER OF ROWS
        var numRows = $('#numRows').val();
        var rowsParam = numRows ? "&rows=" + encodeURIComponent(numRows) : "";

        var solrUrl = 'http://localhost:8983/solr/impact/select?q=description:(' + encoded_query + ')';
        solrUrl += rowsParam;

        console.log(solrUrl);

        $.ajax({
            type: 'GET',
            crossDomain: true,
            url: solrUrl,

            success: function (data) {

                console.log("request successful");

                console.log(data);

                var count = $('#count');
                count.text("Count =" + data.response.docs.length);
                var resultDiv = $("#results");
                // resultDiv.innerHTML = outp;
                var i = 0;
                var resp = document.getElementById("result");
                resp.innerHTML = " ";
                while (data.response.docs[i]) {
                    var outp = [data.response.docs[i].name, data.response.docs[i].description]
                    resp.innerHTML += outp[0] + "\n" + outp[1] + '<br>' + '<br>' + '<br>';
                    i++;
                }


                // resultDiv.innerHTML = JSON.stringify(data.response.docs, null, 2);


            },
            error: function (xhr, status, error) {
                console.error("Error: ", error);
            }
        });
    });
});

