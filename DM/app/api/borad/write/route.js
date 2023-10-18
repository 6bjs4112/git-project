import { qe } from '../../db';

// export async function GET() {
//     let data = await qe('SELECT * from dm_borad');
//     console.log(data);
//     return Response.json(data);
// }

export async function POST(req) {
    let userData = await req.json();
    await qe(`
        insert into dm_borad set   
        title = '${userData.nickName}', 
        answer='${userData.selectedDigimon}', 
        path='${userData.dataURL}', 
        dm_id='${userData.SDid}',
        wr_id='${userData.mb_id}',
        wr_icon='${userData.mb_icon}',
        wr_img='${userData.mb_img}',
        wr_date='${userData.toDay}'
    `);
    return Response.json([]);
}
