<?php

if (!defined('ROOT_PATH')) {
	define('ROOT_PATH', '.');
}

if (!defined('APP_VERSION')) {
	define('APP_VERSION', '2.0a');
}

define('AJAX_PATH', ROOT_PATH . '/ajax');
define('LIBRARY_PATH', ROOT_PATH . '/library');
define('STATIC_PATH', ROOT_PATH . '/public_html');
define('SRC_PATH', ROOT_PATH . '/src');
define('UTIL_PATH', ROOT_PATH . '/util');

define('CSS_PATH', STATIC_PATH . '/css');
define('FONT_PATH', STATIC_PATH . '/fonts');
define('IMAGE_PATH', STATIC_PATH . '/images');
define('JAVASCRIPT_PATH', STATIC_PATH . '/javascript');

define('CONTROLLER_PATH', SRC_PATH . '/Controller');
define('VIEW_PATH', SRC_PATH . '/View');

define('DEFAULT_NAVIGATOR', 'left');

define('APP_COMPANY', 'Hendl');
define('APP_NAME', 'SQL Workbench');
define('APP_CHARSET', 'iso-8859-1');
define('APP_TITLE', sprintf('%s %s v%s', APP_COMPANY, APP_NAME, APP_VERSION));

define('APP_SESSION_ATTRIBUTE', strtoupper(str_replace(' ', '_', (APP_COMPANY . APP_NAME))));
define('APP_SINGLETON_ATTRIBUTE', ('SINGLETON' . APP_SESSION_ATTRIBUTE));

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Cache-Control: no-cache");
header("Pragma: no-cache");
header(("Content-Type: text/html; charset=" . APP_CHARSET), true);

import();
ini_set('display_errors', 'On');
error_reporting(E_ALL);
set_time_limit(0);
session_start();

$s_user = Request::getSessionUser();

define('APP_CURR_NAVIGATOR', ($s_user != null ? $s_user->getNavigator() : DEFAULT_NAVIGATOR));

// ***********************************************************************************************************

function import() {

    $lib_folders = getDir(LIBRARY_PATH, 'FOLDER', true);
    $inc_path    = [];

    $inc_path[] = CONTROLLER_PATH;
    $inc_path[] = get_include_path();

    if (!empty($lib_folders)) {
        $inc_path = array_merge($lib_folders, $inc_path);
    }
    else {
        $inc_path = array_merge([LIBRARY_PATH], $inc_path);
    }

    set_include_path(implode(PATH_SEPARATOR, $inc_path));
}

function getPath($path, $filename = null, $extension = null) {

	$aux = [rtrim($path, '/')];

	if ($filename) {

		if ($extension) {

			$string = new PString($filename);

			if (!$string->endsWith($extension)) {
				$extension = '.' . ltrim($extension, '.');
				$filename .= $extension;
			}

		}

		$aux[] = $filename;
	}

	return implode('/', $aux);
}

function getDir($path, $return_extension = null, $fullpath = false, $callback = null) {

    $path = rtrim($path, '/');

    if (isset($return_extension) && $return_extension !== 'FOLDER') {
        $return_extension = '.' . ltrim($return_extension, '.');
    }

    $all = [[], []];

    foreach (new DirectoryIterator($path) as $f) {

        $name = $f->getFilename();
        $full = "{$path}/{$name}";
        $add  = false;

        if (!$f->isDot()) {

            if ($return_extension == null) {
                $add = true;
            }
            elseif ($return_extension == 'FOLDER') {
                $add = $f->isDir();
            }
            elseif ($f->isFile() && substr($name, (strlen($return_extension) * -1)) == $return_extension) {
                $add = true;
            }

            $add = $add && is_callable($callback) ? call_user_func($callback, $name) : $add;

            if ($add) {

                $fname = $fullpath ? $full : "{$name}";

                if (substr($fname, 0, 1) == '_') {
                    $all[0][] = $fname;
                }
                else {
                    $all[1][] = $fname;
                }

            }

        }

    }

    sort($all[1]);

    return array_merge($all[0], $all[1]);
}

function printr($mixed, $return = false) {

    $type = gettype($mixed);

    if ($type != 'array' && $type != 'object') {

        if ($type == 'boolean') {
            $debug = $mixed ? 'true' : 'false';
        }
        else if ($type == 'NULL') {
            $debug = $type;
        }
        else if ($type == 'string') {
            $debug = (!empty($mixed) ? $mixed : 'string(0) ""');
        }
        else {
            $debug = $mixed;
        }

        $debug = sprintf("<p>%s</p>\n", $debug);
    }
    else {
        $debug = sprintf('<pre>%s</pre>', print_r($mixed, true));
    }

	if (!$return) {
		echo $debug;
	}

	return $debug;
}

function assigned($mixed) {
	return ($mixed !== null && $mixed !== '');
}

function __autoload($classname) {
	$classname = str_replace('\\', '/', $classname);
	require("{$classname}.php");
}

function getInfo() {

    $address = [];
	$address[] = ($_SERVER['SERVER_ADDR'] === '::1' ? '127.0.0.1' : $_SERVER['SERVER_ADDR']);
	$address[] = $_SERVER['SERVER_PORT'];

	$address = implode(':', $address);

	return (Request::isLogged() ? PString::format('{0}@{1}', Request::getSessionUserName(), $address) : $address);
}
