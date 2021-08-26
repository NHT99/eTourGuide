import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Input, Form, Popconfirm, Typography, InputNumber, Button, Modal, DatePicker, Tag, Divider, Drawer, Rate, Select, Image, Tooltip, Upload, Popover, Affix, Space, Avatar } from 'antd';
import { connect, Dispatch } from 'umi';

import Item from 'antd/lib/list/Item';
import { handleColor, sendNotification } from '@/utils/utils';
import { InputForm } from './component/InputForm';

import moment from 'moment';
import { ExhibitListItem, TableListItem } from '../Topic/data';
import { storage } from '@/firebase/firebase';
import { useForm } from 'antd/lib/form/Form';
import Paragraph from 'antd/lib/typography/Paragraph';
import Search from 'antd/lib/input/Search';
import { DeleteOutlined, StarFilled } from '@ant-design/icons';
import style from './ManagePage.less';
let imageUrl = ""
interface Item {
  key: string;
  name: string;
  description: string;
  nameEng: string;
  descriptionEng: string;
  image: string;
  createDate: string;
  startDate: string;
  rating: number;
  status: string;
}
interface ManagePage {
  dispatch: Dispatch;
  topic?: any;
  exhibit?: any;
  user?: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: Item;
  inputType: 'number' | 'text';
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  inputType,
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
  const [form] = Form.useForm();
  let newDescriptionEng = "";
  let newDescription = "";

  let newDateValue: moment.Moment;
  let newSttValue: any;
  const endOfficeHour = 17;
  const startOfficeHour = 7;
  let isWaiting = false;
  let isActiveStt = false;
  let isClosedStt = false;

