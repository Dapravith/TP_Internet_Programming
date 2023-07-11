<html>

<body>
    <?php include "vendor/autoload.php"; ?>
    <?php
        ini_set('display_errors', 1);
        use Intervention\Image\ImageManagerStatic as Image;
        $Image = Image::make("upload/logo.png")->resize(200,200)->save("img/thumbnail.jpg",100);
    ?>
</body>
</html>