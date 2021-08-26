import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Input, Form, Popconfirm, Typography, InputNumber, Button, Modal, Tag, Divider, Upload, Image, TimePicker, Popover } from 'antd';
import { connect, Dispatch } from 'umi';

import Item from 'antd/lib/list/Item';
import { sendNotification } from '@/utils/utils';
import { InputForm } from './Component/InputForm';
import { CheckCircleOutlined, CloseCircleOutlined, } from '@ant-design/icons';
import moment from 'moment';

import { storage } from '@/firebase/firebase';
import Search from 'antd/lib/input/Search';
import TextArea from 'antd/lib/input/TextArea';
import Paragraph from 'antd/lib/typography/Paragraph';

let TopEvtInfor = ""
let imageUrl = ""
let newDuration: string | undefined;

interface Item {
    key: string;
    name: string;
    description: string;
    nameEng: string;
    descriptionEng: string;
    image: string;
    createDate: string;
    rating: number;
    status: number;
    duration: string;

}
interface ManageExhibitPage {
    dispatch: Dispatch;
    exhibit?: any;
    user?: any
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, type: 'string', min: 3, max: 50 }]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = (props: any) => {
    let newDescriptionEng = "";
    let newDescription = "";


    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record: Item) => record.key === editingKey;

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        newDescriptionEng = '';
        newDescription = '';
        form.setFieldsValue({ name: '', description: '', nameEng: '', descriptionEng: '', image: '', createDate: '', startDate: '', rating: '', status: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };
    let empExhLocale = {
        emptyText: 'Không có hiện vật nào',
    };
    const validateExhNameMess = {
        required: 'Tên hiện vật là bắt buộc!',
        string: { range: 'Tên hiện vật nằm trong khoảng ${min} đến ${max} kí tự ' },
    };
    const validateExhDesMess = {
        required: '${name} là bắt buộc!',
        string: { range: '${name} nằm trong khoảng ${min} đến ${max} kí tự ' },
    };
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...props.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];

                // get data from objec into row by id
                Object.assign(row, { id: item.id });

                if (newDescription != "") {
                    Object.assign(row, { description: newDescription });
                } else {
                    Object.assign(row, { description: item.description });
                }

                if (newDescriptionEng != "") {
                    Object.assign(row, { descriptionEng: newDescriptionEng });
                } else {
                    Object.assign(row, { descriptionEng: item.descriptionEng });
                }
                if (imageUrl != "") {
                    Object.assign(row, { image: imageUrl });
                } else {
                    Object.assign(row, { image: item.image });
                }
                console.log("item.duration", item.duration);
                console.log("newDuration" , newDuration);
                if (newDuration != undefined) {
                    Object.assign(row, { duration: newDuration });
                    console.log("newDuration if" , newDuration);
                } else {
                    Object.assign(row, { duration: item.duration });
                    console.log(" item.duration if",  item.duration);
                }
                setEditingKey('');
                
                
              
                props.onUpdateFinish(row);                   
                imageUrl= "";
                newDuration = undefined;
                updateFileList([]);
            }

        } catch (errInfo) {
            console.log('Xác nhận không thành công:', errInfo);
        }
    };
    const uploadFile = (file: any) => {
        console.log("UPLOAD >>>", file);

        const task = storage
            .ref()
            .child(`${file.uid}`)
            .put(file, { contentType: file.type });

        task.on(
            'state_changed',
            function progress(snapshot: any) { },
            function error() { },
            () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    imageUrl = url
                });
            },
        );
    }
    function checkJpeg(file: any) {
        return (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
            && (file.size / 1024 / 1024 < 2)
    }

    const [fileList, updateFileList] = useState([]);

    const normFile = (e: any) => {
        return e.fileList.filter(checkJpeg);
    };

    const propss = {
        fileList,

        listType: "picture-card",

        onRemove: (file: any) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            console.log("new file list", newFileList);
            updateFileList(newFileList);
            imageUrl= "";
        },
        beforeUpload: (file: any) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJpgOrPng || !isLt2M) {

                if (!isJpgOrPng) { sendNotification('Vui lòng tải lên ảnh !', '', 'error'); }
                if (!isLt2M) sendNotification('Ảnh phải nhỏ hơn 2MB!', '', 'error');

            } else uploadFile(file)
            return false;
        },

        onChange: (info: any) => {
            const temp = info.fileList.filter(checkJpeg);
            updateFileList(temp);
            info.fileList = temp;
        },
    };

    function getDisabledHours() {
        var hours = [];
        for (let i = 1; i < 24; i++) {
            hours.push(i);
        }
        return hours;
    }
    function getDisabledMinutes() {
        var minutes = [0];
        for (let i = 16; i < 60; i++) {
            minutes.push(i);
        }
        return minutes;
    }
    function getDisabledSecond() {
        var second = [];
        for (let i = 1; i < 60; i++) {
            second.push(i);
        }
        return second;
    }
    
    const columns = [
        {
            title: 'Tên hiện vật tiếng Việt',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            align: 'center',
            sorter: (a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name),
            render: (dom: any, entity: any) => {
                return (
                    <a
                        onClick={() => {
                            setShowDetail(true);
                            props.fetchTopicEventOfExhibits(entity.id)
                        }}
                    >
                        {dom}
                    </a>
                );
            },
        },
        {
            title: 'Mô tả tiếng Việt',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            render: (_text: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form validateMessages={validateExhDesMess}>
                        <Form.Item
                            style={{ margin: 0 }}
                            rules={[{ required: true, type: 'string', min: 45, max: 2047 }]}
                        >
                            <TextArea style={{ width: 152 }} rows={4} defaultValue={record.description} onChange={(e) => {
                                newDescription = e.target.value
                            }} />
                        </Form.Item>
                    </Form>
                ) : (

                    <Popover placement={'right'} title="Mô tả chi tiết" content={
                        <Paragraph style={{ padding: 0, maxWidth: 500, height: 'auto' }}>{_text}</Paragraph>
                    } >
                        <Paragraph
                            style={{ width: 200 }}
                            ellipsis={{ rows: 3, expandable: false, symbol: 'more' }}
                        >
                            {_text}
                        </Paragraph>
                    </Popover>
                )
            }
        },
        {
            title: 'Tên hiện vật tiếng Anh',
            dataIndex: 'nameEng',
            key: 'name',
            editable: true,
        },
        {
            title: 'Mô tả tiếng Anh',
            dataIndex: 'descriptionEng',
            key: 'description',
            render: (_text: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form validateMessages={validateExhDesMess}>
                        <Form.Item
                            name='descriptionEng'
                            style={{ margin: 0 }}
                            rules={[{ required: true, type: 'string', min: 45, max: 2047 }]}
                        >
                            <TextArea style={{ width: 152 }} rows={4} defaultValue={record.descriptionEng} onChange={(e) => {
                                newDescriptionEng = e.target.value
                            }} />
                        </Form.Item>
                    </Form>
                ) : (
                    <Popover placement={'right'} title="Mô tả chi tiết" content={
                        <Paragraph style={{ padding: 0, maxWidth: 500, height: 'auto' }}>{_text}</Paragraph>
                    } >
                        <Paragraph
                            style={{ width: 200 }}
                            ellipsis={{ rows: 3, expandable: false, symbol: 'more' }}
                        >
                            {_text}
                        </Paragraph>
                    </Popover>
                )
            }
        },
        {
            title: 'Hình ảnh hiện vật',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (text: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            {...propss}
                            accept="image/*"
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </Form.Item>
                ) :
                    (
                        <div>
                            <Image width={250} height={260} src={record.image} />
                        </div>
                    )
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createDate',
            key: 'createDate',
            align: 'center',
            sorter: (a: { createDate: moment.MomentInput; }, b: { createDate: moment.MomentInput; }) => moment(a.createDate).unix() - moment(b.createDate).unix(),
            defaultSortOrder: 'descend',
            render: (text: any, record: any) => {
                return (
                    <Tag color="cyan">{record.createDate}</Tag>
                )
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: "status",
            align: 'center',
            sorter: (a: { status: string; }, b: { status: any; }) => a.status.localeCompare(b.status),

            render: (_text: any, record: { status: string; }) => {

                if (record.status === 'Sẵn sàng') {
                    return (<Tag icon={<CheckCircleOutlined />} color="green">
                        Sẵn sàng
                    </Tag>)
                }
                else
                    if (record.status === 'Đã được thêm') {
                        return (<Tag icon={<CloseCircleOutlined />} color="volcano">
                            Đã được thêm
                        </Tag>)
                    }

            },
        },

        {
            title: 'Thời gian xem',
            dataIndex: 'duration',
            key: 'duration',
            align: 'center',
            sorter: (a: { startDate: moment.MomentInput; }, b: { startDate: moment.MomentInput; }) => moment(a.startDate).unix() - moment(b.startDate).unix(),
            render: (text: any, record: any) => {
                const editable = isEditing(record);
                // console.log("recour time", moment(record.duration));

                return editable ? (
                    <div>
                        <TimePicker showNow={false} hideDisabledOptions={true} disabledHours={getDisabledHours} disabledSeconds={getDisabledSecond}  disabledMinutes={getDisabledMinutes} style={{ width: "100px" }} defaultValue={moment(record.duration, 'HH:mm:ss')} onChange={value => { newDuration = value?.format('LTS') }
                        } />
                    </div>
                ) : (
                    <div>
                        {record.duration}
                    </div>
                )
            },
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            align: 'center',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a href="javascript:;" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Lưu thay đổi
                        <Divider type="horizontal" />
                        </a>
                        <Popconfirm title="Bạn có chắc muốn huỷ không?" onConfirm={cancel}>
                            <a>Huỷ</a>
                        </Popconfirm>
                    </span>
                ) : (

                    <div>
                        <div>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Chỉnh sửa
                        </Typography.Link>
                        </div>
                        <div>
                            <Popconfirm title="Bạn có chắc muốn xoá hiện vật này?" onConfirm={() => props.onDeleteFinish(record)} style={{ paddingLeft: 8 }}>
                                <a style={{ color: 'red', fontWeight: 'bolder' }}>Xoá</a>
                            </Popconfirm>
                        </div>
                    </div>
                );
            },
        }
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'rating' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),

            }),
        };
    });

    return (
        <Form form={form} component={false} validateMessages={validateExhNameMess}>
            <Table
                loading={props.isLoading}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={props.data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                locale={empExhLocale}
            />
            <Modal
                title='Thông tin hiện vật'
                width={400}
                style={{ textAlign: 'center' }}
                visible={showDetail}
                onCancel={() => {
                    setShowDetail(false);
                }}
                footer={null}
            >
                <p>
                    {TopEvtInfor}
                </p>
            </Modal>
        </Form>
    );
};


