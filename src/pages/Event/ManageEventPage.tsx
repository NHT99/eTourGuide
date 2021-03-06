import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Input, Form, Popconfirm, Typography, InputNumber, Button, Modal, Tag, Rate, Drawer, Select, Divider, Tooltip, Upload, DatePicker, Image, Popover, Space, Avatar } from 'antd';
import { connect, Dispatch } from 'umi';

import Item from 'antd/lib/list/Item';
import { handleColor, sendNotification } from '@/utils/utils';
import { InputForm } from './Component/InputForm';

import moment from 'moment';
import { ExhibitListItem, TableListItem } from './data';
import { storage } from '@/firebase/firebase';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Search from 'antd/lib/input/Search';
import { DeleteOutlined, StarFilled, StarOutlined } from '@ant-design/icons';

import style from './ManageEventPage.less' ;

let imageUrl = "";
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
  startDate: string;
  endDate: string;
}
interface ManageEventPage {
  dispatch: Dispatch;
  event?: any;
  exhibit?: any;
  user?: any;
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
  let isWaiting = false;
  let isActiveStt = false;
  let isClosedStt = false;

  let newDescriptionEng = "";
  let newDescription = "";

  let newCreateDateValue: moment.Moment;
  let oldCreateDateValue: moment.Moment;
  let newEndDateValue: moment.Moment;
  let sttValue: any;
  const endOfficeHour = 17;
  const startOfficeHour = 7;


