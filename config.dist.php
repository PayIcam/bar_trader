<?php
global $bdd_login;
global $bdd_password;
global $bdd_url;
global $bdd_database;

$bdd_login = "";
$bdd_password = "";
$bdd_url = "";
$bdd_database = "";

$_CONFIG = [
    'payicam' => [
        'key'=>'',
        'url'=>'',
    ],
    'ginger' => [
        'key'=>'',
        'url'=>'',
    ],
    'cas_url' => '',
    'public_url' => 'http://localhost/www_dev_payicam/html/bar_trader/',
    'base_path' => '/www_dev_payicam/html/bar_trader/',
];