class ManageExhibitPage extends React.Component<ManageExhibitPage> {
    constructor(props: any) {
        super(props);
        this.onUpdateFinish = this.onUpdateFinish.bind(this);
        this.onInsertFinish = this.onInsertFinish.bind(this);
        this.hideCreateForm = this.hideCreateForm.bind(this);
        this.onDeleteFinish = this.onDeleteFinish.bind(this);
        this.fetchExhibitByName = this.fetchExhibitByName.bind(this);
        this.fetchTopicEventOfExhibits = this.fetchTopicEventOfExhibits.bind(this);
    }

    // state = {
    //   selectedRowKeys: [], // Check here to configure the default column
    //   loading: false,
    // };



    // start = () => {
    //   this.setState({ loading: true });
    //   // ajax request after empty completing
    //   setTimeout(() => {
    //     this.setState({
    //       selectedRowKeys: [],
    //       loading: false,
    //     });
    //   }, 1000);
    // };

    // onSelectChange = (selectedRowKeys: any) => {
    //   console.log('selectedRowKeys changed: ', selectedRowKeys);
    //   this.setState({ selectedRowKeys });
    // };

    componentDidMount() {
        this.fetchExhibitData()
    }

    render() {

        const { exhibit } = this.props;
        console.log("exhibit", exhibit.message);

        TopEvtInfor = exhibit.message;

        return (
            <>
                <PageHeaderWrapper />
                <div>
                    <Button type="primary" onClick={() => this.props.dispatch({
                        type: 'exhibit/showCreateForm',
                        payload: {}
                    })} style={{ marginTop: 26, marginBottom: 26 }}>
                        Thêm hiện vật
                </Button>

                    <Search placeholder="Tìm kiếm hiện vật theo tên" enterButton allowClear onSearch={this.fetchExhibitByName} style={{ marginLeft: 54, marginTop: 26, marginBottom: 26, width: 430 }} />
                </div>
                <Modal
                    title="Thêm hiện vật"
                    visible={exhibit.createFormVisible}
                    onCancel={this.hideCreateForm}
                    destroyOnClose={true}
                    footer={[
                        <Button key="back" onClick={this.hideCreateForm}>
                            Huỷ
                        </Button>,
                        <Button type="primary" form={'inputExhibitForm'} key="submit" htmlType="submit">Thêm </Button>
                    ]}
                >
                    <InputForm currentUser={this.props.user.currentUser} onFinish={this.onInsertFinish} />
                </Modal>

                <EditableTable
                    data={exhibit.data}
                    listObj={this.props.exhibit.data}
                    onUpdateFinish={this.onUpdateFinish}
                    onDeleteFinish={this.onDeleteFinish}
                    fetchTopicEventOfExhibits={this.fetchTopicEventOfExhibits}
                    isLoading={exhibit.tableLoading} />
            </>
        );
    }
    fetchExhibitData() {
        this.props.dispatch({
            type: 'exhibit/fetchExhibitList',
            payload: { name: '' }
        })
    }
    fetchExhibitByName(name: any) {
        console.log("search value", name);
        this.props.dispatch({
            type: 'exhibit/fetchExhibitByName',
            payload: name,
        })
    }
    fetchTopicEventOfExhibits(id: any) {
        console.log("id object", id);
        this.props.dispatch({
            type: 'exhibit/fetchTopicEventOfExhibits',
            payload: id
        })
    }
    onInsertFinish(value: any) {
        console.log('add obj value', value);

        this.props.dispatch({
            type: 'exhibit/insertExhibit',
            payload: value,
        }).then(() => {
            this.fetchExhibitData()
            this.hideCreateForm()
        })
    }

    onUpdateFinish(value: any) {
        console.log("VAL =", value);

        this.props.dispatch({
            type: 'exhibit/updateExhibit',
            payload: value,
        }).then(() => {
            this.fetchExhibitData()
            this.hideCreateForm()
        })
    }

    onDeleteFinish(value: any) {
        this.props.dispatch({
            type: 'exhibit/deleteExhibit',
            payload: value.id,
        }).then(() => {
            this.fetchExhibitData()
        }).catch(Error)
    }


    hideCreateForm() {
        this.props.dispatch({
            type: 'exhibit/hideCreateForm',
            payload: {}
        })
    }
}

export default connect((state) => ({ ...state }))(ManageExhibitPage);