<?php

namespace App\Helpers;

class ContentHelper
{
    /**
     * Load content from file in resources/content directory
     *
     * @param string $filename
     * @return string
     */
    public static function load($filename)
    {
        $path = resource_path('content/' . $filename);
        
        if (file_exists($path)) {
            return file_get_contents($path);
        }
        
        return '';
    }
}
