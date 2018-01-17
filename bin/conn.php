<?php
require 'Medoo.php';
use Medoo\Medoo;
$database = new Medoo([
    // 必须配置项
    'database_type' => 'mysql',
    'database_name' => 'test4',
    'server' => '127.0.0.1',
    'username' => 'root',
    'password' => 'root',
    'charset' => 'utf8',
 
    // 可选参数
    'port' => 3306,
    'option' => [
        PDO::ATTR_CASE => PDO::CASE_NATURAL
    ]
]);
?>