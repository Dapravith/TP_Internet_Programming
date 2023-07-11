<html>
    <?php
        define("EMAIL", "me@example.com");
        echo EMAIL."<br>";

        define("myCon", true);
        if(myCon){
            echo EMAIL."<br>";
        }
        define("ONECONSTANT", "some value");

        define("CONSTANT", "Hello world.");
        echo CONSTANT."<br>";
    ?>
</html>