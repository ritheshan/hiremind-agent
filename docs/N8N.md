# n8n Workflow Automation Setup

This document covers the n8n setup for HireMind's job automation workflows.

## Overview

[n8n](https://n8n.io/) is a workflow automation tool that connects various services. In HireMind, it's used for:
- Job listing aggregation
- Automated application tracking
- Email notifications
- Scheduled tasks

## Current Status

🚧 **Basic Setup Only** - Workflows are planned but not yet implemented.

---

## Setup

### Prerequisites
- Docker & Docker Compose installed

### Running n8n

```bash
cd n8n
docker-compose up -d
```

n8n will be available at: **http://localhost:5678**

### Docker Compose Configuration

```yaml
# n8n/docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - ./data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=password
```

### Data Persistence

All n8n data is stored in `n8n/data/`:
- `config` - n8n configuration
- `nodes/` - Custom nodes (if any)
- Workflow data and credentials

---

## Planned Workflows

### 1. Job Scraping Pipeline
**Status:** Not implemented

**Purpose:** Aggregate job listings from multiple sources

**Nodes (Planned):**
- Schedule Trigger (daily)
- HTTP Request (job board APIs)
- Data transformation
- MongoDB insert
- Webhook to notify app

### 2. Application Status Checker
**Status:** Not implemented

**Purpose:** Track application status changes

**Nodes (Planned):**
- Schedule Trigger
- Email IMAP (check for responses)
- Text parser
- Database update
- Email notification

### 3. Interview Reminder
**Status:** Not implemented

**Purpose:** Send reminders before interviews

**Nodes (Planned):**
- Schedule Trigger (hourly)
- MongoDB query (upcoming interviews)
- Filter (within 24 hours)
- Email send

---

## Connecting to HireMind

### Webhook Integration

n8n can trigger workflows via webhooks. The Express server can call n8n webhooks:

```javascript
// Example: Trigger job sync workflow
await fetch('http://localhost:5678/webhook/job-sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 'xxx' })
});
```

### MongoDB Connection

n8n can connect directly to the same MongoDB database:

1. In n8n, go to **Credentials** → **Add Credential**
2. Select **MongoDB**
3. Enter connection string: `mongodb+srv://...`

---

## Environment Variables

For production, set these in `docker-compose.yml`:

```yaml
environment:
  - N8N_BASIC_AUTH_ACTIVE=true
  - N8N_BASIC_AUTH_USER=${N8N_USER}
  - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
  - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
  - WEBHOOK_URL=https://your-domain.com/
```

---

## Useful Commands

```bash
# Start n8n
docker-compose up -d

# View logs
docker-compose logs -f

# Stop n8n
docker-compose down

# Restart n8n
docker-compose restart
```

---

## Next Steps

1. [ ] Create job scraping workflow
2. [ ] Set up job board API credentials
3. [ ] Create application tracking workflow
4. [ ] Connect email notifications
5. [ ] Set up production environment
