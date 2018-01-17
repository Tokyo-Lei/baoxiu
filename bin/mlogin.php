<?php 
    require 'conn.php';
    error_reporting(0);
    header("Content-Type:text/html;charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST,GET");
    $data=[];
    $mid=$_GET['mid'];
    $mcod=$_GET['mcod'];
    if ($mid&&$mcod) {
    $results = $database->select("manager", ["mcod"], ["mid" => $mid]);
    if (count($results)==0) {
        $data['info']="沒有该账号";
    }elseif (count($results)>0) {
        if ($mcod!=$results[0]['mcod']) {
            $data['info']="输入的账号密码错误";
        }elseif ($mcod==$results['0']["mcod"]) {
            $data['info']="登录成功";
        }
    }
    }else{
        $data['info']="账号信息错误";
    }
    echo json_encode($data);
?>