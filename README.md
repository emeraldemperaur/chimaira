# Chímaira /kaɪˈmɪərə/
## Agentic RAG (Retrieval-Augmented Generation) Web Application

### Overview
<p align="justify">Chím<em>ai</em>ra is a RAG (Retrieval-Augmented Generation) architecture based web application designed to provide an autheticated end user with an AI augmented productivity tool for managing reusable contexts and generative AI responses (RAG Artifacts) in tandem with accomplishing specialized tasks via AI Agents; cleverly utilizing Langchain framework and Huggingface: Transformer & Pipelines to facilitate a user-friendly integration of local, edge and cloud hosted large language models (LLMs) with the extensible N8N workflow automation platform for agentic response actions.</p>

![alt text](/illiad/authenticationscreenshot.png)

### Related Links

**Portfolio URL >_** https://www.mekaegwim.ca/portfolio/
**Demo URL >_** TBD

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
<li>Passport.js JWT User Authentication & Role Based Access Control</li>
<li>Nodemailer SMTP Transport - Email Notification(s)</li>
<li>Agentic RAG Request roles - Explorer, Translator, Historian, Engineer, Artificer, Treasurer</li>
<li>Reusable Context Profiles</li>
<li>Dynamic Context Query Models (Query Models)</li>
<li>Langchain Embedding Models & Vector Database Integration</li>
<li>Open AI, Anthropic, xAI, Github & N8N Workflow Automation API Integration</li>
</ul>

#### Architecture

### Toolstack
<p align="justify">JavaScript, Typescript, Material UI, ReactJS, Axios, Redux, Bcrypt, JWT, Passport.js, Access Control, Formik, Yup, Luxon, Express, Nodemailer, Mailgen, Sequelize, SQLite, PostgreSQL, Pinecone, ChromaDB, Langchain, Huggingface, N8N, OpenAI, xAI and Anthropic LLM APIs.</p>
