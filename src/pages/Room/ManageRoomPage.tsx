import React from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Modal, Drawer, Form, Image, Select, Space, Popconfirm, Upload, ConfigProvider, Radio } from "antd";



import { storage } from '@/firebase/firebase';


import { sendNotification } from '@/utils/utils';
import { connect, Dispatch } from 'umi';

import { UploadForm } from './Component/UploadForm';
import { SmileOutlined } from '@ant-design/icons';


let tang1 = '1';
let tang2 = '2';

let confirmDelTopicMes = "Bạn có chắc muốn xoá chủ đề ra khỏi phòng ?"
let confirmDelEventMes = "Bạn có chắc muốn xoá sự kiện ra khỏi phòng ?"
const { Option } = Select;

interface ManageRoomPageProps {
  dispatch: Dispatch;
  room?: any;
  event?: any;
  topic?: any;
}
interface ManageRoomPageState {
  addObjectTopic: boolean
  showaddTopic: boolean
  showaddEvent: boolean
  value: string
  uploadImg: string
  value3: string,
  proDesc: {}
}
const renderEmptyRoom = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Không có Phòng nào đang khả dụng</p>
  </div>
);
const renderEmptyTopic = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Không có Chủ đề nào đang khả dụng</p>
  </div>
);
const renderEmptyEvent = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Không có Sự kiện nào đang khả dụng</p>
  </div>
);
class ManageRoomPage extends React.Component<ManageRoomPageProps, ManageRoomPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      addObjectTopic: false,
      showaddTopic: false,
      showaddEvent: false,
      proDesc: {},
      value: '',
      value3: '',
      uploadImg: '',
    };

    this.beforeUpload = this.beforeUpload.bind(this);
    this.hideFormUpload = this.hideFormUpload.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.fetchTopicOrEventInRoom = this.fetchTopicOrEventInRoom.bind(this);
    this.handelForm = this.handelForm.bind(this);
    this.handAddEvent = this.handAddEvent.bind(this);
    this.handAddTopic = this.handAddTopic.bind(this);
    this.fetchEventHasNoRoom = this.fetchEventHasNoRoom.bind(this);
    this.fetchTopicHasNoRoom = this.fetchTopicHasNoRoom.bind(this);
    this.onDeleteEventInRoom = this.onDeleteEventInRoom.bind(this);
    this.onDeleteTopicInRoom = this.onDeleteTopicInRoom.bind(this);
    this.uploadMapInfor = this.uploadMapInfor.bind(this);

  }

  render() {

    const { room } = this.props
    console.log("room", room);
    const options = [
      { label: 'Tất cả phòng', value: '2' },
      { label: 'Phòng đang có chủ để/sự kiện', value: '1' },
      { label: 'Phòng trống', value: '0' },
    ];
    return (
      <div>
        <PageHeaderWrapper />
        <Drawer
          title={room.data.roomId ? `Phòng ${room.data.roomId}` : "Phòng trống"}
          width={450}
          visible={this.state.addObjectTopic}
          onClose={() => this.setState({
            addObjectTopic: false,
            showaddTopic: false,
            showaddEvent: false,
            proDesc: {}
          })}
        >
          <Form name="nest-messages" >
            {this.handelForm}
          </Form>
        </Drawer>
        <Space style={{ marginTop: '7px', height: '50px' }}>

          {/* <Upload
            // className={styles.uploadSection}
            name="avatar"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          > */}

          {/* </Upload> */}

          <Button type="primary"
            style={{ marginTop: 26, marginBottom: 26 }}
            onClick={() => this.props.dispatch({
              type: 'room/showFormUpload',
              payload: {}
            })}
          >
            Tải lên bản đồ
          </Button>

          <Modal title="Thêm bản đồ" visible={room.formUploadVisible}
            onCancel={this.hideFormUpload}
            destroyOnClose={true}
            footer={[
              <Button key="back" onClick={this.hideFormUpload}>
                Huỷ
              </Button>,
              <Button type="primary" form={'uploadFileForm'} key="submit" htmlType="submit" >
                Thêm
              </Button>
            ]}
          >
            <UploadForm onUploadMapInfor={this.uploadMapInfor} />
          </Modal>

          <Select style={{ width: 200, float: 'left' }} onSelect={e => { this.handleChange(e); this.getMapImage(e) }} placeholder="Chọn tầng"  >
            <Option value={tang1} >
              Tầng 1
            </Option>
            <Option value={tang2}>
              Tầng 2
            </Option>
          </Select>

        
          {
            (this.state.value != "") ?
              <Radio.Group
                options={options}
                onChange={this.onChange3}
                value={this.state.value3}
                optionType="button"
              /> : <></>
          }
          {/* {
            (this.state.value == tang2) ?
              <Radio.Group
                options={options}
                onChange={this.onChange3}
                value={this.state.value3}
                optionType="button"
              /> : <></>
          } */}

          {(this.state.value3 != "") ?
            <ConfigProvider renderEmpty={renderEmptyRoom}>
              <Select placeholder="Chọn phòng" style={{ width: 200, float: 'left' }} onSelect={(value) => this.handleInput(value)}>
                {room.roomFloor.map((obj: any) => {
                  return <Option key={obj.no} value={obj.no} >Phòng {obj.no}</Option>
                })}
              </Select>
            </ConfigProvider> : <></>
          }


        </Space>
        <div>
          <Image preview={false} src={room.message} />
        </div>
      </div>
    );
  }
  onChange3 = e => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      value3: e.target.value,
    });
    this.fetchRoomFromFloor(this.state.value, e.target.value) 
  };
  handelForm() {
    const { room } = this.props;
    const { topic } = this.props;
    const { event } = this.props;
    const { Option } = Select;
    console.log("handleEventSelectChange prodes state", this.state.proDesc);
    console.log(" room.data ", room.data);
    console.log(" topic.data ", topic.data);
    console.log(" event.data ", event.data);


    if (room.data.type == 'Topic') {
      return (
        <div>
          <Form.Item label="Chủ đề:"  >
            {room.data.name}
          </Form.Item>
          <Form.Item label="Mô tả: "  >
            {room.data.description}
          </Form.Item>
          <Form.Item label="Hình ảnh: "  >
            <Image width={270} src={room.data.image} />
          </Form.Item>
          <Form.Item label="Xếp hạng:"  >
            {room.data.rating}
          </Form.Item>
          <Form.Item label=" Ngày bắt đầu:"  >
            {room.data.startDate}
          </Form.Item>
          <Form.Item>
            <Popconfirm
              placement="top"
              title={confirmDelTopicMes}
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={() => { this.onDeleteTopicInRoom(room.data.eventOrTopicId), this.setState({ proDesc: {} }) }}>
              <Button type="primary" danger >Xoá chủ đề khỏi phòng</Button>
            </Popconfirm>
          </Form.Item>
        </div>
      );
    } else
      if (room.data.type == 'Event') {
        return (
          <div>
            <Form.Item label="Sự kiện:"  >
              {room.data.name}
            </Form.Item>
            <Form.Item label="Mô tả: "  >
              {room.data.description}
            </Form.Item>
            <Form.Item label="Hình ảnh: "  >
              <Image width={270} src={room.data.image} />
            </Form.Item>
            <Form.Item label="Xếp hạng:"  >
              {room.data.rating}
            </Form.Item>
            <Form.Item label=" Ngày bắt đầu:"  >
              {room.data.startDate}
            </Form.Item>
            <Form.Item>
              <Popconfirm
                placement="top"
                title={confirmDelEventMes}
                okText="Xoá"
                cancelText="Huỷ"
                onConfirm={() => { this.onDeleteEventInRoom(room.data.eventOrTopicId), this.setState({ proDesc: {} }) }}>
                <Button type="primary" danger >Xoá sự kiện khỏi phòng</Button>
              </Popconfirm>
            </Form.Item>
          </div>
        );
      }
      else {

        return (<div>
          <Button type="primary" htmlType="submit" style={{ marginLeft: "149px", marginTop: "52px" }} onClick={() => this.handAddTopic()} >Thêm chủ đề </Button>
          <br /><br />
          <Button type="primary" htmlType="submit" style={{ marginLeft: "149px", marginTop: "52px" }} onClick={() => this.handAddEvent()}> Thêm sự kiện</Button>

          {/* Slide drawer them su kien vao phong */}
          <Drawer
            title={`Thêm sự kiện vào phòng`}
            visible={this.state.showaddEvent}
            width={450}
            destroyOnClose={true}
            onClose={() => {
              this.setState({
                showaddEvent: false,
                proDesc: {}
              })
            }}
            footer={<div
              style={{
                textAlign: 'right',
              }}
            >
              <Button style={{ marginRight: 8 }}>
                Huỷ
                </Button>
              <Button type="primary" form={'addEventForm'} key="submit" htmlType="submit">
                Thêm
                </Button>
            </div>}
          >
            <ConfigProvider renderEmpty={renderEmptyEvent}>
              <Form
                onFinish={(value) => {
                  value.roomId = room.data.roomId;
                  console.log("value.roomId", value.roomId);
                  this.insertEventToRoom(value);
                }}
                id={'addEventForm'}>
                Id phòng: {room.data.roomId}
                <br /> <br />
                <Form.Item name='eventId' label="Tên sự kiện ">

                  <Select
                    placeholder="Chọn sự kiện"
                    style={{ width: 298 }}
                    onSelect={(value) => this.handleEventSelectChange(value)}

                  >
                    {event.data.map((obj: any) => {
                      return <Option key={obj.id} value={obj.id} >{obj.name}</Option>
                    })}
                  </Select>

                </Form.Item>
                {this.state.proDesc.id != undefined ?
                  <div>
                    <br />
                    <p>Mô tả: {this.state.proDesc.description}</p>
                    <br />
                    <div>Hình ảnh sự kiện: <br /> <img src={this.state.proDesc.image} width={250} /></div>
                    <br />
                    <p>Xếp hạng: {this.state.proDesc.rating}</p>
                  </div>
                  :
                  <></>
                }
              </Form>
            </ConfigProvider>
          </Drawer>

          {/* Slide drawer them Chu de vao phong */}
          <Drawer
            title={`Thêm chủ đề vào phòng`}
            visible={this.state.showaddTopic}
            destroyOnClose={true}
            width={450}
            onClose={() => this.setState({
              showaddTopic: false,
              proDesc: {},
            })}
            footer={<div
              style={{
                textAlign: 'right',
              }}
            >
              <Button style={{ marginRight: 8 }}>
                Huỷ
                </Button>
              <Button type="primary" form={'addTopicForm'} key="submit" htmlType="submit">
                Thêm
                </Button>

            </div>}
          >
            <ConfigProvider renderEmpty={renderEmptyTopic}>
              <Form onFinish={(value) => {
                value.roomId = room.data.roomId;
                this.insertTopicToRoom(value)
                console.log("value ", value);

              }
              } id={'addTopicForm'}>
                Id phòng: {room.data.roomId}
                <br /> <br />
                <Form.Item name='topicId' label="Chủ đề">

                  <Select
                    placeholder="Chọn chủ đề"
                    style={{ width: 298 }}
                    onSelect={(value) => this.handleTopicSelectChange(value)}
                  >
                    {topic.data.map((topic: any) => {
                      return <Option key={topic.id} value={topic.id} >{topic.name}</Option>
                    })}
                  </Select>

                </Form.Item>
                {this.state.proDesc.id != undefined ?
                  <div>
                    <br />
                    <p>Mô tả: {this.state.proDesc.description}</p>
                    <br />
                    <div>Hình ảnh hiện vật: <br /> <img src={this.state.proDesc.image} width={250} /></div>
                    <br />
                    <p>Xếp hạng: {this.state.proDesc.rating}</p>
                  </div>
                  :
                  <></>
                }
              </Form>
            </ConfigProvider>
          </Drawer>
        </div>
        )
      }
  }
  handleInput = (id: any) => {
    this.setState({
      addObjectTopic: true
    })
    console.log("runn >>>>", id);

    this.fetchTopicOrEventInRoom(id);
  }

  handAddTopic = () => {
    this.setState({
      showaddTopic: true
    })
    this.fetchTopicHasNoRoom()
  }

  handAddEvent = () => {
    this.setState({
      showaddEvent: true
    })
    console.log("handAddEventaddTopic", this.state.showaddEvent);
    this.fetchEventHasNoRoom()
  }

  fetchTopicOrEventInRoom(id: number) {
    console.log("zdfasdfasdfasdfas", id);
    this.props.dispatch({
      type: 'room/fetchTopicOrEventInRoom',
      payload: id,
    })
  }
  fetchTopicHasNoRoom() {
    this.props.dispatch({
      type: 'topic/fetchTopicHasNoRoom',
      payload: { name: '' },
    })
  }
  fetchEventHasNoRoom() {
    this.props.dispatch({
      type: 'event/fetchEventHasNoRoom',
      payload: { name: '' },
    })
  }
  fetchRoomFromFloor(id: any, e: any) {
    console.log(" floor id:", id);
    console.log(" status:", e);
    this.props.dispatch({
      type: 'room/fetchRoomFromFloor',
      payload:{floorNo : id, status: e}  
    })
  }
  insertEventToRoom(value: any) {
    console.log("insertEventToRoom", value);
    const { room } = this.props;
    this.props.dispatch({
      type: 'room/insertEventToRoom',
      payload: value,
    }).then(() => {

      this.fetchTopicOrEventInRoom(room.data.roomId)
    })
  }
  insertTopicToRoom(value: any) {
    console.log("insertTopicToRoom", value);
    const { room } = this.props;
    this.props.dispatch({
      type: 'room/insertTopicToRoom',
      payload: value,
    }).then(() => {

      this.fetchTopicOrEventInRoom(room.data.roomId)
    })
  }
   uploadMapInfor(value: any) {
    this.props.dispatch({
      type: 'room/uploadMapInfor',
      payload: value
    })
  }
  onDeleteEventInRoom(value: any) {
    console.log("onDeleteEventInRoom ", value);
    const { room } = this.props;
    this.props.dispatch({
      type: 'room/deleteEventInRoom',
      payload: value,
    }).then(() => {
      this.setState({
        showaddEvent: false
      })
      this.fetchTopicOrEventInRoom(room.data.roomId)
    })
  }
  onDeleteTopicInRoom(value: any) {
    console.log("onDeleteTopicInRoom ", value);
    const { room } = this.props;
    this.props.dispatch({
      type: 'room/deleteTopicInRoom',
      payload: value,
    }).then(() => {
      this.setState({
        showaddTopic: false
      })
      this.fetchTopicOrEventInRoom(room.data.roomId)
    })
  }
  handleEventSelectChange = (value: any) => {
    console.log("handleEventSelectChange prodes state", this.state.proDesc);

    const { event } = this.props;
    let index = event.data.findIndex((item: any) => item.id == value)
    if (index > -1) this.setState({ proDesc: event.data[index] })
  }
  handleTopicSelectChange = (value: any) => {
    console.log("topic handleTopicSelectChange state", this.state.proDesc);
    const { topic } = this.props;
    let index = topic.data.findIndex((item: any) => item.id == value)
    if (index > -1) this.setState({ proDesc: topic.data[index] })
  }
  beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      sendNotification('Vui lòng tải lên ảnh !', '', 'error');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      sendNotification('Ảnh phải nhỏ hơn 2MB!', '', 'error');
    } else {
      this.uploadFile(file)
      sendNotification('Hình đã được tải lên thành công !!', 'Vui lòng liên hệ với người có thẩm quyền để được duyệt hình này', 'success')
    }
    return false
  }

  handleChange = (e: any) => {
    console.log("event   ", e);
    this.setState({ value: e });
  };
  getMapImage(floorid: any) {
    console.log("floor id", floorid);
    this.props.dispatch({
      type: 'room/getMapImage',
      payload: floorid
    })
  }
  uploadFile(file: any) {
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
          this.setState({ uploadImg: url })
          console.log("url", this.state.uploadImg)

          this.handleChange
        });
      },
    );
  }
  hideFormUpload() {
    this.props.dispatch({
      type: 'room/hideFormUpload',
      payload: {}
    })
  }
}
export default connect((state) => ({ ...state }))(ManageRoomPage);

