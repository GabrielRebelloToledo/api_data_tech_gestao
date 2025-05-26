
export function getConsulta() {

    return `
        SELECT 

                c.id,
                c.reason,
                us.name as usuario,
                c2.name as empresa,
                s.status

            FROM user_companie uc 
            INNER JOIN comp_dep_users cdu on cdu.userId = uc.userId
            INNER JOIN comp_dep cd on cdu.idDepartComp = cd.idDepartComp and cd.companieId = uc.companieId
            INNER JOIN called c  on c.idDepCall = cd.departmentId and c.companieIdP = uc.companieId
            INNER JOIN user us on c.userId = us.id
            INNER JOIN companie c2 on c.companieIdP = c2.id
            INNER JOIN status s on c.status = s.id

            WHERE uc.userId = ?


            ORDER BY c.id ASC
            `
;



}


