$(document).ready(function () {
    var textArea = $("#searchQuery");
    // textArea.style.width = '25vw';

    textArea.on('input', function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + 'px';

    });

    var textArea2 = $(".queryInput");
    textArea2.on('input', function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + 'px';
    })
})

var dataU;
$(document).ready(function () {
    var i = 0;

    $("#addButton").click(function () {
        var newElement = $('<div style="margin: 5px;"><h6>AND:</h6><textarea style="margin: 10px; width: 24vw;" type="text" class="queryInput" placeholder="Enter Query" rows = 2></textarea><button class="rmv" style="margin-left: 3px;">-</button><br></div>');

        $("#container").append(newElement);

        $(".rmv").click(function () {
            $(this).prev().val("");
            $(this).parent().hide();
        });
    });

    $("#searchButton").click(function () {
        console.log("Fetching the query");

        var orStmt = $("#searchQuery").val();
        var header_query = "";
        header_query = $('#searchHeader').val();
        var query = "";
        if (orStmt !== "") {
            query = "(" + orStmt + ")";
        }

        var andStmt = "";

        $(".queryInput").each(function () {
            var inputValue = $(this).val();
            if (inputValue !== "") {
                andStmt += ' AND ' + '(' + inputValue + ')';
            }
        });

        query += andStmt;

        if (query !== "") {
            query = '(' + query + ')';
        } else {
            query = '""';
        }

        if (header_query !== "") {
            query = '(' + header_query + ')';
        } else {
            header_query = '""';
        }

        console.log("Header query: ", header_query);
        console.log("query: ", query);


        // var solrUrl = 'http://localhost:8983/solr/impact/select';
        var solrUrl = 'http://localhost:8983/solr/articles/select';

        var numRows = $("#numRows").val();

        if (!numRows) {
            numRows = 10;
        }

        var searchTerm = $("#searchQuery").val().toLowerCase();

        var postData = {
            q: 'title:' + '(' + header_query + ')' + ' AND description:' + query,
            qf: header_query^2&query,
            rows: numRows,
            wt: 'json',
            hl: 'true',                     // Enable highlighting
            'hl.simple.pre': '<b>',      // HTML tag to wrap the beginning of a highlighted term
            'hl.simple.post': '</b>',    // HTML tag to wrap the end of a highlighted term
            'hl.fl': 'title,description'    // Specify the fields to highlight

        };

        console.log("postData: ", postData);

        $.ajax({

            type: 'POST', // Use POST method
            crossDomain: true,
            url: solrUrl,
            data: postData, // Pass the query parameters in the request body

            success: function (data) {
                dataU = data;
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

                    // resp.append("<h2>" + outp[0] + "</h2>" + "<br>" + outp[1] + "<br><br>" + "<hr>");


                    var highlightedTitle = data.highlighting[data.response.docs[i].id].title;           // Get highlighted title
                    var highlightedDescription = data.highlighting[data.response.docs[i].id].description; // Get highlighted description


                    // resp.append("<h2 class='headline'>" + (highlightedTitle || outp[0]) + "</h2>" + "<br>" + (highlightedDescription || outp[1]) + "<br><br>" + "<hr>");

                    resp.append("<h3><a target = '_blank' class='headline' data-article-index='" + i + "'>" + (highlightedTitle || outp[0]) + "</a></h3>" + "<br><div class='cont'>" + (highlightedDescription || outp[1]) + "</div><br><br>" + "<hr>");

                    i++;
                }
            },
            error: function (xhr, status, error) {
                console.error("Error: ", error);
            }
        });
    });

    // Inside your $(document).ready(function() {...}) block
    $(document).on("click", ".headline", function () {
        // event.preventDefault();

        var articleIndex = $(this).data("article-index"); // Get the article index from the clicked link

        var articleData = dataU.response.docs[articleIndex];

        var articleTitle = articleData.title;
        var articleDescription = articleData.description; // Get the data for the clicked article


        var form = $('<form>', {
            action: 'article_template.php',
            method: 'post'
        });

        form.append($('<input>', {
            type: 'hidden',
            name: 'title',
            value: articleTitle
        }));
        form.append($('<input>', {
            type: 'hidden',
            name: 'description',
            value: articleDescription
        }));

        $('body').append(form);
        form.submit();
        // Redirect to a separate HTML page with article content using query parameters
        // window.location.href = "article_template.html?title=" + encodeURIComponent(articleData.title) + "&description=" + encodeURIComponent(articleData.description);
    });

});
