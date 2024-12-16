<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $apiKey = 'dzDLiEg8iKpCKSSRwL384dCeSSkdqGLB';
    $url = "https://api.nytimes.com/svc/archive/v1/2024/12.json?api-key=$apiKey";

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($curl);

        if ($result === false) {
            echo json_encode(['error' => 'cURL error: ' . curl_error($curl)]);
            exit();
        } else {
            $data = json_decode($result, true);
            if (isset($data['response']['docs'])) {
                $article = $data['response']['docs'][0];

                $title = $article['headline']['main'];

                $paragraph = $article['abstract'];

                $lead_paragraph = $article['lead_paragraph'];

                echo json_encode(["title" => $title, "abstract" => $paragraph, "lead_paragraph" => $lead_paragraph]);
            } else {
                echo json_encode(['success' => false, 'error' => 'No articles found']);
            }
        }
        curl_close($curl);
}
?>