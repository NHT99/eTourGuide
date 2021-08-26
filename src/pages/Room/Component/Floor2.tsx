import { sendNotification } from '@/utils/utils';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Drawer, Empty, Form, Image, Input, Popconfirm, Select, Tooltip } from 'antd';

import React from 'react';
import { connect, Dispatch } from 'umi';

let l085 = '8.5%';
let l145 = '14.5%';
let l113 = '11.3%';
let l23 = '23%';
let l32 = '32%';
let l397 = '39.7%';
let l595 = '59.5%';
let l665 = '66.5%';
let l75 = '75%';
let l835 = '83.5%';
let l893 = '89.3%';

let t235 = '23.5%';
let t30 = '30%';
let t31 = '31%';
let t40 = '40%';
let t49 = '49%';
let t585 = '58.5%';
let t595 = '59.5%';
let t66 = '66%';
let t665 = '66.5%';
let t71 = '71%';
let t74 = '74%';
let confirmDelTopicMes = "Bạn có chắc muốn xoá chủ đề ra khỏi phòng ?"
let confirmDelEventMes = "Bạn có chắc muốn xoá sự kiện ra khỏi phòng ?"

interface Floor2Props {
  dispatch: Dispatch;
  room?: any;
  event?: any;
  topic?: any;
}
interface Floor2State {
  addObjectTopic: boolean
  showaddTopic: boolean
  showaddEvent: boolean
  proDesc: {}
}


class Floor2 extends React.Component<Floor2Props, Floor2State> {
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
      <div>
        <Drawer
          title={room.data.roomId ? `Phòng ${room.data.roomId}` : "Phòng trống"}
          width={450}
          visible={this.state.addObjectTopic}
          onClose={() => this.setState({
            addObjectTopic: false,
            showaddTopic: false,
            showaddEvent: false,
          })}
        >
          <Form name="nest-messages" >
            {this.handelForm}
          </Form>
        </Drawer>


