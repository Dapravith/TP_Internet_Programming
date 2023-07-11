<?php
    if (isset ($_POST['Submit'])) {
        $emp_name = trim($_POST["emp_name"]);
        $emp_number = trim($_POST["emp_number"]) ;
        $emp_email = trim($_POST["emp_email"]);

        if ($emp_name == "") {
            $errorMsg = "error : you did not enter a name.";
            $code = "1"; echo $errorMsg;
            
        }elseif ($emp_number == ""){
            $errorMsg = "error : Please enter number.";
            $code = "2"; echo $errorMsg;
        }
        //check if the number field is numeric
        elseif (is_numeric(trim($emp_number)) == false) {
            $errorMsg = "error : Please enter numeric number.";
            $code = "2"; echo $errorMsg;
        }elseif (strlen($emp_number) < 10) {
            $errorMsg = "error : Number should be ten digits.";
            $code = "2"; echo $errorMsg;
        }
        //check if email field is empty
        elseif ($emp_email == "") {
            $errorMsg = "error : Please enter enter a email.";
            $code = "3"; echo $errorMsg;
        }
        //check for valid email
        elseif  (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-z]{2,6}$/i",$emp_email)) {
            $errorMsg = "error : You  did not enter a valid email.";
            $code = "3"; echo $errorMsg;
        }else{
            echo "Success";
            //final code will execute here.
        }
    }
?>