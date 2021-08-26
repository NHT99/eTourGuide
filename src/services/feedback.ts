import request from '@/utils/request'


export async function fetchFeedbackTopic(obj: any) {
    return request(`/api/feedback/get/feedback/topic/for/admin`);
} 
export async function fetchFeedbackEvent(obj: any) {
    return request(`/api/feedback/get/feedback/event/for/admin`);
} 
export async function enableFeedback(id : any){
    return request(`/api/feedback/enable/feeback/for/admin/id=${id}`,{
        method: 'PUT',
        body: JSON.stringify(id),
    });
}
export async function disableFeedback(id : any){
    return request(`/api/feedback/disable/feeback/for/admin/id=${id}`,{
        method: 'PUT',
        body: JSON.stringify(id),
    });
}