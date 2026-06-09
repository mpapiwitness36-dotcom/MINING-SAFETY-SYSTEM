<?php
/**
 * Main Configuration File
 * Initialize application settings and load required files
 * @package Mining Safety Management System
 * @version 1.0.0
 */

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', APP_ENVIRONMENT === 'development' ? 1 : 0);
ini_set('log_errors', 1);
ini_set('error_log', LOG_PATH . 'error.log');

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
    
    // Set secure session options
    ini_set('session.use_only_cookies', 1);
    ini_set('session.use_strict_mode', 1);
    ini_set('session.cookie_httponly', 1);
    ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 1 : 0);
    ini_set('session.cookie_samesite', 'Strict');
}

// Session timeout check
$timeout = SESSION_TIMEOUT;
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $timeout) {
    // Clear session
    $_SESSION = [];
    
    // Destroy session
    if (session_id()) {
        setcookie(session_name(), '', time() - 3600, '/');
    }
    session_destroy();
    
    // Redirect to login
    header('Location: ' . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]/mining_safety_system/login.php?timeout=1");
    exit;
}

// Update last activity time
$_SESSION['last_activity'] = time();

// Define base path
define('BASE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR);

// Create necessary directories if they don't exist
$directories = [
    LOG_PATH,
    REPORTS_PATH,
    CERTIFICATES_PATH,
    INCIDENT_UPLOADS_PATH,
    PROFILE_UPLOADS_PATH,
    DOCUMENT_UPLOADS_PATH
];

foreach ($directories as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// Auto-load classes using PSR-4 standards
spl_autoload_register(function ($class) {
    $dirs = [
        BASE_PATH . 'models' . DIRECTORY_SEPARATOR,
        BASE_PATH . 'controllers' . DIRECTORY_SEPARATOR,
        BASE_PATH . 'helpers' . DIRECTORY_SEPARATOR
    ];
    
    foreach ($dirs as $dir) {
        $file = $dir . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');

// Content Security Policy (CSP)
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdnjs.cloudflare.com cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' maps.googleapis.com;");

// Set error handler
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        return false;
    }
    
    $errorLog = date('Y-m-d H:i:s') . " | " . "[$errno] $errstr in $errfile:$errline" . PHP_EOL;
    error_log($errorLog, 3, LOG_PATH . 'error.log');
    
    if (APP_ENVIRONMENT === 'development') {
        echo "<pre>Error: $errstr in $errfile on line $errline</pre>";
    }
    
    return true;
});

// Set exception handler
set_exception_handler(function ($exception) {
    $errorLog = date('Y-m-d H:i:s') . " | Exception: " . $exception->getMessage() . " in " . $exception->getFile() . ":" . $exception->getLine() . PHP_EOL;
    error_log($errorLog, 3, LOG_PATH . 'error.log');
    
    if (APP_ENVIRONMENT === 'development') {
        echo "<pre>Exception: " . $exception->getMessage() . "</pre>";
    } else {
        die('An unexpected error occurred. Please contact administrator.');
    }
});

// CSRF Token management
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(CSRF_TOKEN_LENGTH));
}

/**
 * Helper function to get CSRF token
 * @return string
 */
function getCsrfToken() {
    return $_SESSION['csrf_token'] ?? '';
}

/**
 * Helper function to verify CSRF token
 * @param string $token
 * @return bool
 */
function verifyCsrfToken($token) {
    return hash_equals($_SESSION['csrf_token'] ?? '', $token);
}

?>