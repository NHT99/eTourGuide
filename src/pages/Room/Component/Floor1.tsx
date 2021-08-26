

import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Image, Popconfirm, Select, Tooltip, } from 'antd';


import React from 'react';
import { connect, Dispatch } from 'umi';


let l08 = '8%';
let l145 = '14.5%';
let l125 = '12.5%';
let l204 = '20.4%';
let l252 = '25.2%';
let l298 = '29.8%';
let l35 = '35%';
let l40 = '40%';
let l60 = '60%';
let l678 = '67.8%';
let l775 = '77.5%';
let l837 = '83.7%';
let l843 = '84.3%';
let l87 = '87%';
let l904 = '90.4%'

let t22 = '22%'
let t275 = '27.5%';
let t29 = '29%';
let t335 = '33.5%';
let t38 = '38%';
let t53 = '53%';
let t60 = '60%';
let t67 = '67%';
let t57 = '57%';
let t535 = '53.5%';
let t54 = '54%';
let t605 = '60.5%';
let t61 = '61%';
let t675 = '67.5%';
let confirmDelTopicMes = "Bạn có chắc muốn xoá chủ đề ra khỏi phòng ?"
let confirmDelEventMes = "Bạn có chắc muốn xoá sự kiện ra khỏi phòng ?"

interface Floor1Props {
  dispatch: Dispatch;
  room?: any;
  event?: any;
  topic?: any;
}
interface Floor1State {
  addObjectTopic: boolean
  showaddTopic: boolean
  showaddEvent: boolean
  proDesc: {}
}

class Floor1 extends React.Component<Floor1Props, Floor1State> {
  constructor(props: any) {
    super(props);
    this.state = {
      addObjectTopic: false,
      showaddTopic: false,
      showaddEvent: false,
      proDesc: {}
    }
    this.handleInput = this.handleInput.bind(this);
    this.fetchTopicOrEventInRoom = this.fetchTopicOrEventInRoom.bind(this);
    this.handelForm = this.handelForm.bind(this);
    this.handAddEvent = this.handAddEvent.bind(this);
    this.handAddTopic = this.handAddTopic.bind(this);
    this.fetchEventHasNoRoom = this.fetchEventHasNoRoom.bind(this);
    this.fetchTopicHasNoRoom = this.fetchTopicHasNoRoom.bind(this);
    this.onDeleteEventInRoom = this.onDeleteEventInRoom.bind(this);
    this.onDeleteTopicInRoom = this.onDeleteTopicInRoom.bind(this);
  }

  componentDidMount() {
  }

  render() {
    const { room } = this.props;

    return (
      <>
        <div>
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

          {/* r23 - r26 */}
          <Tooltip  placement="top" title="Phòng số 26" color='green' >
            <Button  value="26" style={{ position: 'absolute', left: l08, top: t22 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(26)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 27" color='green' >
            <Button value="27" style={{ position: 'absolute', left: l145, top: t22 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(27)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 24" color='green' >
            <Button value="24" style={{ position: 'absolute', left: l08, top: t275 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(24)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 25" color='green' >
            <Button value="25" style={{ position: 'absolute', left: l145, top: t275 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(25)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 22" color='green' >
            <Button value="22" style={{ position: 'absolute', left: l08, top: t335 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(22)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 23" color='green' >
            <Button value="23" style={{ position: 'absolute', left: l145, top: t335 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(23)} />
          </Tooltip>

          {/* r19 - r21 */}
          <Tooltip placement="top" title="Phòng số 19" color='green' >
            <Button value="19" style={{ position: 'absolute', left: l125, top: t53 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(19)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 20" color='green' >
            <Button value="20" style={{ position: 'absolute', left: l125, top: t60 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(20)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 21" color='green' >
            <Button value="21" style={{ position: 'absolute', left: l125, top: t67 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(21)} />
          </Tooltip>

          {/* r14 - r18 */}


          <Tooltip placement="top" title="Phòng số 18" color='green' >
            <Button value="18" style={{ position: 'absolute', left: l204, top: t57 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(18)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 17" color='green' >
            <Button value="17" style={{ position: 'absolute', left: l252, top: t57 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(17)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 16" color='green' >
            <Button value="16" style={{ position: 'absolute', left: l298, top: t57 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(16)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 15" color='green' >
            <Button value="15" style={{ position: 'absolute', left: l35, top: t57 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(15)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 14" color='green' >
            <Button value="14" style={{ position: 'absolute', left: l40, top: t57 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(14)} />
          </Tooltip>

          {/* r1 - r6 */}


          <Tooltip placement="top" title="Phòng số 1" color='green' >
            <Button value="1" style={{ position: 'absolute', left: l60, top: t535 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(1)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 2" color='green' >
            <Button value="2" style={{ position: 'absolute', left: l60, top: t605 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(2)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 3" color='green' >
            <Button value="3" style={{ position: 'absolute', left: l678, top: t535 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(3)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 5" color='green' >
            <Button value="5" style={{ position: 'absolute', left: l775, top: t535 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(5)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 4" color='green' >
            <Button value="4" style={{ position: 'absolute', left: l678, top: t60 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(4)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 6" color='green' >
            <Button value="6" style={{ position: 'absolute', left: l775, top: t60 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(6)} />
          </Tooltip>

          {/* r10 - r13 */}
          <Tooltip placement="top" title="Phòng số 12" color='green' >
            <Button value="12" style={{ position: 'absolute', left: l837, top: t29 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(12)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 13" color='green' >
            <Button value="13" style={{ position: 'absolute', left: l904, top: t29 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(13)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 10" color='green' >
            <Button value="10" style={{ position: 'absolute', left: l837, top: t38 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(10)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 11" color='green' >
            <Button value="11" style={{ position: 'absolute', left: l904, top: t38 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(11)} />
          </Tooltip>

          {/* r7 - r9 */}
          <Tooltip placement="top" title="Phòng số 9" color='green' >
            <Button value="9" style={{ position: 'absolute', left: l843, top: t54 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(9)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 8" color='green' >
            <Button value="8" style={{ position: 'absolute', left: l87, top: t61 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(8)} />
          </Tooltip>

          <Tooltip placement="top" title="Phòng số 7" color='green' >
            <Button value="7" style={{ position: 'absolute', left: l87, top: t675 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(7)} />
          </Tooltip>
        </div>
      </>
    );
  }


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
            <Form.Item label="Id phòng"  >
              {room.data.roomId}
            </Form.Item>
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
            <Form

              onFinish={(value) => {
                value.roomId = room.data.roomId;
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
            <Form onFinish={(value) => {
              value.roomId = room.data.roomId;
              this.insertTopicToRoom(value)
            }
            } id={'addTopicForm'}>
              Id phòng: {room.data.roomId}
              <br /> <br />
              <Form.Item name='topicId' label="Chủ đề ">
                <Select
                  placeholder="Chọn chủ đề"
                  style={{ width: 298 }}
                  onSelect={(value) => this.handleTopicSelectChange(value)}
                >
                  {topic.data.map((obj: any) => {
                    return <Option key={obj.id} value={obj.id} >{obj.name}</Option>
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
          </Drawer>
        </div>
        )
      }
  }
  handleInput = (number: any) => {
    this.setState({
      addObjectTopic: true
    })
    this.fetchTopicOrEventInRoom(number);
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
    console.log("id", id);
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
}

export default connect((state) => ({ ...state }))(Floor1);
