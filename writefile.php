<?php
while(true)
{
  $date = new DateTime();
  $timestamp = $date->getTimestamp();
  $cmd = "echo \"You are under attack by php !!! - ".$timestamp."\" >> ./test.log";
  echo $timestamp."\n";
  exec($cmd);
}
?>
