<?php
	$cmd = "python3 MainHROgramme.py args.json jsonConsole";
	$path = "/var/www/lutherietools/api/python";

/*
{
    "filepath": "Clips audio/Violon.wav",
    "horizon" : 0.02,
    "overlap" : 0.15,
    "nbPoles" : 100,
    "samplerate" : 44100,
		"exportFolder": "exports"
}
*/
	
	// Creation répertoire export
	$target_export = $_POST["exportFolder"];
	$target_export .= "_".time();
	mkdir("/var/www/lutherietools/api/python/exports/".$target_export);
	unset($_POST["exportFolder"]);
	
	// Création args.json
	$content = "";
	file_put_contents($path."/args.json", "{\n");
		foreach($_POST as $name=>$posted) {
		if(is_numeric($posted)) {
			$content .= "\"".$name."\": ".$posted.",\n";
		} else {
			$content .= "\"".$name."\": \"".$posted."\",\n";
		}		
	}
	$content .= "\"exportFolder\": \"".$target_export."\",\n";
	$content = trim($content, ",\n");
	file_put_contents($path."/args.json", $content, FILE_APPEND);
	file_put_contents($path."/args.json", "\n}", FILE_APPEND);

	print $path."/args.json";

	// Appel python
	exec("cd ".$path." && ".$cmd, $output);

?>
<a href="/api/python/exports/<?php print $target_export ?>/Bk.json">Bk.json</a><br/>
<a href="/api/python/exports/<?php print $target_export ?>/Fk.json">Fk.json</a><br/>
<a href="/api/python/exports/<?php print $target_export ?>/Jk.json">Jk.json</a><br/>
<a href="/api/python/exports/<?php print $target_export ?>/T.json">T.json</a><br/>