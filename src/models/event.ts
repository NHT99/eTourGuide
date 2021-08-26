import { approveEvent, deleteEvent, deleteObjectInEvent, fetchEvent, fetchEventByName, fetchEventHasNoRoom, fetchExhibitEvent, fetchExhibitOnClosedEvent, insertEvent, insertObjectToEvent, updateEvent } from "@/services/event";
import { sendNotification } from "@/utils/utils";

import { Effect, Reducer } from "umi";

export interface EventState {
    data: any;
    exhibitInEvent: any;

    message: string;
    tableLoading: boolean;

    createFormVisible: boolean;
}
export interface EventType {
    namespace: string;
    state: EventState;
    effects: {
        fetchData: Effect;
        insertEvent: Effect;
        updateEvent: Effect;
        deleteEvent: Effect;
        approveEvent: Effect;
        insertObjectToEvent: Effect;
        fetchEventHasNoRoom: Effect;
        fetchExhibitEvent: Effect;
        deleteObjectInEvent : Effect;
        fetchEventByName: Effect;
        fetchExhibitOnClosedEvent: Effect;

        showCreateForm: Effect;
        hideCreateForm: Effect;
    };
    reducers: {
        returnData: Reducer;
        returnExhibitInEvent: Reducer;

        loadingTable: Reducer;
        displayCreateForm: Reducer;
    }
}
const EventModel: EventType = {
    namespace: "event",
    state: {
        data: [],
        exhibitInEvent: [],
        message: "",
        createFormVisible: false,
        tableLoading: false,
    },
    effects: {
        *showCreateForm({ payload }, { call, put }) {
            yield put({
                type: 'displayCreateForm',
                payload: true
            });
        },
        *hideCreateForm({ payload }, { call, put }) {
            yield put({
                type: 'displayCreateForm',
                payload: false
            });
        },
        *fetchData({payload} , {call, put}){
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchEvent, payload);
            console.log("Model RUNNN >>>> response ", response);
            yield put({
                type: 'returnData',
                payload: response,
            });
        },
        *fetchEventHasNoRoom({payload} , {call, put}){
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchEventHasNoRoom, payload);
            console.log("fetchEventHasNoRoom> response ", response);
            yield put({
                type: 'returnData',
                payload: response,
            });
        },
        *fetchExhibitEvent({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchExhibitEvent, payload);

            console.log("fetchExhibitEvent response", response);

            yield put({
                type: 'returnExhibitInEvent',
                payload: response
            });
        },
        *fetchEventByName({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchEventByName, payload);

            console.log("fetchEventByName response", response);

            yield put({
                type: 'returnData',
                payload: response
            });

        },
        *fetchExhibitOnClosedEvent({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchExhibitOnClosedEvent, payload);

            console.log("fetchExhibitOnClosedEvent response", response);

            yield put({
                type: 'returnExhibitInEvent',
                payload: response
            });
        },
        *insertEvent({ payload }, {call, put} ){
            const response = yield call(insertEvent, payload);
            console.log("insert event response ", response);
            if (response.type == ""){
                sendNotification('Thêm sự kiện thất bại!', 'Tên sự kiện này đã bị trùng với chủ đề khác!', 'error')
            } else
            if (response.status == 500) {
                sendNotification('Thêm sự kiện thất bại!', 'Vui lòng nhập đầy đủ thông tin', 'error')
            } else {
                sendNotification('Thêm sự kiện thành công!', '', 'success')
            }
            
        },
        *updateEvent({ payload }, {call, put}){
            const response = yield call(updateEvent , payload);
            console.log(" update event response ", response); 
            if (response.type == ""){
                sendNotification('Cập nhật sự kiện thất bại!', 'Sự kiện này đã bị trùng với chủ đề khác!', 'error')
            } else
            if (response.status == 500) {
                sendNotification('Cập nhật sự kiện thất bại!', '', 'error')
            }  else {
                sendNotification('Cập nhật sự kiện thành công!', '', 'success')
            }   
               
        },
        *deleteEvent({ payload }, {call, put}){
            const response = yield call(deleteEvent, payload);
            console.log(" delete event response ", response);    
            if (response.status == 500) {
                sendNotification('Xoá sự kiện không thành công!','Sự kiện này đang được diễn ra', 'error')
            }
            else{
                sendNotification('Xoá sự kiện thành công!', '', 'success')
            }      
        },
        *deleteObjectInEvent({ payload }, {call, put}){
            const response = yield call(deleteObjectInEvent , payload);
            console.log(' deleteObjectInTopic topic ', response);
            sendNotification('Xoá hiện vật khỏi sự kiện thành công!', '', 'success')
        },
        *approveEvent({ payload }, {call, put}){
            const response = yield call(approveEvent, payload);
            console.log(" approve event ", response);
            if(response.status == 500){
                sendNotification('Kích hoạt sự kiện không thành công!', 'Sự kiện chưa có trong phòng', 'error')
            }
            else{
                sendNotification('Kích hoạt sự kiện thành công!', '', 'success')
            }
        },
        *insertObjectToEvent({payload} , {call, put}){
            const response = yield call(insertObjectToEvent, payload);
            console.log('insert object to topic response ', response);
            
            if(response.status == 500){
                sendNotification('Thêm hiện vật vào sự kiện thất bại!', 'Vui lòng chọn hiện vật cần thêm', 'error')
            }
            else{
                sendNotification('Thêm hiện vật vào sự kiện thành công!', '', 'success')
            }
        }
    },
    reducers: {
        returnData(state, { payload }) {
            payload.forEach((event: any) => {
                event.key = event.id
            });
            return {
                ...state,
                data: payload,
                tableLoading: false,
            };
        },
        returnExhibitInEvent(state, { payload }) {
            return {
                ...state,
                exhibitInEvent: payload,
                tableLoading: false,
            };
        },
        loadingTable(state, { payload }) {
            return {
                ...state,
                tableLoading: payload,
            };
        },
        displayCreateForm(state, { payload }) {
            return {
                ...state,
                createFormVisible: payload
            };
        },
    }
}
export default EventModel;