<?php

class CredentialsReader {

    const PATH_TO_XML = '../xml/db_credentials.xml';

    public function getDBCredentials() {

        $xpaths = array(
            'domain' => '/credentials/domain/db/text()',
            'path_to_password' => '/credentials/path_to_password/db/text()',
        );

        $credentials_array = $this->getCredentials(self::PATH_TO_XML, $xpaths);
        $path_to_xml = $credentials_array['path_to_password'];
        unset($credentials_array['path_to_password']);

        $xpaths = array(
            'password' => '/credentials/password/db/text()',
            'login' => '/credentials/login/db/text()'
        );

        return array_merge($credentials_array, $this->getCredentials($path_to_xml, $xpaths));
    }


    private function getCredentials($path_to_xml,$xpaths){
        $simple_xml_element = simplexml_load_file($path_to_xml);

        $credentials = array();

        foreach ($xpaths as $keyword => $value) {
            $result_array = $simple_xml_element->xpath($value);
            $credentials[$keyword] = (string) $result_array[0];
        }

        return $credentials;
    }


}

$bla = new CredentialsReader();
var_dump($bla->getDBCredentials());