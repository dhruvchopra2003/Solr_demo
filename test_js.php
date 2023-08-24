<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test_js</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
    <!-- refresh navbar -->
    <nav class="navbar bg-body-tertiary">
        <!-- <div class="container"> -->
        <a class="navbar-brand" href="http://localhost/Solr_demo/test_js.php">
            <button class="ref">Refresh</button>
        </a>
        <!-- </div> -->
    </nav>
    <div class="d-flex flex-row container w-100 contents">
        <div class="left_form flex-fill">
            <h4>Search Header:</h4>
            <input type="text" id="searchHeader" name='h' placeholder="Search Headers" style="width: 25vw;">
            <br><br>

            <h4>Search Articles: </H4>
            <textarea rows="3" id="searchQuery" name='q' placeholder="Enter search query"
                style="width: 25vw;"></textarea>
            <!-- <input type="text" id="searchQuery" name='q' placeholder="Enter search query"> -->

            <div id="container"></div>
            <button id="addButton">+</button>


            <br>
            <br>

            <h4>Number of rows:</h4>
            <input type="text" id="numRows" name='nr' placeholder="Enter number of results" style="width: 25vw;">

            <!-- <button id="submit">Submit</button> -->

            <br>
            <br>
            <button id="searchButton" type="submit">Search</button>
        </div>

        <div class="right_queries flex-fill w-50">
            <h2>Sample Queries: </h2>
            <p>
            <ol>
                <li> Word "a" occurs within 7 words of word 'b' -> <strong>"a b"~7</strong></li>
                <li> Simple AND/OR statements-> <strong>((Nazi OR Iron) AND (War OR Man))</strong></li>
                <li> Find word within x words from the beginning ->
                    <strong><br>
                        {!spanNear slop=0 positionIncrementGap=6}spanNear(\'your_word_here\')</strong>
                </li>

                <li>To fetch articles where a specific word occurs exactly three times
                    -><strong>"your_word_here"~3'</strong>
                </li>
                <li>To fetch articles where a word 'a' is present but 'b' is not present within 5 words -></li>
                <strong>a NOT b ~5</strong>
                </p>
        </div>
    </div>
    <hr>


    <p id="count"></p>

    <!-- <pre id="results" style="margin: auto; width: 80vw; white-space: pre-line;"></pre> -->
    <p id="result" style="margin: auto; white-space: pre-line"></p>


    <script src="script2.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
        crossorigin="anonymous"></script>
</body>

</html>