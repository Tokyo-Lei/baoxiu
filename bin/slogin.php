<?php 
    require 'conn.php';
    error_reporting(0);
    header("Content-Type:text/html;charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST,GET");
    $data=[];
    $sid=$_GET['sid'];
    $scod=$_GET['scod'];
    if ($sid&&$scod) {
    $results = $database->select("student", ["scod"], ["sid" => $sid]);
    if (count($results)==0) {
        $data['info']="沒有该账号";
    }elseif (count($results)>0) {
        if ($scod!=$results[0]['scod']) {
            $data['info']="输入的账号密码错误";
        }elseif ($scod==$results['0']["scod"]) {
            $data['info']="登录成功";
        }
    }
    }else{
        $data['info']="账号信息错误";
    }
    echo json_encode($data);
?>