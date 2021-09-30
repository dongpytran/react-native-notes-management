import axios from "axios"

const url = 'http://noteapi.somee.com';
export async function getAll(){
    let res = await axios.get(url + '/Note');
    return res.data;
}
export async function addNote(note){
    return await axios.post(url + '/Note', note);
}
export async function updateNote(id, note){
    return await axios.put(url + '/Note/'+id, note);
}
export async function deleteNote(id){
    return await axios.delete(url + '/Note/'+id)
}
export async function searchNote(keyword,searchType){
    if(searchType == '0'){
        return (await (axios.get(url + '/Note/?id='+ keyword))).data;
    }else{
        return (await (axios.get(url + '/Note/?title='+ keyword))).data;
    }
}