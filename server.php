<?php
$_POST = json_decode(file_get_contents("php://input", true)); //получаем json данные 
echo var_dump($_POST);//эта команда берет данные с клиента превращает их в строку и показывает обратно на клиенте