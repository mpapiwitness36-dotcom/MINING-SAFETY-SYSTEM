// ===== MINING SAFETY SYSTEM - APPLICATION LOGIC =====

// Database Simulation using LocalStorage
class MiningDatabase {
    constructor() {
        this.incidents = this.getFromStorage('incidents') || [];
        this.workers = this.getFromStorage('workers') || [];
        this.equipment = this.getFromStorage('equipment') || [];
        this.inspections = this.getFromStorage('inspections') || [];
        this.alerts = this.getFromStorage('alerts') || [];
        this.initializeDefaultData();
    }

    initializeDefaultData() {
        if (this.incidents.length === 0) {
            this.incidents = [
                {
                    id: 'INC001',
                    type: 'Gas Leak',
                    location: 'Section A - Level 3',
                    date: new Date().toISOString().split('T')[0],
                    severity: 'High',
                    status: 'Active',
                    description: 'Minor gas leak detected in ventilation shaft'
                },
                {
                    id: 'INC002',
                    type: 'Equipment Failure',
                    location: 'Drill Station 2',
                    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
                    severity: 'Medium',
                    status: 'Resolved',
                    description: 'Drill pump failure - replaced'
                }
            ];
            this.saveToStorage('incidents', this.incidents);
        }

        if (this.workers.length === 0) {
            this.workers = [
                {
                    id: 'W001',
                    name: 'John Mwangi',
                    employeeId: 'EMP001',
                    role: 'Miner',
                    certification: 'Advanced',
                    status: 'Active'
                },
                {
                    id: 'W002',
                    name: 'Sarah Kipchoge',
                    employeeId: 'EMP002',
                    role: 'Safety Officer',
                    certification: 'Advanced',
                    status: 'Active'
                },
                {
                    id: 'W003',
                    name: 'Peter Okonkwo',
                    employeeId: 'EMP003',
                    role: 'Equipment Operator',
                    certification: 'Intermediate',
                    status: 'On Leave'
                }
            ];
            this.saveToStorage('workers', this.workers);
        }

        if (this.equipment.length === 0) {
            this.equipment = [
                {
                    id: 'EQ001',
                    name: 'Main Drill Unit',
                    type: 'Drill',
                    location: 'Drill Station 1',
                    maintenance: new Date().toISOString().split('T')[0],
                    status: 'Operational'
                },
                {
                    id: 'EQ002',
                    name: 'Excavator Model X3',
                    type: 'Excavator',
                    location: 'Section B',
                    maintenance: new Date(Date.now() - 259200000).toISOString().split('T')[0],
                    status: 'Operational'
                }
            ];
            this.saveToStorage('equipment', this.equipment);
        }

        if (this.inspections.length === 0) {
            this.inspections = [
                {
                    id: 'INS001',
                    type: 'Safety Equipment',
                    location: 'All Sections',
                    date: new Date().toISOString().split('T')[0],
                    inspector: 'Sarah Kipchoge',
                    status: 'Completed',
                    findings: 'All equipment in good condition'
                }
            ];
            this.saveToStorage('inspections', this.inspections);
        }

        if (this.alerts.length === 0) {
            this.generateAlerts();
        }
    }

    generateAlerts() {
        const alertTypes = [
            { type: 'danger', title: 'Critical: Gas Level High', message: 'CO2 levels elevated in Section A' },
            { type: 'warning', title: 'Warning: Equipment Maintenance Due', message: 'Excavator 2 needs scheduled maintenance' },
            { type: 'info', title: 'Update: Inspection Completed', message: 'Daily safety inspection completed successfully' }
        ];

        this.alerts = alertTypes.map((alert, index) => ({
            id: `ALT${String(index + 1).padStart(3, '0')}`,
            type: alert.type,
            title: alert.title,
            message: alert.message,
            timestamp: new Date().toISOString(),
            read: false
        }));

        this.saveToStorage('alerts', this.alerts);
    }

    saveToStorage(key, data) {
        localStorage.setItem(`mining_${key}`, JSON.stringify(data));
    }

    getFromStorage(key) {
        const data = localStorage.getItem(`mining_${key}`);
        return data ? JSON.parse(data) : null;
    }

