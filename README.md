# Process-Monitor 1.0 (WIP)
**Process and purchase orders real time monitor for small and medium enterprises.**

- This educational proyect was made to wrap up all the content learned in the 2019 Full Stack Web Developer course (CFL n°403, Tandil, Bs. As, Argentina) organized by UNICEN, CEPIT and Globant.

- ## Features:
  - Create multiple entreprises
  - Create multiple Admins, Supervisors and clients for each enterprise.
  - Create multiple articles with its own manufacture process.
  - Create multiple tasks for each process.
  - Create purchase orders from client view.
  - Asign purchase orders to a manufacture order then asign it to a supervisor.
  - Set current tasks status from supervisor view.
  - Analize process and tasks performance from admin view.

- ## To Do:
  In the next iteration we want to implement:
    - Capability to handle non linear process.
    - Logo/images handling for enterprises and articles.
    - Custom Alarms for each process and task, in case of bottlenecks.
    - User signup module.
    - Session handling.

- ## Install: 
1. Clone the proyect.
2. npm i
3. Create ormconfig.json in the root of the proyect:
  ```json       
    {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "monitor_procesos",
        "entities": [
        "dist/**/**.entity{.ts,.js}"
        ],
        "synchronize": true
    }
  ```
4. Create database called "monitor-procesos"
5. Import [this Dump file]() into the database. 

- ## Usage:
  - Log-in with test users: 
 
    Privilege      | Username   | Password
    ----------     | ---------  | --------
    **Admin**      | admin      | admin
    **Supervisor** | supervisor | supervisor
    **Client**     | client     | client

  - To create a new company, from DB:
    - Insert a row into 'user' table with **privilege= "admin"**  and **companyId = null**

  - To create a new admin/supervisor/client, from DB:
    - Insert a row into 'user' table with **privilege = "admin" or "supervisor" or "client"** and **companyId = (id of an existent company)**

- ## Technologies:
  - Frontend:
    - HTML
    - CSS / Bootstrap
    - Javascript
  - Backend:
    - NodeJs
    - NestJs (Typescript)
    - TypeORM
  - Database:
    - MySQL

- ## Credits:

  - Sebastian Chavez [@chaveta](https://github.com/chaveta) - Frontend
  - Francisco Corti  [@getValue88](https://github.com/getValue88) - Backend, API
  - Ezequiel Balquinta [@ebalquinta](https://github.com/ebalquinta) - Database
