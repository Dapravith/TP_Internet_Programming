<?php 
  if(isset($_POST["SubmitBtn"])){

      $fileName = basename($_FILES["resume"]["name"]);
      $fileSize = $_FILES["resume"]["size"] / 1024;
      $fileType = $_FILES["resume"]["type"];
      $fileTmpName = $_FILES["resume"]["tmp_name"];
      if($fileType=="application/msword" || $fileType=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" ){
          if($fileSize<=200){
              $random = rand(1111,9999);
              $newFileName = $random.$fileName;
              $uploadPath = "testUpload/".$newFileName;
              
              if(move_uploaded_file($fileTmpName,$uploadPath)){
                  echo "Successfully"."<br>";
                  echo "File Name: ". $newFileName."<br>";
                  echo "File Size: ". $fileSize. "Kb"."<br>";
                  echo "File Type: ". $fileType."<br>";
              }else{
                  echo "fail";
              }
          }else{
              echo "Maximum upload file size is limit is 200Kb";
          }
      }else{
          echo "You can upload only word File";
      }
  }
?>