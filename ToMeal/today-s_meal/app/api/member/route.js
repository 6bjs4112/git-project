import {toMeal_trainer,toMeal_member,toMeal_list,toMeal_comment,toMeal_face} from '../db.js'

async function getDB(type){
    let result;
    switch(type){
        case 'tr': result = await toMeal_trainer.find().toArray(); break;
        case 'mb':  result = await toMeal_member.find().toArray(); break;
        // case 'list': result = await toMeal_list.find().toArray() ; break;
        // case 'com': result = await toMeal_comment.find().toArray() ; break;
        // case 'face': result = await toMeal_face.find().toArray()  ; break;
    }
    return result;
}


async function postDB(type,mode,data){

    let result;
//회원가입페이지
    //DB에 저장하기
    if(type==='tr' && mode==='insert'){
        await toMeal_trainer.insertOne(data);
        result = await toMeal_trainer.find().toArray();
    }
    if(type==='mb' && mode==='insert'){
        await toMeal_member.insertOne(data);
        result = await toMeal_member.find().toArray();
    }
    //아이디 중복확인
    if(type==='tr' && mode==='idCheck'){
        const needCheckid = data.id;
    
        const query = {tr_id:needCheckid};
        result = await toMeal_trainer.countDocuments(query);
        console.log(result);
        if(result==0){return true;
        } else { return false; }
    }
    if(type==='mb' && mode==='idCheck'){
        const needCheckid = data.id;

        const query = {mb_id:needCheckid};
        result = await toMeal_member.countDocuments(query);
        console.log(result);
    
        if(result==0){ return true;
        }else{ return false; }
    }
    //트레이너 코드 확인 후 해당 트레이너에 회원 저장
    if(type==='mb' && mode==='codeCheck'){
        const needCheckCode = data.code;
        const needAddId = data.mb_id;
    
        result = await toMeal_trainer.countDocuments({tr_code:needCheckCode});
        console.log(result);
    
        if(result==0){
            return false;
        }else{
            //정확한 코드입력시, 해당 트레이너의 tr_family에 신규회원 id를 저장
            await toMeal_trainer.updateOne(
                { "tr_code": needCheckCode },
                { $push:{"tr_family": needAddId }}
            );
        }
    }

//로그인페이지
    if(type==='tr' && mode==='login'){
        const idCheck = data.id;
        const pwCheck = data.pw;
        result = await toMeal_trainer.findOne({tr_id:idCheck});

        //id확인
        if(!result){
            return false;
        }else{
            //id에 맞는 pw확인
            if(result.tr_pw == pwCheck){
                //로그인 성공
                return true;
            }else{
                return false;
            }
        }
    }
    if(type==='mb' && mode==='login'){
        const idCheck = data.id;
        const pwCheck = data.pw;
        result = await toMeal_member.findOne({mb_id:idCheck});

        //id확인
        if(!result){
            return false;
        }else{
            //id에 맞는 pw확인
            if(result.mb_pw == pwCheck){
                //로그인 성공
                return true;
            }else{
                return false;
            }
        }
    }
//마이페이지
    if(type==='tr' && mode==='bring'){
        const searchId = data.isTr;
        console.log(searchId);
        result = await toMeal_trainer.findOne({tr_id:searchId});
    }
    if(type==='mb' && mode==='bring'){
        const searchId = data.isMb;
        result = await toMeal_member.findOne({mb_id:searchId});
    }
    return result;
}

export async function GET(req) {
    let type = req.nextUrl.searchParams.get('type')
    let result = await getDB(type);

    return Response.json(result);
}


export async function POST(req) {
    let {type,mode} = Object.fromEntries(req.nextUrl.searchParams);
    let data = await req.json();
    let result = await postDB(type,mode,data)
    return Response.json(result);
}
