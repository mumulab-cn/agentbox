<?php 
    // 读取配置文件
    $configFile = '../config/feishu_config.json';
    if (!file_exists($configFile)) {
        die('配置文件不存在，请先访问 config.php 进行配置');
    }
    
    $config = json_decode(file_get_contents($configFile), true);
    if (!$config) {
        die('配置文件格式错误');
    }
    
    // 验证必要的配置项
    if (empty($config['app_id']) || empty($config['app_secret']) || empty($config['base_url'])) {
        die('配置文件缺少必要参数，请检查 app_id、app_secret 和 base_url');
    }
    
    $url = $config['base_url'] . '?page_size=' . ($config['page_size'] ?? 2000);

	$app_id = $config['app_id'];
	$app_secret = $config['app_secret'];
	$tenant_access_token = getTenantAccessToken($app_id,$app_secret);
	
	$data = array(
		"conversation_id"=>$config['conversation_id'] ?? "123"
	);
	
	$options = array(
			"http"=>array(
					"method"=>"POST",
					"header"=>
						"Authorization: Bearer ".$tenant_access_token."\r\n".
						"Content-Type: application/json; charset=utf-8",
					"content"=>json_encode($data)
			)
	);
	
	$result_tmp = file_get_contents($url,false,stream_context_create($options));
    $result = json_decode($result_tmp,true);

    $new_data = array();
    foreach($result["data"]["items"] as $item){
        //var_dump($item);
        //echo "<hr />";
        $new_data[] = $item["fields"];
    }

    file_put_contents($config['data_file_path'] ?? "../data/feishu_data.json", json_encode($new_data));

	function getTenantAccessToken($app_id,$app_secret){
		$url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal";
		$data = array(
			"app_id"=>$app_id,
			"app_secret"=>$app_secret
		);
		$content = http_build_query($data);
		
		$options = array(
					"http"=>array(
							"method"=>"POST",
							"header"=>array(
								"Content-Type: application/x-www-form-urlencoded"
							),
							"content"=>$content
					)
		);
		
		$result = file_get_contents($url,false,stream_context_create($options));
		$result = json_decode($result,true);
		$tenant_access_token = $result["tenant_access_token"];
		return $tenant_access_token;
	}

	echo $data;
	return ;
?>