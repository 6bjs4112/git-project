import {toMeal_trainer,toMeal_member,toMeal_list,toMeal_comment,toMeal_face,toMeal_trainerMeal,toMeal_memberMeal} from '../db.js'

async function getDB(type){
    let result;
    switch(type){
        case 'tr': result = await toMeal_trainer.find().toArray(); break;
        case 'mb':  result = await toMeal_member.find().toArray(); break;
        case 'list': result = await toMeal_list.find().toArray() ; break;
        case 'com': result = await toMeal_comment.find().toArray() ; break;
        case 'face': result = await toMeal_face.find().toArray()  ; break;
        case 'trMeal': result = await toMeal_trainerMeal.find().toArray()  ; break;
        case 'mbMeal': result = await toMeal_memberMeal.find().toArray()  ; break;
    }
    return result;
}


async function postDB(type,mode,data){

    let result;
//mainList페이지
    //일반회원-> 내가 올린 식단의 고유값 배열로 가져오기
    if(type==='mb' && mode==='listIDGet'){
        const mealListId = [data.dbId];
        const idArray = await toMeal_list.find({post_user:{$in:mealListId}}).toArray();
        result = idArray.map(item => item._id);
    }
    if(type==='mb' && mode==='listIDCheck'){//DB에 해당회원이 있는지 확인
        const checkId = data.dbId;
        result= await toMeal_memberMeal.countDocuments({mbMeal_id:checkId});
    }

    //DB에 없음=> 신규 DB생성
    if(type==='mb' && mode==='makeList'){
        await toMeal_memberMeal.insertOne(data);
        result = await toMeal_memberMeal.find().toArray();
    }
    //DB에 있음=> 기존 DB에 추가
    if(type==='mb' && mode==='listUpdate'){
        const whoseList = data.mbMeal_id;
        const listId = data.mbMeal_list;

        result = await toMeal_memberMeal.updateOne(
            { "mbMeal_id": whoseList },{ $set:{"mbMeal_list": listId}}
        );
    }

    //트레이너->내가 평가해야할 식단 리스트에 추가하기
    if(type==='tr' && mode==='familyGet'){//내 회원들 정보 가져오기
        const getById = data.myFam;
        result = await toMeal_member.find({ mb_id: { $in: getById } }).toArray();
    }
    if(type==='tr' && mode==='familyNewList'){//내 회원이 새로 작성한 List가져오기
        const famId = data;
        result= await toMeal_memberMeal.find({ mbMeal_id:{ $in: famId }}).toArray();
    }
    if(type==='tr' && mode==='listIDCheck'){//DB에 해당회원이 있는지 확인
        const checkId = data.tr_dbId;
        result= await toMeal_trainerMeal.countDocuments({trMeal_id:checkId});
    }
    //DB에 없음=> 신규 DB생성
    if(type==='tr' && mode==='makeList'){
        await toMeal_trainerMeal.insertOne(data);
        result = await toMeal_trainerMeal.find().toArray();
    }
    //DB에 있음=> 기존 DB에 추가
    if(type==='tr' && mode==='listUpdate'){
        const whoseList = data.trMeal_id;
        const listArray = data.trMeal_list;

        result = await toMeal_trainerMeal.updateOne(//전체 리스트 업데이트
            { "mbMeal_id": whoseList },{ $set:{"trMeal_list": listArray}}
        );
        await toMeal_trainerMeal.updateOne(//전체 리스트 업데이트
            { "mbMeal_id": whoseList },{ $set:{"trMeal_list": listArray}}
        );
        // result = await toMeal_trainerMeal.updateOne(//미평가 리스트 갱신
        //     { "mbMeal_id": whoseList },{ $set:{"trMeal_needJudge": '???'}}
        // );
    }
//mealList 페이지
    //내가 올린 식단만 보기(일반멤버)
    //멤버의 고유id를 받아서, 자신의 식단 고유id들을 반환
    if(type==='mb' && mode==='listGet'){
        const mealListId = [data.dbId];
        // console.log(mealListId);
        // result = await toMeal_list.find({post_user:{$in:mealListId}}).toArray();
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
