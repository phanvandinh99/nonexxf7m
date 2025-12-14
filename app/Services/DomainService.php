<?php

namespace App\Services;

class DomainService
{
    /**
     * Get domain by key
     *
     * @param string $key
     * @return string
     */
    public static function get($key)
    {
        return config('domains.' . $key, '//www.7m.com.cn');
    }

    /**
     * Get full URL with domain and path
     *
     * @param string $key Domain key
     * @param string $path URL path
     * @return string
     */
    public static function url($key, $path = '')
    {
        $domain = self::get($key);
        
        if (empty($path)) {
            return $domain;
        }
        
        // Remove leading slash from path
        $path = ltrim($path, '/');
        
        return $domain . '/' . $path;
    }

    /**
     * Get all domains
     *
     * @return array
     */
    public static function all()
    {
        return config('domains', []);
    }

    /**
     * Check if domain key exists
     *
     * @param string $key
     * @return bool
     */
    public static function exists($key)
    {
        return config()->has('domains.' . $key);
    }
}