  const { TextArea } = Input;
  const { Option } = Select;
  const [formSelect] = useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: Item) => record.key === editingKey ;
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [proDesc, setProDesc] = useState<ExhibitListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [addObjectTopic, setAddObject] = useState<boolean>(false);
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    console.log("edit recorud >>>>>>>>", record);
    newDescriptionEng = '';
    newDescription = '';
    form.setFieldsValue({ name: '', description: '', nameEng: '', descriptionEng: '', image: '', createDate: '', dateString: '', rating: '', status: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const setIsWaiting = (value: any) => {
    if (value == 'Đang chờ kích hoạt') {
      isWaiting = true;
    } else isWaiting = false
    return isWaiting;
  }
  const setIsActiveStt = (value: any) => {
    if (value == 'Đang diễn ra') {
      isActiveStt = true;
    } else isActiveStt = false
    return isActiveStt;
  }
  const setIsClosedStt = (value: any) => {
    if (value == 'Đã đóng') {
      isClosedStt = true;
    } else isClosedStt = false
    return isClosedStt;
  }

  const handleSelectChange = (value: any) => {
    let index = props.listObj.findIndex((item: any) => item.id == value)
    if (index > -1) setProDesc(props.listObj[index])
  }

  let EmpTopiclLocale = {
    emptyText: 'Không có chủ đề nào',
  };
  let EmpExhInTopiclocale = {
    emptyText: 'Chủ đề này không có hiện vật nào',
  };
  const validateTopicNameMess = {
    required: 'Tên chủ đề là bắt buộc!',
    string: { range: 'Tên chủ đề nằm trong khoảng ${min} đến ${max} kí tự ' },
  };
  const validateTopicDesMess = {
    required: '${name} là bắt buộc!',
    string: { range: '${name} nằm trong khoảng ${min} đến ${max} kí tự ' },
  };
  //Disable date to current date
  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...props.data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        Object.assign(row, { id: item.id });
        if (newDescription != "") {
          Object.assign(row, { description: newDescription });
        } else {
          Object.assign(row, { description: item.description });
        }
        console.log("ITEM newDescription >>", newDescriptionEng);
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

        if (newDateValue != undefined) {
          Object.assign(row, { startDate: newDateValue });
        } else {
          Object.assign(row, { startDate: item.startDate });
        }

        if (newSttValue != undefined) {
          Object.assign(row, { status: newSttValue });
        } else {
          Object.assign(row, { status: item.status });
        }


        console.log("roww >>>>>", row);

        setEditingKey('');
        props.onUpdateFinish(row);
      }

    } catch (errInfo) {
      console.log('Xác nhận không thành công !!', errInfo);
    }
  };

  const ExhTopRoomCol = [
    {
      title: 'Hiện vật',
      dataIndex: 'name',
      key: 'name',

      render: (_text: any, record: any) => {
        return (
          <Space direction='horizontal'>
            <Avatar shape={'square'} size={180} src={record.image} style={{ borderRadius: 7 }} />
            <Space direction='vertical'>
              <Space direction='vertical' style={{ width: 500, height: 140 }}>
                <p style={{ marginBottom: 0, fontWeight: 500, fontSize: 18 }}>{record.name}</p>

                <Popover placement={'right'} title="Mô tả chi tiết" content=
                  {<p style={{ width: 500 }}>{record.description}</p>}
                >
                  <Paragraph
                    style={{ width: 500 }}
                    ellipsis={{ rows: 4, expandable: false }}
                  >
                    {record.description}
                  </Paragraph>
                </Popover>
              </Space>
              <div style={{ textAlign: 'right' }}>
                {(currentRow?.status == "Đã đóng") ?
                  <></> :
                  <Popconfirm title="Bạn có chắc muốn xoá hiện vật này?" onConfirm={() => {
                    {
                      (currentRow?.status === 'Đang diễn ra')
                        ?
                        sendNotification('Không thể xoá hiện vật này!', 'Không thể xoá hiện vật trong chủ đề đang diễn ra', 'warning')
                        :
                        props.onDeleteObjectInTopic(record.id, currentRow?.id)
                    }
                  }} style={{ paddingLeft: 8 }}>
                    <Button danger icon={<DeleteOutlined />} size={'middle'}>
                      Xoá hiện vật
                      </Button>
                  </Popconfirm>
                }
              </div>
            </Space>

          </Space>
        );
      },
    },

  ];
  //Upload file image to firebase
  const uploadFile = (file: any) => {
    console.log("UPLOAD >>>", file);

    if (file != undefined) {
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
      updateFileList(newFileList);
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
  const columns = [
    {
      title: 'Tên chủ đề tiếng Việt',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      align: 'center',
      render: (dom: any, entity: any) => {
        return (
          <Tooltip placement="top" title="Xem chi tiết chủ đề" color='green' >
            <a
              onClick={() => {
                setCurrentRow(entity);
                console.log("entity", entity);
                if (entity.status == "Đã đóng") {
                  props.fetchExhibitOnClosedTopic(entity.id)
                } else {
                  props.fetchExhibitTopic(entity.id)
                }
                setShowDetail(true);
              }}
            >
              {dom}
            </a>
          </Tooltip>
        );
      },
      sorter: (a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả tiếng Việt',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (_text: any, record: any) => {
        const editable = isEditing(record);

        return editable ? (
          <Form validateMessages={validateTopicDesMess}>
            <Form.Item name="Mô tả tiếng Việt"
              style={{ margin: 0 }}
              rules={[{ required: true, type: 'string', min: 45, max: 2047 }]}
            >
              <Input.TextArea style={{ width: 198 }} rows={4} defaultValue={record.description} onChange={(e) => {
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
      title: 'Tên chủ đề tiếng Anh',
      dataIndex: 'nameEng',
      key: 'nameEng',
      align: 'center',
      editable: true,
    },
    {
      title: 'Mô tả tiếng Anh',
      dataIndex: 'descriptionEng',
      key: 'descriptionEng',
      render: (_text: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Form validateMessages={validateTopicDesMess}>
            <Form.Item
              name='Mô tả tiếng Anh'
              style={{ margin: 0 }}
              rules={[{ required: true, type: 'string', min: 45, max: 2047 }]}
            >
              <TextArea style={{ width: 199 }} rows={4} defaultValue={record.descriptionEng} onChange={(e) => {
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
      title: 'Hình ảnh chủ đề',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: (text: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (

          <Form.Item style={{ paddingTop: '24px' }}
            getValueFromEvent={normFile}
          >
            <Upload
              {...propss}
              accept="image/*"
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </Form.Item>

        ) : (
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
      render: (_text: any, record: any) => {
        return (
          <Tag color="cyan">{record.createDate}</Tag>
        )
      }
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      valueType: 'date',
      sorter: (a: { startDate: moment.MomentInput; }, b: { startDate: moment.MomentInput; }) => moment(a.startDate).unix() - moment(b.startDate).unix(),
      render: (text: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <DatePicker style={{ width: '135px' }}
            defaultValue={moment.utc(record.startDate)}
            defaultPickerValue={moment.utc(record.startDate)}
            onSelect={(value) => { newDateValue = value }}
            disabledDate={disabledDate}
            showToday={false}
          />
        ) :
          (
            <Tag color="cyan">{record.startDate}</Tag>
          )
      }
    },
    {
      title: 'Xếp hạng',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <Space>
            {record.rating} 
            <div><StarFilled style={{color: 'gold', fontSize: '20px'}} /></div>
          </Space>
        )
      },
      sorter: (a: { rating: number; }, b: { rating: number; }) => a.rating - b.rating,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      sorter: (a: { status: string; }, b: { status: any; }) => a.status.localeCompare(b.status),
      render: (text: any, record: any) => {
        const editable = isEditing(record);
        const isApprove = setIsWaiting(record.status);
        const isActive = setIsActiveStt(record.status);
        const isClosed = setIsClosedStt(record.status);
        return editable ? (
          <Select defaultValue={record.status} onSelect={(value) => newSttValue = value}>
            <Option value="Mới" disabled={record.status == "Đang chờ kích hoạt" || record.status == "Tạm dừng" || record.status == "Đang diễn ra" || record.status == "Đã đóng"} >Mới</Option>
            <Option value="Đang chờ kích hoạt" disabled={record.status == "Mới" || record.status == "Tạm dừng" || record.status == "Đang diễn ra" || record.status == "Đã đóng"}>Đang chờ kích hoạt</Option>
            <Option value="Đang diễn ra" disabled={record.status == "Mới" || record.status == "Đang chờ kích hoạt" || record.status == "Đã đóng"}>Diễn ra</Option>
            <Option value="Tạm dừng" disabled={record.status == "Mới" || record.status == "Đang chờ kích hoạt" || record.status == "Đã đóng"} >Tạm dừng</Option>
            <Option value="Đã đóng" disabled={record.status == "Đang diễn ra"}>Đóng</Option>
          </Select>
        ) :
          (
            <Tag color={handleColor(record.status)}>{record.status}</Tag> || isApprove || isActive || isClosed
          )
      }
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        const date = new Date();

        return editable ? (
          <span>
            <a href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}>
              Lưu thay đổi
              <Divider type="horizontal" />
            </a>
            <Popconfirm title="Bạn có chắc muốn huỷ không?" onConfirm={cancel}>
              <a>Huỷ</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            {isWaiting ?
              <div>
                <Popconfirm title="Bạn có chắc muốn kích hoạt chủ đề này?" onConfirm={() => props.onApproveTopic(record)} style={{ paddingLeft: 8 }}>
                  <a>Kích hoạt</a>
                </Popconfirm>
                <Divider type="horizontal" />
              </div> : null}

            {isActiveStt == false ?
              <div>
                {isClosedStt == false ?
                  <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
                  >
                    Chỉnh sửa
                </Typography.Link>
                  :
                  <Typography.Link disabled={editingKey !== ''} onClick={() => {

                    sendNotification("Chủ đề đã đóng không thể chỉnh sửa !", "", "warning")
                  }}
                  >
                    Chỉnh sửa
                </Typography.Link>
                }
              </div>

              :
              <div>
                {(date.getHours() > endOfficeHour || date.getHours() < startOfficeHour) ?

                  <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
                  >
                    Chỉnh sửa
                  </Typography.Link>

                  :

                  <Typography.Link disabled={editingKey !== ''} onClick={() => {

                    sendNotification("Chủ đề đang diễn ra không thể chỉnh sửa trong khoảng thời gian này!", "Chủ đề chỉ được chỉnh sửa từ 18h đến 6h59' hôm sau", "warning")
                  }}
                  >
                    Chỉnh sửa
                 </Typography.Link>
                }
              </div>

            }

            <div>
              <Popconfirm title="Bạn có chắc muốn xoá chủ đề này?" onConfirm={() => props.onDeleteFinish(record)} style={{ paddingLeft: 8 }}>
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

    <Form form={form} component={false} validateMessages={validateTopicNameMess}>
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
        locale={EmpTopiclLocale}
      />
      <Drawer
        width={800}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
      >
        <>
          <h3 style={{ color: '#008a82', paddingLeft: '37%' }}>{currentRow?.roomNo}</h3>

          {(currentRow?.status === "Đã đóng") ? <></> :
            <Button type="primary" style={{ marginTop: 26, marginBottom: 26 }} onClick={() => {
              (currentRow?.status === "Đang diễn ra") ?
                (
                  sendNotification("Không thể thêm hiện vật!", "Không thể thêm hiện vật vào chủ đề đang diễn ra", "warning")
                ) :
                setAddObject(true)
            }} >
              Thêm hiện vật vào chủ đề
                </Button>}

          <Table  className={style.tableEx} columns={ExhTopRoomCol} locale={EmpExhInTopiclocale} dataSource={props.topic.exhibitInTopic} size={'small'} />
        </>

        <Drawer
          title="Thêm hiện vật vào chủ để"
          width={520}
          visible={addObjectTopic}
          onClose={() => {
            setProDesc(undefined);
            setAddObject(false);
            formSelect.setFieldsValue({ ExhibitId: null });

          }}
          footer={<div
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" form={'inputObjectForm'} key="submit" htmlType="submit">
              Thêm
            </Button>
          </div>}
        >

          <Form id={'inputObjectForm'}
            form={formSelect}
            onFinish={(value) => {
              value.topicId = currentRow?.id;
              props.onInsertObjectFinish(value);
              formSelect.setFieldsValue({ ExhibitId: null });
            }}>
            Id chủ đề: {currentRow?.id}
            <br /> <br />
            <Form.Item name='ExhibitId' label="Tên hiện vật " >
              <Select
                placeholder="Chọn hiện vật muốn thêm"
                style={{ width: 350 }}
                onSelect={(value) => handleSelectChange(value)}
              >
                {props.listObj.map((obj: any) => {
                  return <Option key={obj.id} value={obj.id}>{obj.name}</Option>
                })}
              </Select>

            </Form.Item>
            {proDesc != undefined ? <Form>
              <br />
              <p>Mô tả: {proDesc?.description}</p>
              <br />
              <div>Hình ảnh hiện vật: <br /> <Image width={250} src={proDesc?.image} /></div>
              <br />
            </Form> : <></>}
          </Form>
        </Drawer>
      </Drawer>
    </Form>
  );
};

class ManagePage extends React.Component<ManagePage> {
  constructor(props: any) {
    super(props);
    this.onUpdateFinish = this.onUpdateFinish.bind(this);
    this.onInsertFinish = this.onInsertFinish.bind(this);
    this.hideCreateForm = this.hideCreateForm.bind(this);
    this.onDeleteFinish = this.onDeleteFinish.bind(this);
    this.onApproveTopic = this.onApproveTopic.bind(this);
    this.fetchAvailableObjectList = this.fetchAvailableObjectList.bind(this);
    this.onInsertObjectFinish = this.onInsertObjectFinish.bind(this);
    this.fetchExhibitTopic = this.fetchExhibitTopic.bind(this);
    this.onDeleteObjectInTopic = this.onDeleteObjectInTopic.bind(this);
    this.fetchTopicByName = this.fetchTopicByName.bind(this);
    this.fetchExhibitOnClosedTopic = this.fetchExhibitOnClosedTopic.bind(this);
  }


  componentDidMount() {
    this.fetchTopicData()
    this.fetchAvailableObjectList()

  }

  render() {
    const { topic } = this.props;
    console.log("exhibit in topic list", topic.exhibitInTopic);

    return (
      <div>
        <PageHeaderWrapper />

        <div>
          <Button type="primary" onClick={() => this.props.dispatch({
            type: 'topic/showCreateForm',
            payload: {}
          })}
            style={{ marginTop: 26, marginBottom: 26 }}>
            Thêm chủ đề
          </Button>

          <Search placeholder="Tìm kiếm chủ đề theo tên" enterButton allowClear onSearch={this.fetchTopicByName} style={{ marginLeft: 54, marginTop: 26, marginBottom: 26, width: 430 }} />
        </div>
        <Modal
          title="Thêm chủ đề"
          destroyOnClose={true}
          visible={topic.createFormVisible}
          onCancel={this.hideCreateForm}
          footer={[
            <Button key="back" onClick={this.hideCreateForm}>
              Huỷ
            </Button>,
            <Button type="primary" form={'inputTopicForm'} key="submit" htmlType="submit">Thêm</Button>
          ]}
        >
          <InputForm currentUser={this.props.user.currentUser} onFinish={this.onInsertFinish} />
        </Modal>

        <EditableTable
          {...this.props}
          data={topic.data}
          listObj={this.props.exhibit.data}
          onUpdateFinish={this.onUpdateFinish}
          onDeleteFinish={this.onDeleteFinish}
          onApproveTopic={this.onApproveTopic}
          onDeleteObjectInTopic={this.onDeleteObjectInTopic}
          fetchExhibitTopic={this.fetchExhibitTopic}
          fetchExhibitOnClosedTopic={this.fetchExhibitOnClosedTopic}
          onInsertObjectFinish={this.onInsertObjectFinish}
          isLoading={topic.tableLoading} />
      </div>
    );
  }

  fetchAvailableObjectList() {
    this.props.dispatch({
      type: 'exhibit/fetchAvailableObjectList',
      payload: { name: '' },
    })
  }

  fetchTopicData() {
    this.props.dispatch({
      type: 'topic/fetchData',
      payload: { name: '' },
    })
  }

  fetchExhibitTopic(id: number) {
    const { topic } = this.props;

    this.props.dispatch({
      type: 'topic/fetchExhibitTopic',
      payload: id,
    })
  }
  fetchExhibitOnClosedTopic(id: number) {
    console.log("id closed fetch", id);
    this.props.dispatch({
      type: 'topic/fetchExhibitOnClosedTopic',
      payload: id,
    })
  }
  fetchTopicByName(name: any) {
    console.log("search value", name);
    this.props.dispatch({
      type: 'topic/fetchTopicByName',
      payload: name,
    })
  }
  onUpdateFinish(value: any) {
    this.props.dispatch({
      type: 'topic/updateTopic',
      payload: value,
    }).then(() => {
      this.fetchTopicData()
      this.hideCreateForm()
    })
  }

  onInsertFinish(value: any) {
    console.log("value", value);
    this.props.dispatch({
      type: 'topic/insertTopic',
      payload: value,
    }).then(() => {
      this.hideCreateForm()
      this.fetchTopicData()
    })
  }

  onDeleteFinish(value: any) {
    this.props.dispatch({
      type: 'topic/deleteTopic',
      payload: value.id,
    }).then(() => {
      this.fetchTopicData()
    })
  }
  onDeleteObjectInTopic(value: any, roomId: any) {
    console.log("deleteObjectInTopic ", value);
    console.log("exhibit in topic lisádfasdt", roomId);
    this.props.dispatch({
      type: 'topic/deleteObjectInTopic',
      payload: value,
    }).then(() => {

      this.fetchExhibitTopic(roomId)
      this.fetchTopicData()
      this.fetchAvailableObjectList()
    })
  }
  onApproveTopic(value: any) {
    this.props.dispatch({
      type: 'topic/approveTopic',
      payload: value,
    }).then(() => {
      this.hideCreateForm()
      this.fetchTopicData()
    })
  }

  onInsertObjectFinish(value: any) {
    console.log('value object', value);
    this.props.dispatch({
      type: 'topic/insertObjectToTopic',
      payload: value,
    }).then(() => {

      this.hideCreateForm()
      this.fetchTopicData()
      this.fetchAvailableObjectList()
      this.fetchExhibitTopic(value.topicId)
      this.hideDetailForm()
    })
  }

  hideCreateForm() {
    this.props.dispatch({
      type: 'topic/hideCreateForm',
      payload: {}
    })
  }

  hideDetailForm() {
    this.props.dispatch({
      type: 'topic/hideDetailForm',
      payload: {}
    })
  }
}
export default connect((state) => ({ ...state }))(ManagePage);
