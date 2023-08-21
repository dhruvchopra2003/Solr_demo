$(document).ready(function () {
    var i = 0;

    $("#addButton").click(function () {
        var newElement = $('<div style="margin: 5px;"><label>AND:</label><input style="margin: 10px;" type="text" class="queryInput" placeholder="Enter Query"><button class="rmv" style="margin-left: 20px;">-</button><br></div>');

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

        var andStmt = "";

        $(".queryInput").each(function () {
            var inputValue = $(this).val();
            if (inputValue !== "") {
                andStmt += ' AND ' + '(' + inputValue + ')';
            }
        });

        query += andStmt;
        var encoded_query = "(" + encodeURIComponent(query) + ")";
        console.log("query: ", query, "\nencoded_query: ", encoded_query);

        var solrUrl = 'http://localhost:8983/solr/articles/select';
        // var numRows = 10;
        var numRows = $("#numRows").val();

        if (!numRows) {
            numRows = 10;
        }
        var rowsParam = numRows ? "&rows=" + encodeURIComponent(numRows) : "";

        var postData = {
            q: 'description:(' + query + ')',
            rows: numRows,
            wt: 'json'
        };

        $.ajax({
            type: 'POST', // Use POST method
            crossDomain: true,
            url: solrUrl,
            data: postData, // Pass the query parameters in the request body
            success: function (data) {
                console.log("request successful");

                console.log(data);

                var count = $("#count");
                count.text("Count = " + data.response.docs.length);
                var resultDiv = $("#results");
                var i = 0;
                var resp = $("#result");
                resp.html(" ");
                while (data.response.docs[i]) {
                    var outp = [data.response.docs[i].title, data.response.docs[i].description];
                    resp.append("<h2>" + outp[0] + "</h2>" + "<br>" + outp[1] + "<br><br><hr>");
                    i++;
                }
            },
            error: function (xhr, status, error) {
                console.error("Error: ", error);
            }
        });
    });
});
