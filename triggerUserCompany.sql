drop trigger crear_compania;
delimiter ;;
create trigger crear_compania after insert on dbmonitor.`user`
for each row
    begin
		-- declare company_id int default 0;
		-- select new.privilege; select new.companyId;
        -- if (new.privilege = "admin" and new.companyId = null) then
			insert into dbmonitor.company (rs,address,impositiveCategory,cuit,logo)
				values ("a","b","c","d","e");
			-- set company_id = (select max(id) from dbmonitor.company);
            -- update dbmonitor.user set dbmonitor.user.companyId = company_id
			-- where user.id = id;
		-- end if;
	end;;
    
insert into dbmonitor.`user` (`name`,`password`,privilege,observations,companyId)
values ("pepito345","12345","admin","frutas",null);
