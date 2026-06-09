<?php
/**
 * Application Constants and Configuration
 * Defines all system-wide constants and settings
 */

// Application Settings
define('APP_NAME', 'Mining Safety Management System');
define('APP_VERSION', '1.0.0');
define('APP_BUILD', 'MSMS-2024-001');
define('APP_URL', 'http://localhost/mining_safety_system');
define('APP_ENVIRONMENT', 'development'); // development or production

// Security Settings
define('SESSION_TIMEOUT', 1800); // 30 minutes
define('PASSWORD_RESET_TIMEOUT', 3600); // 1 hour
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOGIN_ATTEMPT_TIMEOUT', 15 * 60); // 15 minutes
define('PASSWORD_MIN_LENGTH', 8);
define('CSRF_TOKEN_LENGTH', 32);

// File Upload Settings
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10 MB
define('ALLOWED_FILE_TYPES', ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif', 'zip']);
define('ALLOWED_IMAGE_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
define('UPLOAD_PATH', __DIR__ . '/../uploads/');

// Email Settings
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-app-password');
define('ADMIN_EMAIL', 'admin@mining.com');
define('FROM_NAME', 'Mining Safety System');
define('EMAIL_ENABLED', false); // Set to true when configured

// SMS Settings (Twilio)
define('SMS_ENABLED', false);
define('TWILIO_SID', 'your-twilio-sid');
define('TWILIO_TOKEN', 'your-twilio-token');
define('TWILIO_FROM', 'your-twilio-number');
define('SMS_ALERT_ENABLED', true);

// GPS Settings
define('GPS_ENABLED', true);
define('GPS_API_KEY', 'your-google-maps-api-key');

// QR Code Settings
define('QR_CODE_ENABLED', true);
define('QR_SIZE', 300);

// PDF Settings
define('PDF_ENABLED', true);
define('PDF_ORIENTATION', 'P'); // P for Portrait, L for Landscape
define('PDF_UNIT', 'mm');

// Role Definitions
define('ROLE_ADMIN', 1);
define('ROLE_SAFETY_OFFICER', 2);
define('ROLE_MINE_MANAGER', 3);
define('ROLE_WORKER', 4);

$ROLE_NAMES = [
    ROLE_ADMIN => 'Administrator',
    ROLE_SAFETY_OFFICER => 'Safety Officer',
    ROLE_MINE_MANAGER => 'Mine Manager',
    ROLE_WORKER => 'Worker'
];

// Role Permissions
$ROLE_PERMISSIONS = [
    ROLE_ADMIN => ['all'],
    ROLE_SAFETY_OFFICER => ['view_incidents', 'create_incidents', 'approve_incidents', 'view_hazards', 'create_hazards', 'view_reports'],
    ROLE_MINE_MANAGER => ['view_incidents', 'view_hazards', 'view_employees', 'manage_equipment', 'view_reports'],
    ROLE_WORKER => ['view_incidents', 'create_incidents', 'view_hazards', 'view_profile', 'view_training']
];

// Incident Status
define('STATUS_PENDING', 'Pending');
define('STATUS_UNDER_INVESTIGATION', 'Under Investigation');
define('STATUS_RESOLVED', 'Resolved');
define('STATUS_CLOSED', 'Closed');
define('STATUS_REJECTED', 'Rejected');

$INCIDENT_STATUSES = [
    STATUS_PENDING,
    STATUS_UNDER_INVESTIGATION,
    STATUS_RESOLVED,
    STATUS_CLOSED,
    STATUS_REJECTED
];

// Incident Severity
define('SEVERITY_LOW', 'Low');
define('SEVERITY_MEDIUM', 'Medium');
define('SEVERITY_HIGH', 'High');
define('SEVERITY_CRITICAL', 'Critical');

$INCIDENT_SEVERITIES = [
    SEVERITY_LOW => ['color' => 'success', 'score' => 1],
    SEVERITY_MEDIUM => ['color' => 'warning', 'score' => 2],
    SEVERITY_HIGH => ['color' => 'danger', 'score' => 3],
    SEVERITY_CRITICAL => ['color' => 'dark', 'score' => 4]
];

// Equipment Status
define('EQUIPMENT_OPERATIONAL', 'Operational');
define('EQUIPMENT_MAINTENANCE', 'Maintenance');
define('EQUIPMENT_OUT_OF_SERVICE', 'Out of Service');

$EQUIPMENT_STATUSES = [
    EQUIPMENT_OPERATIONAL,
    EQUIPMENT_MAINTENANCE,
    EQUIPMENT_OUT_OF_SERVICE
];

// Hazard Status
define('HAZARD_IDENTIFIED', 'Identified');
define('HAZARD_CONTROLLED', 'Controlled');
define('HAZARD_ELIMINATED', 'Eliminated');
define('HAZARD_MONITORING', 'Monitoring');

$HAZARD_STATUSES = [
    HAZARD_IDENTIFIED,
    HAZARD_CONTROLLED,
    HAZARD_ELIMINATED,
    HAZARD_MONITORING
];

// Training Status
define('TRAINING_SCHEDULED', 'Scheduled');
define('TRAINING_ONGOING', 'Ongoing');
define('TRAINING_COMPLETED', 'Completed');
define('TRAINING_PENDING', 'Pending');

$TRAINING_STATUSES = [
    TRAINING_SCHEDULED,
    TRAINING_ONGOING,
    TRAINING_COMPLETED,
    TRAINING_PENDING
];

// PPE Status
define('PPE_AVAILABLE', 'Available');
define('PPE_ALLOCATED', 'Allocated');
define('PPE_DAMAGED', 'Damaged');
define('PPE_EXPIRED', 'Expired');

$PPE_STATUSES = [
    PPE_AVAILABLE,
    PPE_ALLOCATED,
    PPE_DAMAGED,
    PPE_EXPIRED
];

// Incident Types
$INCIDENT_TYPES = [
    'Near Miss',
    'Property Damage',
    'Injury',
    'Fatality',
    'Environmental',
    'Equipment Failure',
    'Chemical Exposure',
    'Fire/Explosion',
    'Fall from Height',
    'Trapped/Stuck',
    'Other'
];

// Hazard Categories
$HAZARD_CATEGORIES = [
    'Chemical',
    'Biological',
    'Physical',
    'Ergonomic',
    'Mechanical',
    'Thermal',
    'Electrical',
    'Noise',
    'Radiation',
    'Environmental'
];

// Equipment Types
$EQUIPMENT_TYPES = [
    'Excavator',
    'Drill',
    'Truck',
    'Loader',
    'Compressor',
    'Generator',
    'Pump',
    'Conveyor',
    'Safety Equipment',
    'Monitoring Device',
    'Other'
];

// Risk Levels
define('RISK_LOW', 'Low');
define('RISK_MEDIUM', 'Medium');
define('RISK_HIGH', 'High');
define('RISK_CRITICAL', 'Critical');

$RISK_LEVELS = [
    RISK_LOW => ['score' => 1, 'color' => 'success'],
    RISK_MEDIUM => ['score' => 2, 'color' => 'warning'],
    RISK_HIGH => ['score' => 3, 'color' => 'danger'],
    RISK_CRITICAL => ['score' => 4, 'color' => 'dark']
];

// Timezone
date_default_timezone_set('UTC');

// Pagination
define('ITEMS_PER_PAGE', 20);
define('CHART_ITEMS_LIMIT', 10);

// Reports Path
define('REPORTS_PATH', __DIR__ . '/../uploads/reports/');
define('CERTIFICATES_PATH', __DIR__ . '/../uploads/certificates/');
define('INCIDENT_UPLOADS_PATH', __DIR__ . '/../uploads/incidents/');
define('PROFILE_UPLOADS_PATH', __DIR__ . '/../uploads/profiles/');
define('DOCUMENT_UPLOADS_PATH', __DIR__ . '/../uploads/documents/');

// Logging
define('LOG_ENABLED', true);
define('LOG_PATH', __DIR__ . '/../logs/');

// Cache Settings
define('CACHE_ENABLED', true);
define('CACHE_DURATION', 3600); // 1 hour

// API Settings
define('API_RATE_LIMIT', 100);
define('API_RATE_LIMIT_WINDOW', 3600);

?>