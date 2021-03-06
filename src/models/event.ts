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
                sendNotification('Th??m s??? ki???n th???t b???i!', 'T??n s??? ki???n n??y ???? b??? tr??ng v???i ch??? ????? kh??c!', 'error')
            } else
            if (response.status == 500) {
                sendNotification('Th??m s??? ki???n th???t b???i!', 'Vui l??ng nh???p ?????y ????? th??ng tin', 'error')
            } else {
                sendNotification('Th??m s??? ki???n th??nh c??ng!', '', 'success')
            }
            
        },
        *updateEvent({ payload }, {call, put}){
            const response = yield call(updateEvent , payload);
            console.log(" update event response ", response); 
            if (response.type == ""){
                sendNotification('C???p nh???t s??? ki???n th???t b???i!', 'S??? ki???n n??y ???? b??? tr??ng v???i ch??? ????? kh??c!', 'error')
            } else
            if (response.status == 500) {
                sendNotification('C???p nh???t s??? ki???n th???t b???i!', '', 'error')
            }  else {
                sendNotification('C???p nh???t s??? ki???n th??nh c??ng!', '', 'success')
            }   
               
        },
        *deleteEvent({ payload }, {call, put}){
            const response = yield call(deleteEvent, payload);
            console.log(" delete event response ", response);    
            if (response.status == 500) {
                sendNotification('Xo?? s??? ki???n kh??ng th??nh c??ng!','S??? ki???n n??y ??ang ???????c di???n ra', 'error')
            }
            else{
                sendNotification('Xo?? s??? ki???n th??nh c??ng!', '', 'success')
            }      
        },
        *deleteObjectInEvent({ payload }, {call, put}){
            const response = yield call(deleteObjectInEvent , payload);
            console.log(' deleteObjectInTopic topic ', response);
            sendNotification('Xo?? hi???n v???t kh???i s??? ki???n th??nh c??ng!', '', 'success')
        },
        *approveEvent({ payload }, {call, put}){
            const response = yield call(approveEvent, payload);
            console.log(" approve event ", response);
            if(response.status == 500){
                sendNotification('K??ch ho???t s??? ki???n kh??ng th??nh c??ng!', 'S??? ki???n ch??a c?? trong ph??ng', 'error')
            }
            else{
                sendNotification('K??ch ho???t s??? ki???n th??nh c??ng!', '', 'success')
            }
        },
        *insertObjectToEvent({payload} , {call, put}){
            const response = yield call(insertObjectToEvent, payload);
            console.log('insert object to topic response ', response);
            
            if(response.status == 500){
                sendNotification('Th??m hi???n v???t v??o s??? ki???n th???t b???i!', 'Vui l??ng ch???n hi???n v???t c???n th??m', 'error')
            }
            else{
                sendNotification('Th??m hi???n v???t v??o s??? ki???n th??nh c??ng!', '', 'success')
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