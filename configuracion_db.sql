use `monitor_procesos`;

drop trigger if exists crear_compania;
delimiter ;;
create trigger `crear_compania` before insert on `user`
for each row
    begin	
         if (new.privilege = 'admin' and new.companyId is null) then
			insert into company (rs,address,impositiveCategory,cuit,logo)
				values ("","","","","");
			set new.companyId = (select max(id) from company); 
		 end if;
	end;;


-- # crear nivel de cambio y proceso cuando se inserta articulo con nivelCambio null
drop trigger if exists crear_nivel_cambio_stdProcess
delimiter $$
create trigger `crear_nivel_cambio_stdProcess` before insert on `article`
for each row
	begin
		if(new.nivelCambioId is null) then
			insert into standard_process (name,description,requiredTime)
				values ("","",null);
			insert into nivel_cambio (date,plan,image,processId)
				values(NOW(),"","", (select max(id) from standard_process));
                set new.nivelCambioId = (select max(id) from nivel_cambio);
		end if;
    end$$
    
    
insert into `user` (`name`,`password`,privilege,observations,companyId)
values ("admin","admin","admin","",null),
("supervisor","supervisor","supervisor","",1),
("cliente","cliente","cliente","",1);