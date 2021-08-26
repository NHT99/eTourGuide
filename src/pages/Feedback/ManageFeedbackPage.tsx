import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { connect, Dispatch } from 'umi';
import { Switch, Table, Tabs } from 'antd';
import { sendNotification } from '@/utils/utils';
import moment from 'moment';





interface ManageFeedbackPage {
    dispatch: Dispatch;
    feedback?: any;
}
let tabName = '';

const { TabPane } = Tabs;

let empFeedbackLocale = {
    emptyText: 'Chưa có phản hồi nào',
};

class ManageFeedbackPage extends React.Component<ManageFeedbackPage> {
    constructor(props: any) {
        super(props);
        this.fetchFeedbackTopic = this.fetchFeedbackTopic.bind(this);
        this.fetchFeedbackEvent = this.fetchFeedbackEvent.bind(this);
        this.hideCreateForm = this.hideCreateForm.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.enableFeedback = this.enableFeedback.bind(this);
        this.disableFeedback = this.disableFeedback.bind(this);
    }

    componentDidMount() {
        this.fetchFeedbackTopic()
    }

    render() {

        const { feedback } = this.props;
        console.log("feed back ", feedback);

        const TopicColumns = [

            {
                title: 'Tên chủ đề',
                dataIndex: 'topicName',
                key: 'topicName',
                // sorter: (a: { topicName: any; }, b: { topicName: any; }) => a.topicName.localeCompare(b.topicName),
                sorter: (a, b) => {
                    a = a.topicName || '';
                    b = b.topicName || '';
                    return a.localeCompare(b);
                }
            },
            {
                title: 'Tên khách thăm',
                dataIndex: 'visitorName',
                key: 'visitorName',
            },
            {
                title: 'Xếp hạng',
                dataIndex: 'rating',
                key: 'rating',
            },
            {
                title: 'Đánh giá',
                dataIndex: 'description',
                key: 'description',

            },
            {
                title: 'Ngày đánh giá',
                dataIndex: 'createDate',
                key: 'createDate',
                defaultSortOrder: 'descend',
                sorter: (a: { createDate: moment.MomentInput; }, b: { createDate: moment.MomentInput; }) => moment(a.createDate).unix() - moment(b.createDate).unix(),
            },
            {
                title: 'Ẩn/Hiện',
                dataIndex: 'status',
                key: 'status',
                render: (_: any, record: any) => {
                    console.log("chủ đề stt", record.status);

                    const toggle = () => {
                        record.status ? this.disableFeedback(record.id) : this.enableFeedback(record.id)
                    };
                    return (
                        <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" onChange={toggle} style={{ color: 'green' }}
                            defaultChecked={record.status} />
                    )
                },
            }
        ];
        const EventColumns = [

            {
                title: 'Tên sự kiện',
                dataIndex: 'eventName',
                key: 'eventName',
                // sorter: (e1: { eventName: any; }, e2: { eventName: any; }) => e1.eventName.localeCompare(e2.eventName),
                sorter: (a, b) => {
                    a = a.eventName || '';
                    b = b.eventName || '';
                    return a.localeCompare(b);
                }
            },
            {
                title: 'Tên khách thăm',
                dataIndex: 'visitorName',
                key: 'visitorName',
            },
            {
                title: 'Xếp hạng',
                dataIndex: 'rating',
                key: 'rating',
            },
            {
                title: 'Đánh giá',
                dataIndex: 'description',
                key: 'description',

            },
            {
                title: 'Ngày đánh giá',
                dataIndex: 'createDate',
                key: 'createDate',
                defaultSortOrder: 'descend',
                sorter: (a: { createDate: moment.MomentInput; }, b: { createDate: moment.MomentInput; }) => moment(a.createDate).unix() - moment(b.createDate).unix(),
            },
            {
                title: 'Ẩn/Hiện',
                dataIndex: '',
                key: 'x',
                render: (_: any, record: any) => {
                    const toggle = () => {
                        record.status ? this.disableFeedback(record.id) : this.enableFeedback(record.id)
                    };
                    return (
                        <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" onChange={toggle}
                            defaultChecked={record.status} />
                    )
                },
            }
        ];

        return (
            <div>
                <PageHeaderWrapper />
                <Tabs defaultActiveKey="1" centered onChange={this.handleTab} size="large" >
                    <TabPane tab="Chủ đề" key="1"  >
                        <Table columns={TopicColumns} dataSource={feedback.data} loading={feedback.tableLoading} locale={empFeedbackLocale}/>
                    </TabPane>
                    <TabPane tab="Sự kiện" key="2">
                        <Table columns={EventColumns} dataSource={feedback.data} loading={feedback.tableLoading} locale={empFeedbackLocale}/>
                    </TabPane>
                </Tabs>
            </div>

        );
    }
    handleTab = (key: any) => {
        let intKey = parseInt(key);
        console.log('key', key);

        switch (intKey) {
            case 1:
                this.feedback = this.fetchFeedbackTopic(); // call the background 
                tabName = 'topicName'
                console.log("bbbb", tabName);
                break;
            case 2:
                this.feedback = this.fetchFeedbackEvent(); // call the background              
                tabName = 'eventName'
                console.log("bbbb", tabName);
                break;
        }
    }
    fetchFeedbackTopic() {

        this.props.dispatch({
            type: 'feedback/fetchFeedbackTopic',
            payload: { name: '' },
        })
    }

    fetchFeedbackEvent() {
        this.props.dispatch({
            type: 'feedback/fetchFeedbackEvent',
            payload: { name: '' },
        })
    }

    enableFeedback(id: any) {
        console.log("enableFeedback id", id);
        this.props.dispatch({
            type: 'feedback/enableFeedback',
            payload: id,
        }).then(() => {
            (tabName == "eventName" ? this.fetchFeedbackEvent() : this.fetchFeedbackTopic())
        })

    }
    disableFeedback(id: any) {
        console.log("disableFeedback id", id);
        this.props.dispatch({
            type: 'feedback/disableFeedback',
            payload: id,
        }).then(() => {
            (tabName == "eventName" ? this.fetchFeedbackEvent() : this.fetchFeedbackTopic())
        })
    }
    hideCreateForm() {
        this.props.dispatch({
            type: 'topic/hideCreateForm',
            payload: {}
        })
    }

}

export default connect((state) => ({ ...state }))(ManageFeedbackPage);
