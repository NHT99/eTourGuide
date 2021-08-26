import { deleteExhibit, fetchAvailableObjectList, fetchExhibitByName, fetchExhibitList, fetchTopicEventOfExhibits, insertExhibit, updateExhibit } from "@/services/exhibit";
import { sendNotification } from "@/utils/utils";
import { Effect, Reducer } from "umi";

export interface ExhibitState {
    data: any;
    message: string;
    tableLoading: boolean;
    

    createFormVisible: boolean;

}
export interface ExhibitType {
    namespace: string;
    state: ExhibitState;
    effects: {
        fetchExhibitList: Effect;
        fetchAvailableObjectList: Effect;
        insertExhibit: Effect;
        updateExhibit: Effect;
        deleteExhibit: Effect;
        fetchExhibitByName: Effect;
        fetchTopicEventOfExhibits: Effect;

        showCreateForm: Effect;
        hideCreateForm: Effect;
    };
    reducers: {
        returnData: Reducer;
        returnAvailableObjectList: Reducer;
        returnTopicOrEventOfExh: Reducer;

        displayCreateForm: Reducer;
        loadingTable: Reducer;

    }
}
const ExhibitModel: ExhibitType = {
    namespace: "exhibit",
    state: {
        data: [],
        message: "",
        createFormVisible: false,
        tableLoading: false

    },
    effects: {
        *showCreateForm({ payload }, { call, put }) {
            yield put({
                type: 'displayCreateForm',
                payload: true
            })
        },
        *hideCreateForm({ payload }, { call, put }) {
            yield put({
                type: 'displayCreateForm',
                payload: false
            })
        },


        *fetchExhibitList({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchExhibitList, payload);
            console.log("Model RUNNN >>>> response", response);
            yield put({
                type: 'returnData',
                payload: response
            });
        },

        *fetchAvailableObjectList({ payload }, { call, put }) {
            const response = yield call(fetchAvailableObjectList, payload);
            console.log("fectch object otpic lis >>>>. responsadasdasdse", response);
            yield put({
                type: 'returnAvailableObjectList',
                payload: response
            })
        },
        *fetchExhibitByName({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchExhibitByName, payload);

            console.log("fetchExhibitByName response", response);

            yield put({
                type: 'returnData',
                payload: response
            });
        },
        *fetchTopicEventOfExhibits({ payload }, { call, put }) {
            const response = yield call(fetchTopicEventOfExhibits, payload);

            console.log("fetchTopicEventOfExhibits response", response);

            yield put({
                type: 'returnTopicOrEventOfExh',
                payload: response
            });
            
        },
        *insertExhibit({ payload }, { call, put }) {
            const response = yield call(insertExhibit, payload);
            console.log("insertExhibits >>>>. responsadasdasdse", response);
            if (response.type == ""){
                sendNotification('Thêm hiện vật thất bại!', 'Tên hiện vật này đã bị trùng với chủ đề khác!', 'error')
            } else
            if (response.status == 500) {
                sendNotification('Thêm hiện vật thất bại!!', 'Vui lòng nhập đầy đủ thông tin', 'error')
            } else {
                sendNotification('Thêm hiện vật thành công !!', '', 'success')
            }
        },
        *updateExhibit({ payload }, { call, put }) {
            const response = yield call(updateExhibit, payload);
            console.log(' update topic ', response);
            if (response.type == ""){
                sendNotification('Cập nhật hiện vật thất bại!', 'Hiện vật này đã bị trùng với chủ đề khác!', 'error')
            } else
            if (response.status == 500) {
                sendNotification('Cập nhật hiện vật thất bại!', '', 'error')
            }  else {
                sendNotification('Cập nhật hiện vật thành công !!', '', 'success')
            }  
            
        },
        *deleteExhibit({ payload }, { call, put }) {
            const response = yield call(deleteExhibit, payload);
            console.log(' delete topic ', response);
            if (response.status == 500) {
                sendNotification('Xoá hiện vật không thành công!!', 'Hiện vật này đang được thêm vào chủ đề hoặc sự kiện', 'error')
            }
            else {
                sendNotification('Xoá hiện vật thành công', '', 'success')
            }
        },
    },
    reducers: {
        returnData(state, { payload }) {
            payload.forEach((exhibit: any) => {
                exhibit.key = exhibit.id
            });
            return {
                ...state,
                data: payload,
                tableLoading: false,
            }
        },

        returnAvailableObjectList(state, { payload }) {
            payload.forEach((exhibit: any) => {
                exhibit.key = exhibit.id
            });
            return {
                ...state,
                data: payload
            }
        },
        returnTopicOrEventOfExh(state, {payload}){       
            return{
                ...state,
                message: payload,
            }              
        },

        displayCreateForm(state, { payload }) {
            return {
                ...state,
                createFormVisible: payload
            };
        },
        loadingTable(state, { payload }) {
            return {
                ...state,
                tableLoading: payload,
            };
        },



    }
}
export default ExhibitModel;