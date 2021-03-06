import { approveTopic, deleteObjectInTopic, deleteTopic, fetchExhibitOnClosedTopic, fetchExhibitTopic, fetchTopic, fetchTopicByName, fetchTopicHasNoRoom, insertObjectToTopic, insertTopic, updateTopic } from "@/services/topic";
import { sendNotification } from "@/utils/utils";
import { Effect, Reducer } from "umi";

export interface TopicState {
    data: any;
    exhibitInTopic: any;

    message: string;
    tableLoading: boolean;

    objectDetailForm: boolean;
    createFormVisible: boolean;
}
export interface TopicType {
    namespace: string;
    state: TopicState;
    effects: {
        fetchData: Effect;
        insertTopic: Effect;
        updateTopic: Effect;
        deleteTopic: Effect;
        approveTopic: Effect;
        insertObjectToTopic: Effect;
        fetchTopicHasNoRoom: Effect;
        fetchExhibitTopic: Effect;
        deleteObjectInTopic: Effect;
        fetchTopicByName: Effect;
        fetchExhibitOnClosedTopic: Effect;

        showCreateForm: Effect;
        hideCreateForm: Effect;
        showDetailForm: Effect;
        hideDetailForm: Effect;

    };
    reducers: {
        returnData: Reducer;
        returnExhibitInTopic: Reducer;

        loadingTable: Reducer;


        approveTopicError: Reducer;
        displayCreateForm: Reducer;
        displayobjectTopicForm: Reducer;
    }
}
const TopicModel: TopicType = {
    namespace: "topic",
    state: {
        data: [],
        message: "",
        exhibitInTopic: [],
        objectDetailForm: false,
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

        *showDetailForm({ payload }, { call, put }) {
            yield put({
                type: 'displayobjectTopicForm',
                payload: true
            });
        },
        *hideDetailForm({ payload }, { call, put }) {
            yield put({
                type: 'displayobjectTopicForm',
                payload: false
            });
        },
        *fetchData({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchTopic, payload);
            console.log("Model RUNNN >>>> response", response);
            yield put({
                type: 'returnData',
                payload: response
            });
        },
        *fetchTopicHasNoRoom({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchTopicHasNoRoom, payload);
            console.log("fetchTopicHasNoRoom response", response);
            yield put({
                type: 'returnData',
                payload: response
            });
        },
        *fetchExhibitTopic({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchExhibitTopic, payload);


            yield put({
                type: 'returnExhibitInTopic',
                payload: response
            });


        },
        *fetchTopicByName({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchTopicByName, payload);

            console.log("fetchTopicByName response", response);

            yield put({
                type: 'returnData',
                payload: response
            });


        },
        *fetchExhibitOnClosedTopic({ payload }, { call, put }) {
            yield put({
                type: 'loadingTable',
                payload: true
            });

            const response = yield call(fetchExhibitOnClosedTopic, payload);

            yield put({
                type: 'returnExhibitInTopic',
                payload: response
            });


        },
        *insertTopic({ payload }, { call }) {
            const response = yield call(insertTopic, payload);
            console.log('insertTopic ', response);
            if (response.type == "") {
                sendNotification('Th??m ch??? ????? th???t b???i!', 'T??n ch??? ????? n??y ???? b??? tr??ng v???i ch??? ????? kh??c!', 'error')
            } else
                if (response.status == 500) {
                    sendNotification('Th??m ch??? ????? th???t b???i!', '', 'error')
                } else {
                    sendNotification('Th??m ch??? ????? th??nh c??ng !', '', 'success')
                }

        },
        *updateTopic({ payload }, { call }) {
            const response = yield call(updateTopic, payload);
            console.log(' update topic ', response);
            if (response.type == "") {
                sendNotification('C???p nh???t ch??? ????? th???t b???i!', 'T??n ch??? ????? n??y ???? b??? tr??ng v???i ch??? ????? kh??c!', 'error')
            } else
                if (response.status == 500) {
                    sendNotification('C???p nh???t ch??? ????? th???t b???i!', '', 'error')
                } else {
                    sendNotification('C???p nh???t ch??? ????? th??nh c??ng!', '', 'success')
                }

        },
        *deleteTopic({ payload }, { call }) {
            const response = yield call(deleteTopic, payload);
            console.log(' delete topic ', response);
            if (response.status == 500) {
                sendNotification('Xo?? ch??? ????? kh??ng th??nh c??ng!', 'Ch??? ????? n??y ??ang ???????c di???n ra', 'error')
            }
            else {
                sendNotification('Xo?? ch??? ????? th??nh c??ng!', '', 'success')
            }
        },
        *deleteObjectInTopic({ payload }, { call }) {
            const response = yield call(deleteObjectInTopic, payload);
            console.log(' deleteObjectInTopic topic ', response);
            if (response.status == 500) {
                sendNotification('Xo?? hi???n v???t kh???i ch??? ????? th???t b???i!', '', 'error')
            }
            else {
                sendNotification('Xo?? hi???n v???t kh???i ch??? ????? th??nh c??ng!', '', 'success')
            }

        },
        *approveTopic({ payload }, { call }) {
            const response = yield call(approveTopic, payload);
            console.log(">>>>>>>>>", response);

            if (response.status == 500) {
                sendNotification('K??ch ho???t ch??? ????? kh??ng th??nh c??ng!', 'Ch??? ????? ch??a c?? trong ph??ng', 'error')
            }
            else {
                sendNotification('K??ch ho???t ch??? ????? th??nh c??ng!', '', 'success')
            }

        },
        *insertObjectToTopic({ payload }, { call }) {
            const response = yield call(insertObjectToTopic, payload);
            console.log('insertTopic ', response);
            if (response.status == 500) {
                sendNotification('Th??m hi???n v???t v??o ch??? ????? th???t b???i!', 'Vui l??ng ch???n hi???n v???t c???n th??m', 'error')
            }
            else {
                sendNotification('Th??m hi???n v???t v??o ch??? ????? th??nh c??ng!', '', 'success')
            }
        },
    },
    reducers: {

        returnData(state, { payload }) {
            payload.forEach((topic: any) => {
                topic.key = topic.id
            });
            return {
                ...state,
                data: payload,
                tableLoading: false,
            };
        },

        returnExhibitInTopic(state, { payload }) {
            payload.forEach((exhibits: any) => {
                exhibits.key = exhibits.id
            });
            return {
                ...state,
                exhibitInTopic: payload,
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
        displayobjectTopicForm(state, { payload }) {
            return {
                ...state,
                objectDetailForm: payload
            };
        },
        approveTopicError(state, { payload }) {
            return {
                ...state,
                message: "appove error"
            }
        }

    }
}
export default TopicModel;