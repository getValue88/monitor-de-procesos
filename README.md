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
4. Create database called "monitor_procesos"
5. npm run build
6. npm run start:prod
7. run the next script into the database:

~~~~sql
USE `monitor_procesos`;

DROP trigger IF EXISTS crear_compania;
delimiter ;;
CREATE trigger `crear_compania` BEFORE INSERT ON `user`
FOR EACH ROW
    BEGIN	
         IF (new.privilege = 'admin' AND new.companyId IS NULL) THEN
			INSERT INTO company (rs,address,impositiveCategory,cuit,logo)
				VALUES ("","","","","");
			SET new.companyId = (SELECT max(id) FROM company); 
		 END IF;
	END;;


-- # crear nivel de cambio y proceso cuando se inserta articulo con nivelCambio null
DROP TRIGGER IF EXISTS crear_nivel_cambio_stdProcess
delimiter $$
CREATE TRIGGER `crear_nivel_cambio_stdProcess` BEFORE INSERT ON `article`
FOR EACH ROW
	BEGIN
		IF(new.nivelCambioId IS NULL) THEN
			INSERT INTO standard_process (name,description,requiredTime)
				VALUES ("","",null);
			INSERT INTO nivel_cambio (date,plan,image,processId)
				VALUES(NOW(),"","", (SELECT MAX(id) FROM standard_process));
                SET new.nivelCambioId = (SELECT MAX(id) FROM nivel_cambio);
		END IF;
    END$$
    
    
INSERT INTO `user` (`name`,`password`,privilege,observations,companyId)
VALUES ("admin","admin","admin","",null),
("supervisor","supervisor","supervisor","",1),
("cliente","cliente","cliente","",1);
~~~~

- ## Usage:
  - Log-in with test users: 
 
    Privilege      | Username   | Password
    ----------     | ---------  | --------
    **Admin**      | admin      | admin
    **Supervisor** | supervisor | supervisor
    **Cliente**    | cliente    | cliente

  - To create a new company, from DB:
    - Insert a row into 'user' table with **privilege= "admin"**  and **companyId = null**

  - To create a new admin/supervisor/client, from DB:
    - Insert a row into 'user' table with **privilege = "admin" or "supervisor" or "cliente"** and **companyId = (id of an existent company)**


  Flujo de negocio:
  - Admin crea producto con su respectivo proceso y tareas para se fabricado
  - El cliente realiza una compra
  - El admin acepta la compra y determina una fecha de inicio de fabricación y asigna la orden a un supervisor
  - El supervisor debe actualizar el estado de las tareas una vez llegada la fecha de inicio de las mismas
  - El admin puede monitorear el detalle de los estados en tiempo real viendo porcentajes y comparacion de performance respecto al tiempo estimado
  - El cliente puede ver el estado de sus ordenes (En Anális - En proceso - Finalizado)


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
