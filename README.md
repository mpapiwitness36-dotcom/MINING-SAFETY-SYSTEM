# Mining Safety Management System

A comprehensive PHP-based Mining Safety Management System built with MySQL, Bootstrap, and modern web technologies.

## Features

### Core Functionality
- **Role-Based Access Control**: Administrator, Safety Officer, Mine Manager, Worker
- **User Management**: Secure registration, login, and profile management
- **Incident Management**: Report, track, and manage incidents with status workflow
- **Hazard Reporting**: Log and monitor workplace hazards
- **Equipment Management**: Inspection records and maintenance tracking
- **Safety Training**: Training program management and employee tracking
- **PPE Tracking**: Personal Protective Equipment inventory and allocation
- **Emergency Management**: Emergency contacts and alert system

### Advanced Features
- **Real-time Alerts**: Emergency notifications and alerts
- **GPS Location Capture**: Track incident locations
- **QR Code Generation**: Employee IDs and safety reports
- **PDF Export**: Generate reports in PDF format
- **Analytics Dashboard**: Charts and data visualization
- **Audit Logs**: Complete system activity tracking
- **Risk Assessment**: Predictive risk scoring
- **SMS/Email Notifications**: Multi-channel alerts
- **Search & Filtering**: Advanced data filtering by site, department, date, type, severity

### Security Features
- Prepared SQL statements (SQL Injection protection)
- Password hashing (bcrypt)
- Session management with timeouts
- Input validation and sanitization
- CSRF protection
- Rate limiting on login attempts

## Project Structure

```
mining_safety_system/
├── config/
│   ├── database.php
│   ├── constants.php
│   └── config.php
├── includes/
│   ├── header.php
│   ├── navbar.php
│   ├── sidebar.php
│   └── footer.php
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── dashboard.css
│   ├── js/
│   │   ├── main.js
│   │   ├── charts.js
│   │   └── notifications.js
│   ├── images/
│   │   └── logo.png
│   └── vendor/
│       └── (Bootstrap, jQuery, etc.)
├── controllers/
│   ├── AuthController.php
│   ├── UserController.php
│   ├── IncidentController.php
│   ├── HazardController.php
│   ├── EquipmentController.php
│   ├── TrainingController.php
│   ├── PPEController.php
│   ├── ReportController.php
│   └── NotificationController.php
├── models/
│   ├── User.php
│   ├── Incident.php
│   ├── Hazard.php
│   ├── Equipment.php
│   ├── Training.php
│   ├── PPE.php
│   ├── AuditLog.php
│   └── Notification.php
├── views/
│   ├── auth/
│   │   ├── login.php
│   │   ├── register.php
│   │   └── forgot_password.php
│   ├── dashboard/
│   │   ├── admin_dashboard.php
│   │   ├── officer_dashboard.php
│   │   ├── manager_dashboard.php
│   │   └── worker_dashboard.php
│   ├── incidents/
│   │   ├── list.php
│   │   ├── create.php
│   │   ├── view.php
│   │   └── edit.php
│   ├── hazards/
│   │   ├── list.php
│   │   ├── create.php
│   │   └── view.php
│   ├── employees/
│   │   ├── list.php
│   │   ├── add.php
│   │   ├── edit.php
│   │   └── profile.php
│   ├── equipment/
│   │   ├── list.php
│   │   ├── add.php
│   │   ├── inspections.php
│   │   └── maintenance.php
│   ├── training/
│   │   ├── list.php
│   │   ├── create.php
│   │   ├── enroll.php
│   │   └── certificates.php
│   ├── ppe/
│   │   ├── list.php
│   │   ├── allocate.php
│   │   └── inventory.php
│   ├── reports/
│   │   ├── incident_report.php
│   │   ├── hazard_report.php
│   │   ├── analytics.php
│   │   ├── risk_assessment.php
│   │   └── compliance.php
│   ├── admin/
│   │   ├── users.php
│   │   ├── approvals.php
│   │   ├── audit_logs.php
│   │   ├── system_settings.php
│   │   └── backups.php
│   └── profile/
│       ├── view.php
│       ├── edit.php
│       └── change_password.php
├── helpers/
│   ├── ValidationHelper.php
│   ├── EmailHelper.php
│   ├── SMSHelper.php
│   ├── PDFGenerator.php
│   ├── QRCodeGenerator.php
│   ├── GPSHelper.php
│   ├── NotificationHelper.php
│   └── LogHelper.php
├── database/
│   └── mining_safety_system.sql
├── uploads/
│   ├── incidents/
│   ├── profiles/
│   ├── documents/
│   ├── certificates/
│   └── reports/
├── index.php
├── login.php
├── register.php
└── logout.php
```

## Installation & Setup

### Requirements
- XAMPP (or similar local server)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Modern web browser

### Installation Steps

1. **Copy Project to XAMPP**
   ```
   Copy mining_safety_system folder to: C:\xampp\htdocs\ (Windows)
   Or: /Applications/XAMPP/htdocs/ (Mac)
   Or: /opt/lampp/htdocs/ (Linux)
   ```

2. **Create Database**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database named `mining_safety_system`
   - Import `database/mining_safety_system.sql`

3. **Configure Database Connection**
   - Edit `config/database.php`
   - Update hostname, username, password, and database name

4. **Set Permissions**
   ```bash
   chmod -R 755 mining_safety_system/
   chmod -R 777 mining_safety_system/uploads/
   ```

5. **Access the System**
   - Open browser: http://localhost/mining_safety_system
   - Login with default credentials (see database seed data)

## Default User Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mining.com | Admin@123 |
| Safety Officer | officer@mining.com | Officer@123 |
| Mine Manager | manager@mining.com | Manager@123 |
| Worker | worker@mining.com | Worker@123 |

## Security Considerations

- Change all default passwords immediately
- Enable HTTPS in production
- Keep PHP and dependencies updated
- Regularly backup the database
- Review audit logs periodically
- Implement firewall rules

## Support & Documentation

For detailed documentation, refer to individual module READMEs in their respective folders.

## License

Proprietary - For authorized users only

## Version

1.0.0 - Initial Release
