import { qe } from '../../db';

export async function GET() {
    let bo = await qe('SELECT count(*) as cnt from dm_borad');
    let data = await qe('SELECT * from dm_borad');
    for(let i=0; i<bo[0].cnt; i++){
        let user = await qe(`SELECT mb_icon,mb_img,mb_id from dm_member where mb_id = '${data[i].wr_id}'`);
        
            data[i].cc=user[0].mb_icon;
            data[i].img=user[0].mb_img;
    }

    return Response.json(data);
}