<?php 
    include_once("common.php");
?>
<div class="iframe-content">
    <div style="width:100%;">
        <div class="block-title">行业场景</div>
        <div class="block-content">每个平台提供不同的评估方式，可以跨平台进行评估</div>
    </div>
    <div class="clear"></div>
    
    <?php 
        $data = file_get_contents("../data/changjing.txt");
        $data = explode("\r\n",$data);
        

        $new_data = array();
        foreach($data as $item){
            if(preg_match("/##/",$item)){
                $a = trim($item,"##");
                continue;
            }

            $item = preg_replace("/[\d]{0,3}\./","",$item);
            if(empty($item)){
                continue;
            }
            $new_data[$a][] = $item;
        }
    ?>

    <div>
        <?php 
            foreach($new_data as $key=>$rows){
        ?>
            <div>
                <div class="block-title"><?php echo $key;?></div>
                <?php foreach($rows as $item){?>
                    <div class="changjing-item left"><?php echo $item;?></div>
                <?php }?>
            </div>
            <div class="clear"></div>
        <?php }?>
    </div>
</div>