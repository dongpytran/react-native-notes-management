import axios from "axios"

const url = 'http://noteapi.somee.com';
export function getAll(){
    return axios.get(url + '/Note').then(res => res.data)
    .catch(error => {
        console.log(error);
    });
}
export function addNote(note){
    return axios.post(url + '/Note', note).then(res => res.data)
    .catch(error => {
        console.log(error);
    });
}
export function updateNode(id, note){
    return axios.put(url + '/Note/'+id, note).then(res => res.data)
    .catch(error => {
        console.log(error);
    });
}
export function deleteNote(id){
    return axios.delete(url + '/Note/'+id).then(res => res.data)
    .catch(error => {
        console.log(error);
    });
}
export function searchNote(keyword,searchType){
    if(searchType == '0'){
        return axios.get(url + '/Note/?id='+ keyword).then(res => res.data)
        .catch(error => {
        console.log(error);
        });
    }else{
        return axios.get(url + '/Note/?title='+ keyword).then(res => res.data)
        .catch(error => {
        console.log(error);
        });
    }
}