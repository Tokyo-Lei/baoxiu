<?php 
require 'conn.php';
error_reporting(0);
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET");
$data=[];
$teachaid=$_GET['teachaid'];
$type=$_GET['searchType'];
$bname=$_GET['bname'];
// $tableName="repair";
// $teachaid="chalk_c";
if ($type==1) {
	$results = $database->query("SELECT sid, bname, teachaid, sum(qty) from supplement
where  teachaid= '$teachaid' group by bname")->fetchAll(PDO::FETCH_ASSOC);
}elseif ($type==2) {
	$results = $database->query("SELECT sid, bname, floor, room, teachaid, qty from supplement
where  bname = '$bname'")->fetchAll(PDO::FETCH_ASSOC);
}
// $results['info']="查询成功";
 // var_dump($results);
echo $str=json_encode($results);