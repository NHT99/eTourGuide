import request from '@/utils/request'

export async function fetchExhibitList(obj: any) {
    return request(`/api/exhibit/get/all/exhibit/for/admin`);
} 
export async function fetchAvailableObjectList(obj: any) {
    return request(`/api/exhibit/get/available/exhibit`);
} 
export async function fetchExhibitByName(name: any){
    return request(`/api/exhibit/search-exhibit-by-name-for-admin?name=${name}`);
}
export async function fetchTopicEventOfExhibits(id: any){
    return request(`/api/exhibit/get-topic-or-event-contain-exhibit?exhibitId=${id}`);
}
export async function insertExhibit(values: any) {
    return request(`/api/exhibit/add/exhibit`, {
        method : 'POST',
        body : JSON.stringify(values),
    });
} 
export async function updateExhibit(values: any) {
    return request(`/api/exhibit/id=${values.id}`,{
        method: 'PUT',
        body: JSON.stringify(values),
    });
} 
export async function deleteExhibit(exhibitId: any){
    // var tmp = '';
    // // topicIds.array.forEach((id : any ) => {
    //     tmp += `id=${id}`
    // // });
    return request(`/api/exhibit/id=${exhibitId}`, {
        method: 'DELETE'
    });
}