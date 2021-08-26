import request from '@/utils/request'
export async function fetchTopic(obj: any) {
    return request(`/api/topic/admin`);
} 
export async function fetchTopicHasNoRoom(obj: any) {
    return request(`/api/topic/get/topic/has/no/room`);
} 
export async function fetchExhibitTopic(id: any) {
    return request(`/api/exhibit-in-topic/get/exhibit/in/topic/for/admin?topicId=${id}`);
} 
export async function fetchTopicByName(name: any){
    return request(`/api/topic/search-topic-by-name-for-admin?name=${name}`);
}
export async function fetchExhibitOnClosedTopic(id: any) {
    return request(`/api/exhibit-in-topic/get/exhibit/in/closed/topic/for/admin?topicId=${id}`);
} 
export async function insertTopic(values: any) {
    return request('/api/topic/add/topic', {
        method : 'POST',
        body: JSON.stringify(values),
        
    });
}
export async function updateTopic(values : any){
    return request(`/api/topic/id=${values.id}`,{
        method: 'PUT',
        body: JSON.stringify(values),
    });
}
export async function deleteTopic(topicId : any){
    // var tmp = '';
    // // topicIds.array.forEach((id : any ) => {
    //     tmp += `id=${id}`
    // // });
    return request(`/api/topic/id=${topicId}`, {
        method: 'DELETE'
    });
}
export async function approveTopic(values : any) {
    return request(`/api/topic/active/topic/id=${values.id}`,{
        method: 'PUT',
        body : JSON.stringify(values),
    })
}

export async function insertObjectToTopic(values: any) {
    return request('/api/topic/add/exhibit/to/topic', {
        method : 'POST',
        body: JSON.stringify(values),
        
    });
}
export async function deleteObjectInTopic(objId : any){
    // var tmp = '';
    // // topicIds.array.forEach((id : any ) => {
    //     tmp += `id=${id}`
    // // });
    return request(`/api/exhibit-in-topic/delete/exhibit/in/topic/id=${objId}`, {
        method: 'DELETE'
    });
}
