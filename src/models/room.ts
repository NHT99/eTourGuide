import { deleteEventInRoom, deleteTopicInRoom, fetchRoomFromFloor, fetchTopicOrEventInRoom, getMapImage, insertEventToRoom, insertTopicToRoom, uploadMapInfor } from "@/services/room";
import { sendNotification } from "@/utils/utils";
import { message } from "antd";
import { Effect, Reducer } from "umi";

export interface RoomState {
    data: any;
    roomLoading: boolean;

    roomFloor: any;
    message: string;
    tableLoading: boolean;

    formUploadVisible: boolean;

}
export interface RoomType {
    namespace: string;
    state: RoomState;
    effects: {
        fetchTopicOrEventInRoom: Effect;
        insertTopicToRoom: Effect;
        insertEventToRoom: Effect;
        deleteTopicInRoom: Effect;
        deleteEventInRoom: Effect;
        getMapImage: Effect;
        fetchRoomFromFloor: Effect;
        uploadMapInfor : Effect;

        showFormUpload : Effect;
        hideFormUpload : Effect;

    };
    reducers: {
        returnImageStr: Reducer;
        returnRoomData: Reducer;
        returnFloorRoomData: Reducer;

        loadingForm : Reducer;
        loadingTable: Reducer;
        displayFormUpload: Reducer;
    }
}
const RoomModel: RoomType = {
    namespace: "room",
    state: {
        data: [],
        message: "",
        roomFloor : [],
        roomLoading : false,
        tableLoading: false,
        formUploadVisible: false,
    },
    effects: {
        *showFormUpload({payload} , {call, put}){
            yield put({
                type: 'displayFormUpload',
                payload: true
            })
        },
        *hideFormUpload({payload} , {call, put}){
            yield put({
                type: 'displayFormUpload',
                payload: false
            })
        },
        *fetchTopicOrEventInRoom({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });
            
            const response = yield call(fetchTopicOrEventInRoom, payload);

            console.log("fetchTopicOrEventInRoom> response", response);
            if (response.roomId != undefined) {
                yield put({
                    type: 'returnRoomData',
                    payload: response
                });
            } else {
                yield put({
                    type: 'returnRoomData',
                    payload: { roomId: payload }
                });
            }
        },
        *fetchRoomFromFloor({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });
            const {floorNo, status} = payload
            const response = yield call(fetchRoomFromFloor, floorNo, status);

            console.log("fetchRoomFromFloor> response", response);
        
                yield put({
                    type: 'returnFloorRoomData',
                    payload: response
                });
            
        },
        *getMapImage({payload}, {call, put}){
            const response = yield call(getMapImage, payload)
            console.log("response ", response);
            
            yield put({
                type:'returnImageStr',
                payload: response,
            })
        },
        *insertTopicToRoom({ payload }, { call, put }) {
            const response = yield call(insertTopicToRoom, payload);
            console.log("insertTopicToRoom", response);

            if (response.status == 500) {
                sendNotification('Th??m ch??? ????? th???t b???i!', 'Vui l??ng ch???n ch??? ????? c???n th??m', 'error')
            }
            else {
                sendNotification('Th??m ch??? ????? v??o ph??ng th??nh c??ng!', '', 'success')
            }
        },
        *insertEventToRoom({ payload }, { call, put }) {
            const response = yield call(insertEventToRoom, payload);
            console.log("insertEventToRoom", response);

            if (response.status == 500) {
                sendNotification('Th??m s??? ki???n th???t b???i !!', 'Vui l??ng ch???n s??? ki???n c???n th??m', 'error')
            }
            else {
                sendNotification('Th??m s??? ki???n v??o ph??ng th??nh c??ng!', '', 'success')
            }
        },
        *uploadMapInfor({ payload }, { call, put }) {
            yield put({
                type:'loadingForm',
                payload: true,
            })
            const response = yield call(uploadMapInfor, payload);
            console.log("payload upload map>>>> ", payload);
            
            console.log("uploadMapInfor", response);

            if (response.status == 500) {
                sendNotification('T???i l??n th??ng tin b???n ????? kh??ng th??nh c??ng!', '', 'error')
            }
            else {
                sendNotification('Th??ng tin b???n ????? ???? ???????c t???i l??n!', 'Vui l??ng li??n h??? v???i ng?????i c?? th???m quy???n ????? ???????c duy???t', 'success')
            }
            yield put({
                type:'loadingForm',
                payload: false,
            })
        },
        *deleteTopicInRoom({ payload }, { call, put }) {
            const response = yield call(deleteTopicInRoom, payload);
            console.log(' delete topic ', response);
            if (response.status == 500) {
                sendNotification('Xo?? ch??? ????? kh???i ph??ng kh??ng th??nh c??ng!', 'Ch??? ????? ??ang ???????c di???n ra trong ph??ng n??y', 'error')
            }
            else {
                sendNotification('Xo?? ch??? ????? kh???i ph??ng th??nh c??ng!', '', 'success')
            }
        },
        *deleteEventInRoom({ payload }, { call, put }) {
            const response = yield call(deleteEventInRoom, payload);
            console.log(' delete topic ', response);
            if (response.status == 500) {
                sendNotification('Xo?? s??? ki???n kh???i ph??ng kh??ng th??nh c??ng!', 'S??? ki???n ??ang ???????c di???n ra trong ph??ng n??y', 'error')
            }
            else {
                sendNotification('Xo?? s??? ki???n kh???i ph??ng th??nh c??ng!', '', 'success')
            }
        },
    },
    reducers: {

        returnRoomData(state, { payload }) {
            return {
                ...state,
                data: payload,
                tableLoading: false,
            };
        },
        returnImageStr(state, {payload}){
          return {
              ...state,
              message: payload,
          }  
        },
        returnFloorRoomData(state, {payload}){
            return{
                ...state,
                roomFloor: payload,
            }
        },
        loadingForm(state,{payload}){
            return{
                ...state,
                roomLoading: payload,
            }
        },
        loadingTable(state, { payload }) {
            return {
                ...state,
                tableLoading: payload,
            };
        },
        displayFormUpload(state, {payload}){
            return{
                ...state,
                formUploadVisible: payload,
            }
        }
    }
}
export default RoomModel;
