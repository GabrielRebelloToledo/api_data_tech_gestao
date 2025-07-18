
export function getConsultaResponsible() {

    return `
            SELECT 

				c.id,
                c.reason,
                us.name as usuario,
                c2.name as empresa,
                s.status

                FROM called c
                INNER JOIN user us on c.userId = us.id
                INNER JOIN companie c2 on c.companieIdP = c2.id
                INNER JOIN status s on c.status = s.id

                WHERE
            c.userIdResp = ?
            
            and s.close = 'N'

             ORDER BY c.id ASC
            `
        ;



}