  const { Paragraph } = Typography;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: Item) => record.key === editingKey;
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [proDesc, setProDesc] = useState<ExhibitListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [addObjectEvent, setAddObject] = useState<boolean>(false);
  const { Option } = Select;
  const [formSelect] = useForm();
  
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    newDescriptionEng = '';
    newDescription = '';
    form.setFieldsValue({ name: '', description: '', nameEng: '', descriptionEng: '', image: '', createDate: '', startDate: '', rating: '', status: '', ...record });
    setEditingKey(record.key);
  };

  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }
  function disableEndDateEvent(current: any) {
    if (newCreateDateValue == undefined)
      return current && current.valueOf() < oldCreateDateValue.valueOf();
    else
      return current && current.valueOf() < newCreateDateValue.valueOf();
  }
  const cancel = () => {
    setEditingKey('');
  };
  const setIsWaiting = (value: any) => {
    if (value == '??ang ch??? k??ch ho???t') {
      isWaiting = true;
    } else isWaiting = false
    return isWaiting;
  }
  const setIsActiveStt = (value: any) => {
    if (value == '??ang di???n ra') {
      isActiveStt = true;
    } else isActiveStt = false
    return isActiveStt;
  }
  const setIsClosedStt = (value: any) => {
    if (value == '???? ????ng') {
      isClosedStt = true;
    } else isClosedStt = false
    return isClosedStt;
  }
  const handleSelectChange = (value: any) => {
    let index = props.listObj.findIndex((item: any) => item.id == value)
    if (index > -1) setProDesc(props.listObj[index])
  }

  let EmpEvtlLocale = {
    emptyText: 'Kh??ng c?? s??? ki???n n??o',
  };
  let EmpExhInEvtlocale = {
    emptyText: 'S??? ki???n n??y kh??ng c?? hi???n v???t n??o',
  };
  const validateEventNameMess = {
    required: 'T??n s??? ki???n l?? b???t bu???c!',
    string: { range: 'T??n s??? ki???n n???m trong kho???ng ${min} ?????n ${max} k?? t??? ' },
  };
  const validateEventDesMess = {
    required: '${name} l?? b???t bu???c!',
    string: { range: '${name} n???m trong kho???ng ${min} ?????n ${max} k?? t??? ' },
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
        console.log(imageUrl);
        if (imageUrl != "") {
          Object.assign(row, { image: imageUrl });
          console.log(imageUrl);
          
          console.log("1");
          
        } else {
          Object.assign(row, { image: item.image });
          console.log(imageUrl);
          console.log("2");
        }

        if (newCreateDateValue != undefined) {
          Object.assign(row, { startDate: newCreateDateValue });
        } else {
          Object.assign(row, { startDate: item.startDate });
        }

        if (newEndDateValue != undefined) {
          Object.assign(row, { endDate: newEndDateValue });
        } else {
          Object.assign(row, { endDate: item.endDate });
        }

        if (sttValue != undefined) {
          Object.assign(row, { status: sttValue });
        } else {
          Object.assign(row, { status: item.status });
        }

        setEditingKey('');
        props.onUpdateFinish(row);
      }

    } catch (errInfo) {
      console.log('X??c nh???n kh??ng th??nh c??ng:', errInfo);
    }
  };
  const ExhEvtRoomCol = [
    {
      title: 'Hi???n v???t',
      dataIndex: 'name',
      key: 'name',
      render: (_text: any, record: any) => {
        return (
          <Space direction='horizontal'>
            <Avatar shape={'square'} size={180} src={record.image} style={{ borderRadius: 7 }} />
            <Space direction='vertical'>
              <Space direction='vertical' style={{ width: 500, height: 140 }}>
                <p style={{ marginBottom: 0, fontWeight: 500, fontSize: 18 }}>{record.name}</p>

                <Popover placement={'right'} title="M?? t??? chi ti???t" content=
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
                {(currentRow?.status == "???? ????ng") ?
                  <></> :
                  <Popconfirm title="B???n c?? ch???c mu???n xo?? hi???n v???t n??y?" onConfirm={() => {
                    {
                      (currentRow?.status === '??ang di???n ra')
                        ?
                        sendNotification('Kh??ng th??? xo?? hi???n v???t n??y!', 'Kh??ng th??? xo?? hi???n v???t trong ch??? ????? ??ang di???n ra', 'warning')
                        :
                        props.onDeleteObjectInEvent(record.id, currentRow?.id)
                    }
                  }} style={{ paddingLeft: 8 }}>
                    <Button danger icon={<DeleteOutlined />} size={'middle'}>
                      Xo?? hi???n v???t
                      </Button>
                  </Popconfirm>
                }
              </div>
            </Space>

          </Space>
        );
      },
    },
    // {
    //   title: 'M?? t???',
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    // {
    //   title: 'H??nh ???nh',
    //   dataIndex: 'image',
    //   key: 'image',
    //   render: (_text: any, record: { image: string | undefined; }) => {
    //     return (
    //       <div>
    //         <Image width={250} height={260} src={record.image} />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: 'X???p h???ng',
    //   key: 'rating',
    //   dataIndex: 'rating',
    // },
    // {
    //   title: 'H??nh ?????ng',
    //   dataIndex: '',
    //   key: 'x',
    //   align: 'center',
    //   render: (text: any, record: any) => (
    //     <span>
    //       {(currentRow?.status == "???? ????ng") ?
    //         <></> :
    //         <Popconfirm
    //           title="B???n c?? ch???c mu???n xo?? hi???n v???t n??y?"
    //           onConfirm={() => {
    //             {
    //               (currentRow?.status === "??ang di???n ra") ?
    //                 (
    //                   sendNotification("Kh??ng th??? xo?? hi???n v???t !!", "Kh??ng th??? xo?? hi???n v???t trong s??? ki???n ??ang di???n ra", "warning")
    //                 ) :
    //                 props.onDeleteObjectInEvent(record.id, currentRow?.id)
    //             }
    //           }}
    //           style={{ paddingLeft: 8 }}>
    //           <a>Xo?? hi???n v???t</a>
    //         </Popconfirm>
    //       }
    //     </span>
    //   ),
    // }
  ];
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
          console.log(imageUrl);
          
        });
      },
    );
  }
  function checkJpeg(file: any) {
    return (file.type === 'image/jpeg' || file.type === 'image/png' )
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
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' ;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpgOrPng || !isLt2M) {

        if (!isJpgOrPng) { sendNotification('Vui l??ng t???i l??n ???nh !', '', 'error'); }
        if (!isLt2M) sendNotification('???nh ph???i nh??? h??n 2MB!', '', 'error');

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
      title: 'T??n s??? ki???n',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      align: 'center',
      render: (dom: any, entity: any) => {
        return (
          <Tooltip placement="top" title="Xem chi ti???t s??? ki???n" color='green' >
            <a
              onClick={() => {
                setCurrentRow(entity);
                if (entity.status == "???? ????ng") {
                  props.fetchExhibitOnClosedEvent(entity.id)
                }
                else {
                  props.fetchExhibitEvent(entity.id)
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
      title: 'M?? t??? ti???ng Vi???t',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (_text: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Form validateMessages={validateEventDesMess}>
            <Form.Item
              name="M?? t??? ti???ng Vi???t"
              style={{ margin: 0 }}
              rules={[{ required: true, type: 'string', min: 45, max: 2047 }]}
            >
              <TextArea style={{ width: 152 }} rows={4} defaultValue={record.description} onChange={(e) => {
                newDescription = e.target.value
              }} />
            </Form.Item>
          </Form>
        ) : (
          <Popover placement={'right'} title="M?? t??? chi ti???t" content={
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
      title: 'T??n ch??? ????? (Ti???ng Anh)',
      dataIndex: 'nameEng',
      key: 'name',
      align: 'center',
      editable: true,
    },
    {
      title: 'M?? t??? ti???ng Anh',
      dataIndex: 'descriptionEng',
      key: 'descriptionEng',
      align: 'center',
      render: (_text: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Form validateMessages={validateEventDesMess}>
            <Form.Item
              name='M?? t??? ti???ng Anh'
              style={{ margin: 0 }}
              rules={[{ required: true, type: 'string', min: 45, max: 2047 }]}
            >
              <TextArea style={{ width: 152 }} rows={4} defaultValue={record.descriptionEng} onChange={(e) => {
                newDescriptionEng = e.target.value
              }} />
            </Form.Item>
          </Form>
        ) : (
          <Popover placement={'right'} title="M?? t??? chi ti???t" content={
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
      title: 'H??nh ???nh s??? ki???n',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: (_text: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            style={{ paddingTop: '24px' }}
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
            <div>
              <Image width={250} height={260} src={record.image} />
            </div>
          </div>
        )
      }
    },
    {
      title: 'Ng??y t???o',
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
      title: 'Ng??y b???t ?????u',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      sorter: (a: { startDate: moment.MomentInput; }, b: { startDate: moment.MomentInput; }) => moment(a.startDate).unix() - moment(b.startDate).unix(),
      render: (text: any, record: any) => {
        const editable = isEditing(record);
        oldCreateDateValue = moment.utc(record.startDate);
        // console.log("old ", oldCreateDateValue);
        return editable ? (
          <DatePicker
            style={{ width: '135px' }}
            defaultValue={moment.utc(record.startDate)}
            defaultPickerValue={moment.utc(record.startDate)}
            onSelect={(value) => {
              newCreateDateValue = value, console.log(" new", newCreateDateValue);
            }}
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
      title: 'Ng??y k???t th??c',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      sorter: (a: { endDate: moment.MomentInput; }, b: { endDate: moment.MomentInput; }) => moment(a.endDate).unix() - moment(b.endDate).unix(),
      render: (text: any, record: any) => {
        const editable = isEditing(record);
        const date = new Date()
        var isExprired = moment.utc(record.endDate) > moment.utc(date);
        return editable ? (
          <DatePicker
            style={{ width: '135px' }}
            defaultValue={moment.utc(record.endDate)}
            defaultPickerValue={moment.utc(record.endDate)}
            onSelect={(value) => { newEndDateValue = value }}
            disabledDate={disableEndDateEvent}
            showToday={false}
          />

        ) :
          (
            isExprired ?
              <Tag color="green">{record.endDate}</Tag>
              :
              <Tag color="volcano">{record.endDate}</Tag>
          )
      }
    },
    {
      title: 'X???p h???ng',
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
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a: { status: string; }, b: { status: any; }) => a.status.localeCompare(b.status),
      render: (_text: any, record: any) => {
        const isApprove = setIsWaiting(record.status);
        const editable = isEditing(record);
        const isActive = setIsActiveStt(record.status);
        const isClosed = setIsClosedStt(record.status);
        return editable ? (
          <Select defaultValue={record.status} onSelect={(value) => sttValue = value}>
            <Option value="M???i" disabled={record.status == "??ang ch??? k??ch ho???t" || record.status == "T???m d???ng" || record.status == "??ang di???n ra" || record.status == "???? ????ng"} >M???i</Option>
            <Option value="??ang ch??? k??ch ho???t" disabled={record.status == "M???i" || record.status == "T???m d???ng" || record.status == "??ang di???n ra" || record.status == "???? ????ng"}>??ang ch??? k??ch ho???t</Option>
            <Option value="??ang di???n ra" disabled={record.status == "M???i" || record.status == "??ang ch??? k??ch ho???t" || record.status == "???? ????ng"}>Di???n ra</Option>
            <Option value="T???m d???ng" disabled={record.status == "M???i" || record.status == "??ang ch??? k??ch ho???t" || record.status == "???? ????ng"} >T???m d???ng</Option>
            <Option value="???? ????ng" disabled={record.status == "??ang di???n ra"}>????ng</Option>
          </Select>
        ) :
          (
            <Tag color={handleColor(record.status)}>{record.status}</Tag> || isApprove || isActive || isClosed
          )
      },
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        const date = new Date();

        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}>
              L??u thay ?????i
              <Divider type="horizontal" />
            </a>
            <Popconfirm title="B???n c?? ch???c mu???n hu??? kh??ng?" onConfirm={cancel}>
              <a>Hu???</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            {isWaiting ?
              <div>
                <Popconfirm title="B???n c?? ch???c mu???n k??ch ho???t s??? ki???n n??y?" onConfirm={() => props.onApproveEvent(record)} style={{ paddingLeft: 8 }}>
                  <a>K??ch ho???t</a>
                </Popconfirm>
                <Divider type="horizontal" />
              </div> : null}

            {isActiveStt == false ?

              <div>
                {isClosedStt == false ?
                  <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
                  >
                    Ch???nh s???a
                  </Typography.Link>
                  :
                  <Typography.Link disabled={editingKey !== ''} onClick={() => {

                    sendNotification("S??? ki???n ???? ????ng kh??ng th??? ch???nh s???a !", "", "warning")
                  }}
                  >
                    Ch???nh s???a
                  </Typography.Link>
                }
              </div>
              :
              <div>
                {(date.getHours() > endOfficeHour || date.getHours() < startOfficeHour) ?
                  <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
                  >
                    Ch???nh s???a
                </Typography.Link>

                  :
                  <Typography.Link disabled={editingKey !== ''} onClick={() => {

                    sendNotification("Kh??ng th??? ch???nh s???a ch??? ????? v??o kho???ng th???i gian n??y!!", "Ch??? ????? ch??? ???????c ch???nh s???a t??? 18h ?????n 6h h??m sau", "warning")
                  }}
                  >
                    Ch???nh s???a
                 </Typography.Link>

                }
              </div>
            }
            <div>
              <Popconfirm title="B???n c?? ch???c mu???n xo?? s??? ki???n n??y?" onConfirm={() => props.onDeleteFinish(record)} style={{ paddingLeft: 8 }}>
                <a style={{ color: 'red', fontWeight: 'bolder' }} >Xo??</a>
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
    <Form form={form} component={false} validateMessages={validateEventNameMess}>
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
        locale={EmpEvtlLocale}
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
          <h3 style={{ color: '#008a82', paddingLeft: '35%' }}>{currentRow?.roomNo}</h3>

          {(currentRow?.status === "???? ????ng") ? <></> :
            <Button type="primary" style={{ marginTop: 26, marginBottom: 26 }} onClick={() => {
              (currentRow?.status === "??ang di???n ra") ?
                (
                  sendNotification("Kh??ng th??? th??m hi???n v???t !!", "Kh??ng th??? th??m hi???n v???t v??o s??? ki???n ??ang di???n ra", "warning")
                ) :
                setAddObject(true)
            }}>
              Th??m hi???n v???t v??o s??? ki???n
                </Button>}
          <Table className={style.tableEx} columns={ExhEvtRoomCol} locale={EmpExhInEvtlocale} dataSource={props.event.exhibitInEvent}  size={'small'} />
        </>

        <Drawer
          title="Th??m hi???n v???t v??o s??? ki???n"
          width={420}
          visible={addObjectEvent}
          onClose={() => {
            setProDesc(undefined);
            setAddObject(false)
            formSelect.setFieldsValue({ ExhibitId: null });
          }}
          footer={<div
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" form={'inputObjectForm'} key="submit" htmlType="submit">
              Th??m
            </Button>
          </div>}
        >

          <Form id={'inputObjectForm'}
            form={formSelect}
            onFinish={(value) => {
              value.eventId = currentRow?.id;
              props.onInsertObjectFinish(value);
            }}
          >
            Id ch??? ?????: {currentRow?.id}
            <br /> <br />
            <Form.Item name='ExhibitId' label="T??n hi???n v???t ">
              <Select
                placeholder="Ch???n hi???n v???t mu???n th??m"
                style={{ width: 350 }}
                onSelect={(value) => handleSelectChange(value)}
              >
                {props.listObj.map((obj: any) => {
                  return <Option key={obj.id} value={obj.id}>{obj.name}</Option>
                })}
              </Select>
            </Form.Item>
            {proDesc != undefined ?
              <Form>
                <br />
                <p>M?? t???: {proDesc?.description}</p>
                <br />
                <div>H??nh ???nh hi???n v???t: <br />
                  <div><Image width={250} src={proDesc?.image} /></div>
                </div>
                <br />
              </Form>
              : <></>
            }
          </Form>
        </Drawer>
      </Drawer>
    </Form>
  );
};


class ManageEventPage extends React.Component<ManageEventPage> {
  constructor(props: any) {
    super(props);
    this.onUpdateFinish = this.onUpdateFinish.bind(this);
    this.onInsertFinish = this.onInsertFinish.bind(this);
    this.hideCreateForm = this.hideCreateForm.bind(this);
    this.onDeleteFinish = this.onDeleteFinish.bind(this);
    this.onApproveEvent = this.onApproveEvent.bind(this);
    this.fetchAvailableObjectList = this.fetchAvailableObjectList.bind(this);
    this.onInsertObjectFinish = this.onInsertObjectFinish.bind(this);
    this.fetchExhibitEvent = this.fetchExhibitEvent.bind(this);
    this.onDeleteObjectInEvent = this.onDeleteObjectInEvent.bind(this);
    this.fetchEventByName = this.fetchEventByName.bind(this);
    this.fetchExhibitOnClosedEvent = this.fetchExhibitOnClosedEvent.bind(this);
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
    this.fetchEventData()
    this.fetchAvailableObjectList()
  }

  render() {
    const { event } = this.props;
    console.log("page PROPS event = ", event.exhibitInEvent);

    return (
      <>
        <PageHeaderWrapper />

        <Button type="primary" onClick={() => this.props.dispatch({
          type: 'event/showCreateForm',
          payload: {}
        })} style={{ marginTop: 26, marginBottom: 26 }}>
          Th??m s??? ki???n
                </Button>

        <Search placeholder="T??m ki???m s??? ki???n theo t??n" enterButton allowClear onSearch={this.fetchEventByName} style={{ marginLeft: 54, marginTop: 26, marginBottom: 26, width: 430 }} />
        <Modal
          title="Th??m s??? ki???n"
          destroyOnClose={true}
          visible={event.createFormVisible}
          onCancel={this.hideCreateForm}
          footer={[
            <Button key="back" onClick={this.hideCreateForm}>
              Cancel
                        </Button>,
            <Button type="primary" form={'inputEventForm'} key="submit" htmlType="submit">Th??m </Button>
          ]}
        >
          <InputForm currentUser={this.props.user.currentUser} onFinish={this.onInsertFinish} />
        </Modal>

        <EditableTable
          {...this.props}
          data={event.data}
          listObj={this.props.exhibit.data}
          onUpdateFinish={this.onUpdateFinish}
          onDeleteFinish={this.onDeleteFinish}
          onApproveEvent={this.onApproveEvent}
          onDeleteObjectInEvent={this.onDeleteObjectInEvent}
          fetchExhibitEvent={this.fetchExhibitEvent}
          fetchExhibitOnClosedEvent={this.fetchExhibitOnClosedEvent}
          onInsertObjectFinish={this.onInsertObjectFinish}
          isLoading={event.tableLoading} />
      </>
    );
  }
  fetchAvailableObjectList() {
    this.props.dispatch({
      type: 'exhibit/fetchAvailableObjectList',
      payload: { name: '' },
    })
  }
  fetchEventData() {
    this.props.dispatch({
      type: 'event/fetchData',
      payload: { name: '' }
    })
  }

  fetchExhibitEvent(id: number) {
    console.log("id fetch", id);
    this.props.dispatch({
      type: 'event/fetchExhibitEvent',
      payload: id,
    })
  }
  fetchEventByName(name: any) {
    console.log("search value", name);
    this.props.dispatch({
      type: 'event/fetchEventByName',
      payload: name,
    })
  }
  fetchExhibitOnClosedEvent(id: number) {
    this.props.dispatch({
      type: 'event/fetchExhibitOnClosedEvent',
      payload: id,
    })
  }
  onUpdateFinish(value: any) {
    console.log("VAL =", value);

    this.props.dispatch({
      type: 'event/updateEvent',
      payload: value,
    }).then(() => {

      this.fetchEventData()
      this.hideCreateForm()
    })
  }

  onInsertFinish(value: any) {
    console.log('event page value insert', value);


    this.props.dispatch({
      type: 'event/insertEvent',
      payload: value,
    }).then(() => {

      this.fetchEventData()
      this.hideCreateForm()
    })

  }
  onDeleteFinish(value: any) {
    this.props.dispatch({
      type: 'event/deleteEvent',
      payload: value.id,
    }).then(() => {

      this.fetchEventData()
    }).catch(Error)
  }
  onDeleteObjectInEvent(value: any, roomId: any) {
    console.log("onDeleteObjectInEvent ", value);
    console.log("exhibit in topic lis??dfasdt", roomId);
    this.props.dispatch({
      type: 'event/deleteObjectInEvent',
      payload: value,
    }).then(() => {

      this.fetchExhibitEvent(roomId)
      this.fetchEventData()
      this.fetchAvailableObjectList()
    })
  }
  onApproveEvent(value: any) {
    this.props.dispatch({
      type: 'event/approveEvent',
      payload: value,
    }).then(() => {

      this.hideCreateForm()
      this.fetchEventData()
    })
  }
  onInsertObjectFinish(value: any) {
    console.log('value ob??dfasdfject', value);
    this.props.dispatch({
      type: 'event/insertObjectToEvent',
      payload: value,
    }).then(() => {
      this.hideCreateForm()
      this.fetchEventData()
      this.fetchAvailableObjectList()
      this.fetchExhibitEvent(value.eventId)
    })
  }
  hideCreateForm() {
    this.props.dispatch({
      type: 'event/hideCreateForm',
      payload: {}
    })
  }
}

export default connect((state) => ({ ...state }))(ManageEventPage);