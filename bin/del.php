<?php 
require 'conn.php';
error_reporting(0);
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET");
//从前端接收值
$mid=$_GET['mid'];
$tableName=$_GET['tableName'];
$id = $_GET['id'];


if($tableName=="supplement"){
	$sid = $_GET['id'];
 	$results1 = $database->select("supplement",["qty","teachaid"],["spid" => $sid]);
 		foreach($results1 as $key1 => $value1){
		$qty=$value1['qty'];
		$teachaid=$value1['teachaid'];
	}
	$results = $database->select("stock",["qoh","threshold"],["teachaid" => $teachaid]);

	foreach($results as $key => $value){
		$qoh=$value['qoh'];
		$threshold=$value['threshold'];
	}
	$now_qoh = $qoh - $qty;
	$plus_qoh = $qoh + $qty;
	$new_qoh = 2 * $qoh;
	if($qoh < $qty){
		$datas['info']="库存为".$qoh."，不能满足教具需求，请增加库存！";
		echo $str=json_encode($datas);
		exit();
	}elseif($now_qoh >=$threshold){
		$datas['info']="当前产品剩余数量为".$now_qoh."。产品量阈值为".$threshold;
	}elseif($now_qoh < $threshold){
		$datas['info']="当前产品剩余数量为".$new_qoh."。购进数量为".$plus_qoh;
	}

}
if($tableName=="repair"){
	$result = "delete from repair where rid =".$id;
}
elseif($tableName=="supplement"){
	$result = "delete from supplement where spid =".$id;
}

$database->query($result);
if($tableName!=""){
	$datas['info']=$datas['info']."处理成功";
}else {
	$datas['info']=$datas['info']."处理失败";
}

echo $str=json_encode($datas);
?>