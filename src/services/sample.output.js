const data = {
  matchScore: 88,
  technicalQuestions: [
    {
      question: 'In your Inventory Management System project, how did you structure the PostgreSQL database schema, and how did you implement role-based access control (RBAC) with Django REST Framework?',
      intention: "To evaluate the candidate's practical experience with relational database design, Django REST Framework, and implementation of authentication/authorization mechanisms.",
      answer: "The candidate should explain the relational schema structure (e.g., tables for Products, Suppliers, Users, Roles with foreign key relationships). They should discuss how DRF permissions classes (e.g., `BasePermission` or built-in permissions like `IsAuthenticated`) were used alongside Django's `Group` or custom user roles to restrict API endpoints based on user privileges."
    },
    {
      question: 'In your Expense Tracker API, you used PyTest for automated testing. How did you structure your API unit and integration tests, and how did you handle test database setup and teardown?',
      intention: "To assess the candidate's understanding of automated testing practices, test isolation, and test framework usage with Python backend services.",
      answer: 'The candidate should describe using PyTest fixtures for test setup (e.g., database initialization, generating mock authentication tokens, or seeding test data) and teardown. They should explain how they tested individual API endpoints for expected status codes, payload structures, pagination responses, and edge cases.'
    },
    {
      question: 'During your internship at TechNova Solutions, you worked on improving API response performance. What specific bottlenecks did you identify, and what techniques did you use to fix them?',
      intention: 'To test real-world problem-solving skills, debugging experience, and optimization strategies in a professional backend environment.',
      answer: 'The candidate should mention strategies like identifying N+1 query problems in database calls, using indexing on frequently queried PostgreSQL columns, caching response data (or using Redis), optimizing payload sizes, or removing unnecessary database joins.'
    },
    {
      question: 'You have worked with both Django and Flask. How do these two frameworks differ in terms of architecture and philosophy, and when would you choose one over the other?',
      intention: "To gauge the candidate's depth of framework knowledge and architectural decision-making ability.",
      answer: "The candidate should explain that Django is a full-featured, 'batteries-included' framework with a built-in ORM, admin panel, and authentication system, making it ideal for rapid development of complex applications. Flask is a micro-framework that is lightweight and flexible, allowing developers to choose their own libraries (e.g., SQLAlchemy, Marshmallow), making it suitable for microservices or simpler REST APIs."
    },
    {
      question: 'How do database indexes work in PostgreSQL, and how do you decide which columns should be indexed?',
      intention: "To check the candidate's foundational knowledge of database management and query optimization.",
      answer: 'The candidate should explain that indexes (such as B-Tree indexes in PostgreSQL) speed up data retrieval operations at the cost of additional write overhead and storage. Columns that are frequently used in `WHERE` clauses, `JOIN` conditions, `ORDER BY`, or `GROUP BY` are primary candidates for indexing, whereas frequently updated columns or low-cardinality columns should be indexed cautiously.'
    },
    {
      question: 'What are the key principles of designing a RESTful API, and how do you handle HTTP status codes appropriately?',
      intention: 'To verify adherence to industry-standard API design principles and REST architectural constraints.',
      answer: 'The candidate should mention statelessness, resource-oriented URLs using nouns, and standardized HTTP methods (GET, POST, PUT, PATCH, DELETE). They should explain proper HTTP status code usage (200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).'
    },
    {
      question: 'How do you use Docker in your backend development workflow, and what are the key components of a Dockerfile?',
      intention: "To evaluate the candidate's familiarity with containerization tools and environment consistency.",
      answer: 'The candidate should explain containerizing a Python backend application to ensure consistent behavior across local development and production. Key Dockerfile directives to mention include `FROM` (base image), `WORKDIR` (working directory), `COPY`/`ADD` (files), `RUN` (dependency installation like pip install), `EXPOSE` (ports), and `CMD` or `ENTRYPOINT` (command to run the application).'
    },
    {
      question: 'How would you use Redis in conjunction with a relational database like PostgreSQL in a backend architecture?',
      intention: "To evaluate the candidate's understanding of caching strategies and memory-based data stores listed on their resume.",
      answer: 'The candidate should explain using Redis as an in-memory cache to store frequently accessed, slow-changing database query results, reducing database load and latency. They can also discuss cache invalidation strategies (TTL - time to live) or using Redis for session storage and rate limiting.'
    }
  ],
  behavioralQuestions:[
    {
      question: 'Tell me about a challenging bug you encountered during your internship at TechNova Solutions or in a project. How did you diagnose and fix it?',
      intention: 'To evaluate debugging strategy, perseverance, analytical skills, and hands-on technical problem solving.',
      answer: 'Using the STAR method: Situation - Describe the specific issue/bug in the Flask/PostgreSQL codebase. Task - Explain what needed to be fixed without breaking existing functionality. Action - Walk through the diagnostic steps (logs, debugging tools, API testing with Postman). Result - Detail the resolution, performance improvement, or lessons learned.'
    },
    {
      question: 'Describe a scenario where you had to collaborate with team members in an Agile environment during your internship. How did you communicate technical progress and blockers?',
      intention: 'To assess teamwork, Agile practices familiarity, and communication skills within a professional engineering team.',
      answer: 'Using the STAR method: Situation - Mention participating in daily standups/sprints at TechNova Solutions. Task - State your assigned tasks (e.g., API endpoint development). Action - Describe how you communicated progress, asked for clarification on requirements, and flagged blockers to senior developers. Result - Highlight successful sprint delivery and effective team collaboration.'
    },
    {
      question: 'How do you approach learning a new tool or framework when starting a project, such as when you learned Docker or PyTest?',
      intention: 'To measure learning agility, self-motivation, and ability to adopt new technologies independently.',
      answer: 'The candidate should explain their structured learning process: studying official documentation, building small practice prototypes/proof-of-concepts, applying the technology to a real project (like Expense Tracker API), and seeking code reviews or best practices.'
    },
    {
      question: 'Can you share an example of a project trade-off you had to make, such as choosing between Django and Flask or selecting a database design strategy?',
      intention: 'To assess engineering judgment, pragmatic decision-making, and understanding of technical constraints.',
      answer: "Using the STAR method: Situation - Context of starting the Inventory System or Expense Tracker. Task - Deciding on the architecture or toolset. Action - Evaluated options (e.g., Django's built-in features vs Flask's lightweight nature). Result - Selected the framework best suited for project requirements and timeline."
    },
    {
      question: 'How do you ensure the code you write is clean, maintainable, and well-tested before submitting it for review?',
      intention: "To gauge code quality standards, discipline, and alignment with the job's requirement for clean and maintainable code.",
      answer: 'The candidate should mention adhering to PEP 8 guidelines, writing modular and reusable code, writing unit tests using PyTest, testing endpoints manually via Postman, using Git for clean atomic commits, and performing self-code reviews before merging.'
    }
  ],
  skillGaps: [
    {
      skill: 'Production Cloud Deployment & CI/CD Pipelines',
      severity: 'medium'
    },
    {
      skill: 'Advanced Asynchronous Task Processing (e.g., Celery / Redis Queues)',
      severity: 'medium'
    },
    {
      skill: 'Multi-Container Orchestration (Docker Compose for multi-service environments)',
      severity: 'low'
    }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: 'Core Python & RESTful API Fundamentals',
      tasks: ["Review Python OOP concepts", "Build a simple REST API using Flask or Django", "Implement basic CRUD operations with PostgreSQL"]
    },
    {
      day: 2,
      focus: 'Django REST Framework & Flask Deep Dive',
      tasks: ["Review Python OOP concepts", "Build a simple REST API using Flask or Django", "Implement basic CRUD operations with PostgreSQL"]
    },
    {
      day: 3,
      focus: 'PostgreSQL & Database Optimization',
      tasks: ["Review Python OOP concepts", "Build a simple REST API using Flask or Django", "Implement basic CRUD operations with PostgreSQL"]
    },
    {
      day: 4,
      focus: 'Automated Testing & Redis Caching',
      tasks: ["Review Python OOP concepts", "Build a simple REST API using Flask or Django", "Implement basic CRUD operations with PostgreSQL"]
    },
    {
      day: 5,
      focus: 'Docker Containerization & Git Workflows',
      tasks: ["Review Python OOP concepts", "Build a simple REST API using Flask or Django", "Implement basic CRUD operations with PostgreSQL"]
    },
    {
      day: 6,
      focus: 'Behavioral Preparation & Storytelling (STAR Method)',
      tasks: ["Review Python OOP concepts", "Build a simple REST API using Flask or Django", "Implement basic CRUD operations with PostgreSQL"]
    },
    {
      day: 7,
      focus: 'Mock Interview & Final Technical Revision',
      tasks: ["Review Python OOP concepts", "Build a simple REST API using Flask or Django", "Implement basic CRUD operations with PostgreSQL"]
    }
  ]
}