    addIncident(incident) {
        const id = `INC${String(this.incidents.length + 1).padStart(3, '0')}`;
        const newIncident = { id, ...incident, date: new Date().toISOString().split('T')[0] };
        this.incidents.unshift(newIncident);
        this.saveToStorage('incidents', this.incidents);
        this.createAlert(`New Incident: ${incident.type}`, `Severity: ${incident.severity}`, 'danger');
        return newIncident;
    }

    addWorker(worker) {
        const id = `W${String(this.workers.length + 1).padStart(3, '0')}`;
        const newWorker = { id, ...worker, status: 'Active' };
        this.workers.push(newWorker);
        this.saveToStorage('workers', this.workers);
        return newWorker;
    }

    addEquipment(equipment) {
        const id = `EQ${String(this.equipment.length + 1).padStart(3, '0')}`;
        const newEquipment = { id, ...equipment, status: 'Operational' };
        this.equipment.push(newEquipment);
        this.saveToStorage('equipment', this.equipment);
        return newEquipment;
    }

    addInspection(inspection) {
        const id = `INS${String(this.inspections.length + 1).padStart(3, '0')}`;
        const newInspection = { id, ...inspection, date: new Date().toISOString().split('T')[0], status: 'Completed' };
        this.inspections.unshift(newInspection);
        this.saveToStorage('inspections', this.inspections);
        this.createAlert(`Inspection Completed: ${inspection.type}`, `Location: ${inspection.location}`, 'info');
        return newInspection;
    }

    createAlert(title, message, type = 'info') {
        const id = `ALT${String(this.alerts.length + 1).padStart(3, '0')}`;
        const alert = {
            id,
            type,
            title,
            message,
            timestamp: new Date().toISOString(),
            read: false
        };
        this.alerts.unshift(alert);
        this.saveToStorage('alerts', this.alerts);
    }

    getStats() {
        return {
            activeIncidents: this.incidents.filter(i => i.status === 'Active').length,
            workersOnDuty: this.workers.filter(w => w.status === 'Active').length,
            equipmentActive: this.equipment.filter(e => e.status === 'Operational').length,
            pendingInspections: this.inspections.filter(i => i.status === 'Pending').length
        };
    }
}

// Initialize Database
const db = new MiningDatabase();

