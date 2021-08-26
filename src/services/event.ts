import request from "@/utils/request";

export async function fetchEvent(obj: any) {
    return request(`/api/event/getAllEvent/Admin`);
} 
export async function fetchEventHasNoRoom(obj: any) {
    return request(`/api/event/get/event/has/no/room`);
} 
export async function fetchExhibitEvent(id: any) {
    return request(`/api/exhibit-in-event/get/exhibit/in/event/for/admin?eventId=${id}`);
} 
export async function fetchEventByName(name: any){
    return request(`/api/event/search-event-by-name-for-admin?name=${name}`);
}
export async function fetchExhibitOnClosedEvent(id: any){
    return request(`/api/exhibit-in-event/get/exhibit/in/closed/event/for/admin?eventId=${id}`)
}
export async function insertEvent(values :any) {
    return request(`/api/event`, {
        method : 'POST',
        body : JSON.stringify(values),
    });
}
export async function updateEvent(values : any){
    return request(`/api/event/id=${values.id}`,{
        method : 'PUT',
        body : JSON.stringify(values),
    });
}
export async function deleteEvent(EventId : any){
    return request(`/api/event/id=${EventId}`, {
        method : 'DELETE' 
    });
}
export async function approveEvent(value:any) {
    return request(`/api/event/active/event/id=${value.id}`, {
        method: 'PUT',
        body : JSON.stringify(value),
    });
}
export async function insertObjectToEvent(values :any) {
    return request(`/api/event/add/exhibit/to/event`, {
        method : 'POST',
        body : JSON.stringify(values),
    });
}
export async function deleteObjectInEvent(objId : any){
    // var tmp = '';
    // // topicIds.array.forEach((id : any ) => {
    //     tmp += `id=${id}`
    // // });
    return request(`/api/exhibit-in-event/delete/exhibit/in/event/id=${objId}`, {
        method: 'DELETE'
    });
}                                                           