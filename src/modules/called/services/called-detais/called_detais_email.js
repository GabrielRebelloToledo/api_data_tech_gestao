
export function getConsultaEmailDetails() {

    return `
        
            SELECT 
                c.id as nro,
                c.userId,
                c.telephone,
                c.emailscopy,
                cd.detail as reason,
                DATE_FORMAT(c.dataStart, '%d/%m/%Y %H:%i:%s') as dataStart,
                DATE_FORMAT(c.dataFinish , '%d/%m/%Y %H:%i:%s') as dataFinish,
                DATE_FORMAT(cd.dataResponse , '%d/%m/%Y %H:%i:%s') as dataResposta,
                u.email,
                s.status,
                c.file1,
                c.file2,
                c.file3,
                c.file4,
                c2.name,
                u.name as usuario,
                (SELECT

                GROUP_CONCAT(u.email ORDER BY u.email SEPARATOR ', ') AS email

                FROM comp_dep_users cdu 
                INNER JOIN comp_dep cd on cdu.idDepartComp = cd.idDepartComp  
                INNER JOIN user u on cdu.userId = u.id 

                where 

                cd.companieId = c.companieIdP) as emails_consult


                FROM called c
                inner join called_details cd on cd.calledId = c.id
                inner join user u on c.userId = u.id
                inner join status s  on c.status  = s.id
                inner join companie c2  on c2.id = c.companieIdP

                WHERE c.id = ? and cd.id = ?
                
                
            `;



}


