import request from '@/utils/request'


export async function fetchTopicOrEventInRoom(id: number) {
    return request(`/api/room/get/event/or/topic/in/room?roomId=${id}`);
} 
export async function fetchRoomFromFloor(id: number, status: number) {
    return request(`/api/room/get-room-from-floor?floorNo=${id}&status=${status}`);
} 
export async function insertTopicToRoom(values: any) {
    return request('/api/room/add/topic/in/room', {
        method : 'POST',
        body: JSON.stringify(values),
        
    });
}

export async function insertEventToRoom(values: any) {
    return request('/api/room/add/event/in/room', {
        method : 'POST',
        body: JSON.stringify(values),
        
    });
}
export async function uploadMapInfor(values: any) {
    return request('/api/map/import-map-for-admin', {
        method : 'POST',
        headers: {
            'Content-Type' : 'multipart/form-data',
        },
        body: values      
    });
}
export async function deleteEventInRoom(eventID : any){
    return request(`/api/room/delete/event/in/room/id=${eventID}`, {
        method: 'DELETE'
    });
}
export async function deleteTopicInRoom(TopicID : any){
    return request(`/api/room/delete/topic/in/room/id=${TopicID}`, {
        method: 'DELETE'
    });
}
export async function getMapImage(id: any){
    return request(`/api/map/get-map-image-by-floor-for-admin?FloorId=${id}`);
} 