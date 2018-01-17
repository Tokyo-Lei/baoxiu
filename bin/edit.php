<?php 
require 'conn.php';
error_reporting(0);
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET");
$data=[];
$qoh=$_GET['qoh'];
$threshold=$_GET['threshold'];
$teachaid=$_GET['teachaid'];
// $tableName="repair";



//  var_dump($results);
// echo $str=json_encode($results);
$database->update("stock", [
    "qoh" =>$qoh ,
    "threshold"=>$threshold
], [
    "teachaid" => $teachaid
]);
$data['info']="修改成功";
echo json_encode($data);