<?php 
require 'conn.php';
error_reporting(0);
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET");
$data=[];
$tableName=$_GET['tableName'];
$tableName="repair";
$results = $database->select($tableName, "*");
$results[]=111;
 // var_dump($results);
echo $str=json_encode($results);
// var_dump([1,'11']);
?>


