
import { disableFeedback, enableFeedback, fetchFeedbackEvent, fetchFeedbackExhibit, fetchFeedbackTopic } from "@/services/feedback";
import { sendNotification } from "@/utils/utils";
import { Effect, Reducer } from "umi";

export interface FeedbackState {
    data: any;
    message: string;
    tableLoading: boolean;

    
    createFormVisible: boolean;
}
export interface FeedbackType {
    namespace: string;
    state: FeedbackState;
    effects: {
        fetchFeedbackTopic: Effect;
        fetchFeedbackEvent: Effect;

        enableFeedback: Effect;
        disableFeedback: Effect;

        showCreateForm: Effect;
        hideCreateForm: Effect;
    };
    reducers: {
        returnData: Reducer;
        loadingTable: Reducer;
        displayCreateForm: Reducer; 
    }
}
const FeedbackModel: FeedbackType = {
    namespace: "feedback",
    state: {
        data: [],
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
        
        
        *fetchFeedbackTopic({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchFeedbackTopic, payload);
            console.log("fetchFeedbackTopic response", response);
            yield put({
                type: 'returnData',
                payload: response
            });
        },
        *fetchFeedbackEvent({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchFeedbackEvent, payload);
            console.log("fetchFeedbackEvent response", response);
            yield put({
                type: 'returnData',
                payload: response
            });
        },
        *enableFeedback({ payload }, { call, put }) {
            const response = yield call(enableFeedback, payload);
            console.log('enableFeedback ', response);
            sendNotification('Bình luận đã hiện', '', 'success')

        },
        *disableFeedback({ payload }, { call, put }) {
            const response = yield call(disableFeedback, payload);
            console.log('disableFeedback ', response);
            sendNotification('Bình luận đã ẩn', '', 'success')
        },    
    },
    reducers: {

        returnData(state, { payload }) {
            payload.forEach((feedback: any) => {
                feedback.key = feedback.id
            });
            return {
                ...state,
                data: payload,
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
export default FeedbackModel;