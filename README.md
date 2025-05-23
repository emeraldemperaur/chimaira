# Chímaira /kaɪˈmɪərə/
## Agentic RAG (Retrieval-Augmented Generation) Web Application

### Overview
<p align="justify">Chím<em>ai</em>ra is a RAG architecture based web application.</p>

![alt text](/illiad/authenticationscreenshot.png)

#### Prerequisites/System Requirements
```
> NodeJS 20+
> Docker Desktop (for local container deployment)
> PostgreSQL Database server (for non SQLite data persistence)
> OpenAI, Anthropic, xAI API service account/key
```
#### Option 1: Docker Container 
```bash
docker compose up conjureschimera
```

#### Option 2: Local
```bash
npm install && npm install -g nodemon
```
```bash
# Development build
npm run dev
```
```bash
# or Production build
npm install pm2
npm run start
```

### System Design & Architecture
#### Synopsis
<ul>
<li>Neumorphism Design UI Components</li>
<li>Agentic RAG Request roles - Explorer, Translator, Historian, Engineer, Artificer, Treasurer</li>
<li>Reusable Context profiles</li>
<li>Dynamic Context models (Query Models)</li>
<li>Passport.js JWT User Authentication & Role Based Access Control</li>
<li>Nodemailer SMTP Transport - Email Notification(s)</li>
<li>Open AI, Anthropic, xAI & N8N API Integration</li>
</ul>

#### Architecture

### Toolstack
<p align="justify">JavaScript, Typescript, Material UI, ReactJS, Axios, Redux, Bcrypt, Passport.js, Access Control, Formik, Yup, Luxon, Express, Nodemailer, Sequelize, SQLite, PostgreSQL, Pinecone, ChromaDB, Langchain, Huggingface, N8N, OpenAI, xAI and Anthropic LLM APIs.</p>
