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
    <div class="contents">
        <label for="searchQuery">Search Queries: </label>
        <input type="text" id="searchQuery" name='q' placeholder="Enter search query">

        <div id="container"></div>
        <button id="addButton">+</button>


        <br>
        <br>

        <label for="numRows">Number of rows: </label>
        <input type="text" id="numRows" name='nr' placeholder="Enter number of results">

        <!-- <button id="submit">Submit</button> -->

        <br>
        <br>
        <button id="searchButton" type="submit">Search</button>
        <hr>


        <p id="count"></p>

        <!-- <pre id="results" style="margin: auto; width: 80vw; white-space: pre-line;"></pre> -->
        <p id="result" style="margin: auto; white-space: pre-line"></p>
    </div>

    <script src="script2.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
        crossorigin="anonymous"></script>
</body>

</html>