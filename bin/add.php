<?php 
require 'conn.php';
error_reporting(0);
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET");
$data=[];
//从前端接收值
$tableName=$_GET['tableName'];
// $tableName="repair";
if($tableName=="repair"){
	$sid = $_GET['sid'];
	$bname = $_GET['bname'];
    $floor = $_GET['floor'];
    $room = $_GET['room'];
    $equip = $_GET['equip'];
	$detail = $_GET['detail'];		
	
// $sid=2014000000;
// $bname="L1";
// $floor=3;
// $room=311;
// $equip="computer";
// $detail="测试";
    $addSql = "call add_repair(".$sid.",".$database->quote($bname).",".$floor.",".$room.",".$database->quote($equip).",".$database->quote($detail).");";
}

elseif($tableName=="supplement"){
	$sid = $_GET['sid'];
	$bname  = $_GET['bname'];
 	$floor = $_GET['floor'];
 	$room = $_GET['room'];
 	$teachaid = $_GET['teachaid'];
 	$qty = $_GET['qty'];
	$results = $database->select("stock",["qoh","threshold"],["teachaid" => $teachaid]);
	if (count($results)==0) {
		$datas['info']="没有该种教具存在，请再确定是否填写正确";
		echo $str=json_encode($datas);
		exit();
	}
	foreach($results as $key => $value){
		$qoh=$value['qoh'];
		$threshold=$value['threshold'];
	}
	$now_qoh = $qoh - $qty;
	$plus_qoh = $qoh + $qty;
	$new_qoh = 2 * $qoh;
	// if($qoh < $qty){
	// 	$datas['info']="库存为".$qoh."，不能满足教具需求，请增加库存！";
	// 	echo $str=json_encode($datas);
	// 	exit();
	// }elseif($now_qoh >=$threshold){
	// 	$datas['info']="当前产品剩余数量为".$now_qoh."。产品量阈值为".$threshold;
	// }elseif($now_qoh < $threshold){
	// 	$datas['info']="当前产品剩余数量为".$new_qoh."。购进数量为".$plus_qoh;
	// }
	$addSql = "call add_supplement(".$sid.",".$database->quote($bname).",".$floor.",".$room.",".$database->quote($teachaid).",".$qty.");";
}

$database->query($addSql);
if($tableName!=""){
	if ($tableName=="repair") {
		$datas['info']="报修成功";
	}elseif($tableName=="supplement") {
		$datas['info']=$datas['info']."<br/>补充成功";
}
	
}else {
	$datas['info']=$datas['info']."添加失败";
}
// var_dump($datas);
echo $str=json_encode($datas);
 ?>
