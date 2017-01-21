<?php
/**
 * App builder
 *
 * @author Pierre HUBERT
 */

//Main directory
$mainDir = __DIR__."/";

//Get main html file
$mainSource = file_get_contents($mainDir."index.html");

//Get JS files list
preg_match_all('#<script(.*?)src=(.*?)></script>#is', $mainSource, $JSfiles, PREG_PATTERN_ORDER);

//Get CSS files list
preg_match_all('#<link rel="stylesheet"(.*?)href=(.*?)>#is', $mainSource, $CSSfiles, PREG_PATTERN_ORDER);

//Change CSS references to included source
foreach($CSSfiles[2] as $fileID=>$uri){
    //Prepare URL
    $fileURI = str_replace(array("'", '"'), "", $uri);
    
    //Get file content
    $fileSource = file_get_contents($mainDir.$fileURI);

    //Uglifycss
    $fileSource = str_replace("\n", "", $fileSource);
    $fileSource = str_replace("  ", " ", $fileSource);

    //Apply source
    //$newSource = '<link rel="stylesheet" href="data:text/css;base64,'.base64_encode($fileSource).'" />';
    $newSource = "<style type='text/css'>".$fileSource."</style>";
    $mainSource = str_replace($CSSfiles[0][$fileID], $newSource, $mainSource);
}

//Change JS references to included source
foreach($JSfiles[2] as $fileID=>$uri){
    //Prepare URL
    $fileURI = str_replace(array("'", '"'), "", $uri);
    
    exec("uglifyjs '".$mainDir.$fileURI."'", $out);
    $fileSource = implode("\n", $out);
    
    //Apply source
    $newSource = "<script type='text/javascript'>".$fileSource."</script>";
    $mainSource = str_replace($JSfiles[0][$fileID], $newSource, $mainSource);

    //Remove old variables
    unset($out);
    unset($fileSource);
    unset($newSource);
    unset($uri);
    unset($fileID);
    unset($fileURI);
}

//Write result
file_put_contents("build.html", $mainSource);
echo "The app has been built. \n";
echo "Out: build.html";