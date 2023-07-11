<html>
    <?php
        session_start();

        //storing session data
        $_SESSION["username"] = "dapravith";
        $_SESSION["email"] = "dapravith@gmail.com";

        //retrieve session data
        echo $_SESSION["username"];
        echo "<br><br>";
        echo $_SESSION["email"];
    ?>
</html>