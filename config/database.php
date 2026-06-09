<?php
/**
 * Database Configuration File
 * Handles all database connections and settings
 * @package Mining Safety Management System
 * @version 1.0.0
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'mining_safety_system');
define('DB_PORT', 3306);
define('DB_CHARSET', 'utf8mb4');

/**
 * Establish database connection
 * Uses MySQLi for prepared statements and security
 */
try {
    // Create connection with error handling
    $conn = new mysqli(
        DB_HOST,
        DB_USER,
        DB_PASS,
        DB_NAME,
        DB_PORT
    );
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }
    
    // Set charset to utf8mb4 for better Unicode support
    if (!$conn->set_charset(DB_CHARSET)) {
        throw new Exception('Error loading character set utf8mb4: ' . $conn->error);
    }
    
    // Set connection options
    $conn->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
    
} catch (Exception $e) {
    error_log('Database Connection Error: ' . $e->getMessage());
    die('Database connection error. Please contact administrator.');
}

// Enable error reporting for development
if (APP_ENVIRONMENT === 'development') {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
}

/**
 * Helper function to get database connection
 * @return mysqli
 */
function getDBConnection() {
    global $conn;
    return $conn;
}

/**
 * Helper function to prepare and execute query
 * @param string $query SQL query with placeholders
 * @param array $params Query parameters
 * @param string $types Parameter types (i, d, s, b)
 * @return mysqli_stmt|false
 */
function prepareQuery($query, $params = [], $types = '') {
    global $conn;
    
    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        error_log('Prepare failed: ' . $conn->error);
        return false;
    }
    
    if (!empty($params)) {
        if (!$stmt->bind_param($types, ...$params)) {
            error_log('Bind param failed: ' . $stmt->error);
            return false;
        }
    }
    
    if (!$stmt->execute()) {
        error_log('Execute failed: ' . $stmt->error);
        return false;
    }
    
    return $stmt;
}

?>