        {/* r37 - r40 */}
        <Tooltip placement="top" title="Phòng số 39" color='green' >
          <Button id="39" style={{ position: 'absolute', left: l085, top: t235 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(39)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 40" color='green' >
          <Button id="40" style={{ position: 'absolute', left: l145, top: t235 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(40)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 37" color='green' >
          <Button id="37" style={{ position: 'absolute', left: l085, top: t30 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(37)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 38" color='green' >
          <Button id="38" style={{ position: 'absolute', left: l145, top: t30 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(38)} />
        </Tooltip>

        {/* r28 - r30 */}
        <Tooltip placement="top" title="Phòng số 28" color='green' >
          <Button id="28" style={{ position: 'absolute', left: l113, top: t585 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(28)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 29" color='green' >
          <Button id="29" style={{ position: 'absolute', left: l113, top: t66 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(29)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 30" color='green' >
          <Button id="30" style={{ position: 'absolute', left: l113, top: t74 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(30)} />
        </Tooltip>

        {/* r31 - r36 */}
        <Tooltip placement="top" title="Phòng số 31" color='green' >
          <Button id="31" style={{ position: 'absolute', left: l23, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(31)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 32" color='green' >
          <Button id="32" style={{ position: 'absolute', left: l32, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(32)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 33" color='green' >
          <Button id="33" style={{ position: 'absolute', left: l397, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(33)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 34" color='green' >
          <Button id="34" style={{ position: 'absolute', left: l23, top: t665 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(34)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 35" color='green' >
          <Button id="35" style={{ position: 'absolute', left: l32, top: t665 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(35)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 36" color='green' >
          <Button id="36" style={{ position: 'absolute', left: l397, top: t665 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(36)} />
        </Tooltip>

        {/* r41 - r46 */}
        <Tooltip placement="top" title="Phòng số 41" color='green' >
          <Button id="41" style={{ position: 'absolute', left: l595, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(41)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 43" color='green' >
          <Button id="43" style={{ position: 'absolute', left: l665, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(43)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 45" color='green' >
          <Button id="45" style={{ position: 'absolute', left: l75, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(45)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 42" color='green' >
          <Button id="42" style={{ position: 'absolute', left: l595, top: t665 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(42)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 44" color='green' >
          <Button id="44" style={{ position: 'absolute', left: l665, top: t665 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(44)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 46" color='green' >
          <Button id="46" style={{ position: 'absolute', left: l75, top: t665 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(46)} />
        </Tooltip>

        {/* r51 - r56 */}
        <Tooltip placement="top" title="Phòng số 55" color='green' >
          <Button id="55" style={{ position: 'absolute', left: l835, top: t31 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(55)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 56" color='green' >
          <Button id="56" style={{ position: 'absolute', left: l893, top: t31 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(56)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 53" color='green' >
          <Button id="53" style={{ position: 'absolute', left: l835, top: t40 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(53)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 54" color='green' >
          <Button id="54" style={{ position: 'absolute', left: l893, top: t40 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(54)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 51" color='green' >
          <Button id="51" style={{ position: 'absolute', left: l835, top: t49 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(51)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 52" color='green' >
          <Button id="52" style={{ position: 'absolute', left: l893, top: t49 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(52)} />
        </Tooltip>

        {/* r47 - r50 */}
        <Tooltip placement="top" title="Phòng số 47" color='green' >
          <Button id="47" style={{ position: 'absolute', left: l835, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(47)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 48" color='green' >
          <Button id="48" style={{ position: 'absolute', left: l893, top: t595 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(48)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 48" color='green' >
          <Button id="48" style={{ position: 'absolute', left: l835, top: t71 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(49)} />
        </Tooltip>

        <Tooltip placement="top" title="Phòng số 50" color='green' >
          <Button id="50" style={{ position: 'absolute', left: l893, top: t71 }} shape="circle" icon={<EnvironmentOutlined />} onClick={() => this.handleInput(50)} />
        </Tooltip>
      </div>
    );
  }
  handelForm() {
    const { room } = this.props;
    const { topic } = this.props;
    const { event } = this.props;
    const { Option } = Select;
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
              onConfirm={() => {this.onDeleteTopicInRoom(room.data.eventOrTopicId), this.setState({proDesc : {}}) }}>
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
                onConfirm={() => {this.onDeleteEventInRoom(room.data.eventOrTopicId), this.setState({proDesc : {}}) }}>
                <Button type="primary" danger >Xoá sự kiện khỏi phòng</Button>
              </Popconfirm>
            </Form.Item>
          </div>
        );
      }
      else {
        return (<div>
          <Button type="primary" htmlType="submit" style={{ marginLeft: "149px", marginTop: "52px" }} onClick={() => this.handAddTopic()}>Thêm chủ đề </Button>
          <br /><br />
          <Button type="primary" htmlType="submit" style={{ marginLeft: "149px", marginTop: "52px" }} onClick={() => this.handAddEvent()}>Thêm sự kiện</Button>

          {/* Slide drawer them su kien vao phong */}
          <Drawer
            title={`Thêm sự kiện vào phòng`}
            visible={this.state.showaddEvent}
            width={450}
            destroyOnClose={true}
            onClose={() => this.setState({
              showaddEvent: false,
              proDesc: {}
            })}
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
            <Form onFinish={(value) => {
              value.roomId = room.data.roomId;
              this.insertEventToRoom(value)
            }
            } id={'addEventForm'}>
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
            width={360}
            destroyOnClose={true}
            onClose={() => this.setState({
              showaddTopic: false,
              proDesc: {}
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
              {(this.state.proDesc.id != undefined ?
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
              )}

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
    const { event } = this.props;
    let index = event.data.findIndex((item: any) => item.id == value)
    if (index > -1) this.setState({ proDesc: event.data[index] })
  }
  handleTopicSelectChange = (value: any) => {
    const { topic } = this.props;
    let index = topic.data.findIndex((item: any) => item.id == value)
    if (index > -1) this.setState({ proDesc: topic.data[index] })
  }

}
export default connect((state) => ({ ...state }))(Floor2);
