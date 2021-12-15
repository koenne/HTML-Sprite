var characters = <?php $out = array();
foreach (glob('sprites/*.png') as $filename) {
    $p = pathinfo($filename);
    $out[] = $p['filename'];
}
echo json_encode($out); ?>;