<!DOCTYPE html>
<html>

<head>
    <title>Article Template</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>

<body>
    <nav class="navbar bg-body-tertiary">
        <!-- <div class="container"> -->
        <a class="navbar-brand" href="http://localhost/Solr_demo/test_js.php">
            <button class="ref">HOME</button>
        </a>


        <h1 id="articleTitle"></h1>
        <p id="articleDescription"></p>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $title = isset($_POST['title']) ? $_POST['title'] : "";
            $description = isset($_POST['description']) ? $_POST['description'] : "";

            echo "<h2>$title</h2>";
            echo "<p>$description<p>";
        } else {
            echo "Article Unavailable";
        }

        ?>
        <script>
            // Get query parameters from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const title = urlParams.get("title");
            const description = urlParams.get("description");

            // Populate the template with the retrieved data
            document.getElementById("articleTitle").innerHTML = title;
            document.getElementById("articleDescription").innerHTML = description;
        </script>
</body>

</html>