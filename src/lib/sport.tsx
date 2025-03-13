import db from '../../prisma/db'
export  function findSports(){
    return db.sport.findMany();
}