// UI Controller
class UIController {
    constructor() {
        this.currentSection = 'dashboard';
        this.initializeEventListeners();
        this.updateDashboard();
    }

    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.closest('.nav-btn').dataset.section));
        });

        // Incidents
        document.getElementById('btn-add-incident').addEventListener('click', () => this.openModal('incident-modal'));
        document.getElementById('incident-form').addEventListener('submit', (e) => this.handleIncidentSubmit(e));

        // Workers
        document.getElementById('btn-add-worker').addEventListener('click', () => this.openModal('worker-modal'));
        document.getElementById('worker-form').addEventListener('submit', (e) => this.handleWorkerSubmit(e));

        // Equipment
        document.getElementById('btn-add-equipment').addEventListener('click', () => this.openModal('equipment-modal'));
        document.getElementById('equipment-form').addEventListener('submit', (e) => this.handleEquipmentSubmit(e));

        // Inspections
        document.getElementById('btn-add-inspection').addEventListener('click', () => this.openModal('inspection-modal'));
        document.getElementById('inspection-form').addEventListener('submit', (e) => this.handleInspectionSubmit(e));

        // Reports
        document.getElementById('btn-generate-report').addEventListener('click', () => this.generateReport());

        // Modal Close
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });

        // Modal Background Click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(modal);
            });
        });

        // Settings Button
        document.querySelector('.btn-settings').addEventListener('click', () => this.showSettings());

        // Search
        document.getElementById('search-box').addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    switchSection(sectionName) {
        // Hide current section
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        // Show new section
        document.getElementById(sectionName).classList.add('active');
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        document.getElementById('section-title').textContent = this.getSectionTitle(sectionName);

        // Update section content
        this.updateSection(sectionName);
        this.currentSection = sectionName;
    }

    getSectionTitle(sectionName) {
        const titles = {
            dashboard: 'Dashboard',
            incidents: 'Incident Management',
            workers: 'Worker Management',
            equipment: 'Equipment Tracking',
            inspections: 'Safety Inspections',
            alerts: 'Safety Alerts',
            reports: 'Safety Reports'
        };
        return titles[sectionName] || 'Dashboard';
    }

    updateSection(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'incidents':
                this.updateIncidents();
                break;
            case 'workers':
                this.updateWorkers();
                break;
            case 'equipment':
                this.updateEquipment();
                break;
            case 'inspections':
                this.updateInspections();
                break;
            case 'alerts':
                this.updateAlerts();
                break;
            case 'reports':
                this.generateReport();
                break;
        }
    }

    updateDashboard() {
        const stats = db.getStats();

        // Animate stats
        this.animateNumber('active-incidents', stats.activeIncidents);
        this.animateNumber('workers-on-duty', stats.workersOnDuty);
        this.animateNumber('equipment-active', stats.equipmentActive);
        this.animateNumber('pending-inspections', stats.pendingInspections);

        // Update safety score
        const safetyScore = Math.max(50, 100 - (stats.activeIncidents * 10));
        document.getElementById('safety-score-text').textContent = safetyScore + '%';
        document.getElementById('safety-score-bar').style.width = safetyScore + '%';

        // Recent incidents
        this.displayRecentIncidents();
    }

    animateNumber(elementId, targetNumber) {
        const element = document.getElementById(elementId);
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 20);
        const interval = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(interval);
            }
            element.textContent = currentNumber;
        }, 50);
    }

    displayRecentIncidents() {
        const container = document.getElementById('recent-incidents');
        container.innerHTML = '';

        db.incidents.slice(0, 5).forEach(incident => {
            const severityClass = `severity-${incident.severity.toLowerCase()}`;
            const html = `
                <div class="incident-item">
                    <div class="incident-info">
                        <h4>${incident.type}</h4>
                        <p>${incident.location} • ${incident.date}</p>
                    </div>
                    <span class="incident-severity ${severityClass}">${incident.severity}</span>
                </div>
            `;
            container.innerHTML += html;
        });

        if (db.incidents.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72;">No incidents reported</p>';
        }
    }

    updateIncidents() {
        const tbody = document.getElementById('incidents-tbody');
        tbody.innerHTML = '';

        db.incidents.forEach(incident => {
            const severity = incident.severity.toLowerCase();
            const html = `
                <tr>
                    <td>${incident.id}</td>
                    <td>${incident.type}</td>
                    <td>${incident.location}</td>
                    <td>${incident.date}</td>
                    <td><span class="status-badge severity-${severity}">${incident.severity}</span></td>
                    <td><span class="status-badge status-${incident.status.toLowerCase()}">${incident.status}</span></td>
                    <td>
                        <button class="action-btn btn-view" onclick="ui.viewIncident('${incident.id}')">View</button>
                        <button class="action-btn btn-delete" onclick="ui.deleteIncident('${incident.id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += html;
        });

        if (db.incidents.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">No incidents recorded</td></tr>';
        }
    }

    updateWorkers() {
        const container = document.getElementById('workers-list');
        container.innerHTML = '';

        db.workers.forEach(worker => {
            const html = `
                <div class="worker-card">
                    <h4>👤 ${worker.name}</h4>
                    <div class="worker-info">
                        <label>Employee ID:</label> ${worker.employeeId}
                    </div>
                    <div class="worker-info">
                        <label>Role:</label> ${worker.role}
                    </div>
                    <div class="worker-info">
                        <label>Certification:</label> ${worker.certification}
                    </div>
                    <div class="worker-info">
                        <label>Status:</label> <span class="status-badge status-${worker.status.toLowerCase()}">${worker.status}</span>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 5px;">
                        <button class="action-btn btn-view" onclick="ui.viewWorker('${worker.id}')">View</button>
                        <button class="action-btn btn-delete" onclick="ui.deleteWorker('${worker.id}')">Delete</button>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        if (db.workers.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72;">No workers registered</p>';
        }
    }

    updateEquipment() {
        const container = document.getElementById('equipment-list');
        container.innerHTML = '';

        db.equipment.forEach(item => {
            const html = `
                <div class="equipment-card">
                    <h4>⚙️ ${item.name}</h4>
                    <div class="equipment-info">
                        <label>Type:</label> ${item.type}
                    </div>
                    <div class="equipment-info">
                        <label>Location:</label> ${item.location}
                    </div>
                    <div class="equipment-info">
                        <label>Last Maintenance:</label> ${item.maintenance}
                    </div>
                    <div class="equipment-info">
                        <label>Status:</label> <span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 5px;">
                        <button class="action-btn btn-view" onclick="ui.viewEquipment('${item.id}')">View</button>
                        <button class="action-btn btn-delete" onclick="ui.deleteEquipment('${item.id}')">Delete</button>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        if (db.equipment.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72;">No equipment registered</p>';
        }
    }

    updateInspections() {
        const tbody = document.getElementById('inspections-tbody');
        tbody.innerHTML = '';

        db.inspections.forEach(inspection => {
            const html = `
                <tr>
                    <td>${inspection.id}</td>
                    <td>${inspection.type}</td>
                    <td>${inspection.location}</td>
                    <td>${inspection.date}</td>
                    <td>${inspection.inspector}</td>
                    <td><span class="status-badge status-${inspection.status.toLowerCase()}">${inspection.status}</span></td>
                    <td>
                        <button class="action-btn btn-view" onclick="ui.viewInspection('${inspection.id}')">View</button>
                        <button class="action-btn btn-delete" onclick="ui.deleteInspection('${inspection.id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += html;
        });

        if (db.inspections.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">No inspections recorded</td></tr>';
        }
    }

    updateAlerts() {
        const container = document.getElementById('alerts-list');
        container.innerHTML = '';

        db.alerts.forEach(alert => {
            const time = new Date(alert.timestamp).toLocaleTimeString();
            const html = `
                <div class="alert-item ${alert.type}">
                    <div class="alert-content">
                        <h4>⚡ ${alert.title}</h4>
                        <p>${alert.message}</p>
                        <span class="alert-time">${time}</span>
                    </div>
                    <button class="action-btn btn-delete" onclick="ui.deleteAlert('${alert.id}')">×</button>
                </div>
            `;
            container.innerHTML += html;
        });

        if (db.alerts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72;">No alerts</p>';
        }
    }

    generateReport() {
        const totalIncidents = db.incidents.length;
        const resolvedIncidents = db.incidents.filter(i => i.status === 'Resolved').length;
        const activeIncidents = db.incidents.filter(i => i.status === 'Active').length;

        const monthlyHtml = `
            <p><strong>Total Incidents This Month:</strong> ${totalIncidents}</p>
            <p><strong>Resolved:</strong> ${resolvedIncidents}</p>
            <p><strong>Active:</strong> ${activeIncidents}</p>
            <p><strong>Workers Trained:</strong> ${db.workers.length}</p>
            <p><strong>Equipment Operational:</strong> ${db.equipment.filter(e => e.status === 'Operational').length}/${db.equipment.length}</p>
        `;

        const incidentTypes = {};
        db.incidents.forEach(i => {
            incidentTypes[i.type] = (incidentTypes[i.type] || 0) + 1;
        });

        let breakdownHtml = '<p><strong>Incident Breakdown:</strong></p>';
        Object.entries(incidentTypes).forEach(([type, count]) => {
            breakdownHtml += `<p>${type}: ${count} incidents</p>`;
        });

        document.getElementById('monthly-report').innerHTML = monthlyHtml;
        document.getElementById('incident-breakdown').innerHTML = breakdownHtml;
    }

    handleIncidentSubmit(e) {
        e.preventDefault();

        const incident = {
            type: document.getElementById('incident-type').value,
            location: document.getElementById('incident-location').value,
            description: document.getElementById('incident-description').value,
            severity: document.getElementById('incident-severity').value,
            status: 'Active'
        };

        db.addIncident(incident);
        this.closeModal(document.getElementById('incident-modal'));
        document.getElementById('incident-form').reset();
        this.updateDashboard();
        this.showNotification('Incident reported successfully!', 'success');
    }

    handleWorkerSubmit(e) {
        e.preventDefault();

        const worker = {
            name: document.getElementById('worker-name').value,
            employeeId: document.getElementById('worker-id').value,
            role: document.getElementById('worker-role').value,
            certification: document.getElementById('worker-cert').value
        };

        db.addWorker(worker);
        this.closeModal(document.getElementById('worker-modal'));
        document.getElementById('worker-form').reset();
        this.updateWorkers();
        this.showNotification('Worker added successfully!', 'success');
    }

    handleEquipmentSubmit(e) {
        e.preventDefault();

        const equipment = {
            name: document.getElementById('equipment-name').value,
            type: document.getElementById('equipment-type').value,
            location: document.getElementById('equipment-location').value,
            maintenance: document.getElementById('equipment-maintenance').value
        };

        db.addEquipment(equipment);
        this.closeModal(document.getElementById('equipment-modal'));
        document.getElementById('equipment-form').reset();
        this.updateEquipment();
        this.showNotification('Equipment registered successfully!', 'success');
    }

    handleInspectionSubmit(e) {
        e.preventDefault();

        const inspection = {
            type: document.getElementById('inspection-type').value,
            location: document.getElementById('inspection-location').value,
            inspector: document.getElementById('inspection-inspector').value,
            findings: document.getElementById('inspection-findings').value
        };

        db.addInspection(inspection);
        this.closeModal(document.getElementById('inspection-modal'));
        document.getElementById('inspection-form').reset();
        this.updateInspections();
        this.showNotification('Inspection submitted successfully!', 'success');
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }

    deleteIncident(id) {
        if (confirm('Are you sure you want to delete this incident?')) {
            db.incidents = db.incidents.filter(i => i.id !== id);
            db.saveToStorage('incidents', db.incidents);
            this.updateIncidents();
            this.showNotification('Incident deleted', 'info');
        }
    }

    deleteWorker(id) {
        if (confirm('Are you sure you want to delete this worker?')) {
            db.workers = db.workers.filter(w => w.id !== id);
            db.saveToStorage('workers', db.workers);
            this.updateWorkers();
            this.showNotification('Worker deleted', 'info');
        }
    }

    deleteEquipment(id) {
        if (confirm('Are you sure you want to delete this equipment?')) {
            db.equipment = db.equipment.filter(e => e.id !== id);
            db.saveToStorage('equipment', db.equipment);
            this.updateEquipment();
            this.showNotification('Equipment deleted', 'info');
        }
    }

    deleteInspection(id) {
        if (confirm('Are you sure you want to delete this inspection?')) {
            db.inspections = db.inspections.filter(i => i.id !== id);
            db.saveToStorage('inspections', db.inspections);
            this.updateInspections();
            this.showNotification('Inspection deleted', 'info');
        }
    }

    deleteAlert(id) {
        db.alerts = db.alerts.filter(a => a.id !== id);
        db.saveToStorage('alerts', db.alerts);
        this.updateAlerts();
    }

    viewIncident(id) {
        const incident = db.incidents.find(i => i.id === id);
        if (incident) {
            alert(`Incident ID: ${incident.id}\nType: ${incident.type}\nLocation: ${incident.location}\nSeverity: ${incident.severity}\nDescription: ${incident.description}`);
        }
    }

    viewWorker(id) {
        const worker = db.workers.find(w => w.id === id);
        if (worker) {
            alert(`Worker: ${worker.name}\nEmployee ID: ${worker.employeeId}\nRole: ${worker.role}\nCertification: ${worker.certification}\nStatus: ${worker.status}`);
        }
    }

    viewEquipment(id) {
        const equipment = db.equipment.find(e => e.id === id);
        if (equipment) {
            alert(`Equipment: ${equipment.name}\nType: ${equipment.type}\nLocation: ${equipment.location}\nLast Maintenance: ${equipment.maintenance}\nStatus: ${equipment.status}`);
        }
    }

    viewInspection(id) {
        const inspection = db.inspections.find(i => i.id === id);
        if (inspection) {
            alert(`Inspection ID: ${inspection.id}\nType: ${inspection.type}\nLocation: ${inspection.location}\nInspector: ${inspection.inspector}\nFindings: ${inspection.findings}`);
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.updateSection(this.currentSection);
            return;
        }

        const lowerQuery = query.toLowerCase();

        if (this.currentSection === 'incidents') {
            const filtered = db.incidents.filter(i =>
                i.type.toLowerCase().includes(lowerQuery) ||
                i.location.toLowerCase().includes(lowerQuery) ||
                i.id.toLowerCase().includes(lowerQuery)
            );
            this.displayFilteredIncidents(filtered);
        } else if (this.currentSection === 'workers') {
            const filtered = db.workers.filter(w =>
                w.name.toLowerCase().includes(lowerQuery) ||
                w.role.toLowerCase().includes(lowerQuery) ||
                w.id.toLowerCase().includes(lowerQuery)
            );
            this.displayFilteredWorkers(filtered);
        } else if (this.currentSection === 'equipment') {
            const filtered = db.equipment.filter(e =>
                e.name.toLowerCase().includes(lowerQuery) ||
                e.type.toLowerCase().includes(lowerQuery) ||
                e.location.toLowerCase().includes(lowerQuery)
            );
            this.displayFilteredEquipment(filtered);
        }
    }

    displayFilteredIncidents(filtered) {
        const tbody = document.getElementById('incidents-tbody');
        tbody.innerHTML = '';

        filtered.forEach(incident => {
            const severity = incident.severity.toLowerCase();
            const html = `
                <tr>
                    <td>${incident.id}</td>
                    <td>${incident.type}</td>
                    <td>${incident.location}</td>
                    <td>${incident.date}</td>
                    <td><span class="status-badge severity-${severity}">${incident.severity}</span></td>
                    <td><span class="status-badge status-${incident.status.toLowerCase()}">${incident.status}</span></td>
                    <td>
                        <button class="action-btn btn-view" onclick="ui.viewIncident('${incident.id}')">View</button>
                        <button class="action-btn btn-delete" onclick="ui.deleteIncident('${incident.id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += html;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">No results found</td></tr>';
        }
    }

    displayFilteredWorkers(filtered) {
        const container = document.getElementById('workers-list');
        container.innerHTML = '';

        filtered.forEach(worker => {
            const html = `
                <div class="worker-card">
                    <h4>👤 ${worker.name}</h4>
                    <div class="worker-info">
                        <label>Employee ID:</label> ${worker.employeeId}
                    </div>
                    <div class="worker-info">
                        <label>Role:</label> ${worker.role}
                    </div>
                    <div class="worker-info">
                        <label>Certification:</label> ${worker.certification}
                    </div>
                    <div class="worker-info">
                        <label>Status:</label> <span class="status-badge status-${worker.status.toLowerCase()}">${worker.status}</span>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 5px;">
                        <button class="action-btn btn-view" onclick="ui.viewWorker('${worker.id}')">View</button>
                        <button class="action-btn btn-delete" onclick="ui.deleteWorker('${worker.id}')">Delete</button>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72;">No results found</p>';
        }
    }

    displayFilteredEquipment(filtered) {
        const container = document.getElementById('equipment-list');
        container.innerHTML = '';

        filtered.forEach(item => {
            const html = `
                <div class="equipment-card">
                    <h4>⚙️ ${item.name}</h4>
                    <div class="equipment-info">
                        <label>Type:</label> ${item.type}
                    </div>
                    <div class="equipment-info">
                        <label>Location:</label> ${item.location}
                    </div>
                    <div class="equipment-info">
                        <label>Last Maintenance:</label> ${item.maintenance}
                    </div>
                    <div class="equipment-info">
                        <label>Status:</label> <span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 5px;">
                        <button class="action-btn btn-view" onclick="ui.viewEquipment('${item.id}')">View</button>
                        <button class="action-btn btn-delete" onclick="ui.deleteEquipment('${item.id}')">Delete</button>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72;">No results found</p>';
        }
    }

    showSettings() {
        alert('⚙️ Settings\n\n• System Version: 1.0.0\n• Last Updated: ' + new Date().toLocaleDateString() + '\n• Total Records: ' + (db.incidents.length + db.workers.length + db.equipment.length + db.inspections.length));
    }

    showNotification(message, type = 'info') {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#00B894' : type === 'danger' ? '#D63031' : '#0984E3'};
            color: white;
            border-radius: 8px;
            z-index: 2000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize UI
let ui;
document.addEventListener('DOMContentLoaded', () => {
    ui = new UIController();
    console.log('Mining Safety System loaded successfully');
    
    // Simulate real-time updates
    setInterval(() => {
        if (ui.currentSection === 'dashboard') {
            // Randomly trigger alerts
            if (Math.random() > 0.95) {
                const alerts = [
                    { title: 'System Check', message: 'All systems operational', type: 'info' },
                    { title: 'Notice', message: 'Routine maintenance scheduled', type: 'warning' }
                ];
                const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
                db.createAlert(randomAlert.title, randomAlert.message, randomAlert.type);
            }
        }
    }, 30000);
});