<?php
require_once 'config/config_reader.php';
$pageTitle = getPageTitle('list');
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    <link href="src/css/main.css" rel="stylesheet">
    <link href="src/css/list-page.css" rel="stylesheet">
</head>
<body>
<?php 
    $data = file_get_contents("./data/feishu_data.json");
    $list = json_decode($data,true);

    $index_id = 0;
    $new_data = array(
        "A-资源"=>array("A1-平台"=>array(),"A2-模型"=>array(),"A3-数据"=>array()),
        "B-架构"=>array());
    //$new_data = array("应用方式"=>array(),"Prompt"=>array(),"工具"=>array(),"数据"=>array(),"大模型"=>array(),"基础设施"=>array(),"需求"=>array(),"目标"=>array(),"场景"=>array(),"团队"=>array());
    foreach($list as $key=>$item){
        $new_data[@$item["视图"]][@$item["分类"]][] = $item;
    }

    $img_list = [
            '1' => './src/images/ai-building-blocks/a1.png', // 蓝色
            '2' => './src/images/ai-building-blocks/a2.png', // 绿色
            '3' => './src/images/ai-building-blocks/a3.png', // 紫色
            '4' => './src/images/ai-building-blocks/a4.png', // 橙色
            '5' => './src/images/ai-building-blocks/a5.png', // 红色
            '6' => './src/images/ai-building-blocks/a6.png', // 青色
            '7' => './src/images/ai-building-blocks/a7.png', // 天蓝色
            '0' => './src/images/ai-building-blocks/a8.png', // 粉色
            'default' => '<i class="fas fa-cube"></i>'  // 灰色
        ];

?>

<?php   
        $index_id = 0;
        foreach($new_data as $key1=>$value1){
            echo "<h2>".$key1."</h2>";
            foreach($value1 as $key=>$value){
    ?>
        <div class="category-title"><?php echo $key;?></div>
        <div class="menu_block">
            <?php
                    foreach($value as $k=>$v){
                        $link = isset($v["链接"][0]["text"]) ? @$v["链接"][0]["text"] : "";
                        $link_color = isset($v["链接"][0]["text"]) ? "border:2px solid #FF8800;color:#FF8800;" : "color:#CCCCCC;";
            ?>
            <a href="<?php echo $link?>" target="_blank">
                <div class="resource-item <?php echo isset($v['链接'][0]['text']) ? 'has-link' : 'no-link'; ?>">
                    <div class="image-container">
                        <?php
                            $img_id = $index_id++ % 7;
                            $img_id = isset($img_list[$img_id]) ? $img_id : "default";
                            echo '<img src="'.$img_list[$img_id].'" alt="Resource Image" />';
                        ?>
                    </div>
                    <div class="name"><?php echo $v["名称"][0]["text"]?></div>
                    <div class="category"><?php echo $v["视图"]?> | <?php echo $v["分类"]?></div>
                </div>
            </a>
            <?php }?>
            <div class="clearfix"></div>
        </div>
    <?php }}?>
</body>
</html>