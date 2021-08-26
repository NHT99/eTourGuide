
import { Form, Upload, Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { storage } from '@/firebase/firebase';
import { sendNotification } from "@/utils/utils";
import { UploadOutlined } from "@ant-design/icons";
import { useStore } from "react-redux";

let imageUrl1 = ''
let imageUrl2 = ''
export const UploadForm = (props: any) => {
   
    const [form] = Form.useForm();
    const store = useStore();
    const state = store.getState();
    console.log("store", store);
    console.log("state", state);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    // const validateMessages = {
    //     required: '${label} là bắt buộc!',
    // };

    function checkJpeg(file: any) {
        return (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
            && (file.size / 1024 / 1024 < 2)
    }

    const [fileList, updateF1FileList] = useState([]);
    const [fileList2, updateF2FileList] = useState([]);

    const normFile = (e: any) => {
        return e.fileList.filter(checkJpeg);
    };
    const excelCheck = {
        beforeUpload: file => {
            if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                sendNotification(`${file.name} is not a xlsx file`, "", "error");
            }
            return file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? true : Upload.LIST_IGNORE;
        },
        onChange: info => {
            console.log(info.fileList);
        },
    };
    const floor1Props = {

        accept: "image/*",
        listType: "picture-card",

        onRemove: (file: any) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            updateF1FileList(newFileList);
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
            updateF1FileList(temp);
            info.fileList = temp;
        },
    };
    const floor2Props = {

        accept: "image/*",
        listType: "picture-card",

        onRemove: (file: any) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            updateF2FileList(newFileList);
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
            updateF2FileList(temp);
            info.fileList = temp;
        },
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
                    if (imageUrl1 == '' && imageUrl2 == '') {
                        imageUrl1 = url
                        console.log("imageUrl1", imageUrl1);
                    }
                    if (imageUrl2 == '') {
                        imageUrl2 = url
                        console.log("imageUrl2", imageUrl2);
                    }
                });
            },
        );
    }
    const onSubmit = (data: any) => {
        var formData = new FormData();
        for (let key in data) {
            let value = data[key];
            console.log(key, value)
            if (!!value?.file) {
                value = value.file.originFileObj;
            }

            console.log(key, value)
            formData.append(key, value);
        }
        props.onUploadMapInfor(formData)
    }

    return (

        <Form {...layout} name="nest-messages"
            id={'uploadFileForm'}
            form={form}
            // validateMessages={validateMessages}
            onFinish={(value) => {
        
                value.Floor1 = imageUrl1,
                    console.log("value.floor1", value.Floor1);

                value.Floor2 = imageUrl2,
                    console.log("value.floor2", value.Floor2);

                onSubmit(value)
            }}
            
        >
            <Spin spinning={state.room.roomLoading}>
                <Form.Item
                    name="Floor1"
                    label="Hình bản đồ tầng 1"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Hình bản đồ tầng 1 là bắt buộc!' }]}
                >
                    <Upload
                        {...floor1Props}
                        fileList={fileList}

                    >
                        {fileList.length < 1 && '+ Upload'}
                    </Upload>

                </Form.Item>
                <Form.Item name="Floor2"
                    label="Hình bản đồ tầng 2"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Hình bản đồ tầng 2 là bắt buộc!' }]}
                >
                    <Upload
                        {...floor2Props}
                        fileList={fileList2}
                    >
                        {fileList2.length < 1 && '+ Upload'}
                    </Upload>

                </Form.Item>
                <Form.Item name='PositionsFile' label="Danh sách vị trí" rules={[{ required: true, message: 'Danh sách vị trí là bắt buộc!' }]}>
                    <Upload
                        {...excelCheck}
                        maxCount={1}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        
                    >
                        <Button icon={<UploadOutlined />}>Tải lên danh sách vị trí</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="EdgesFile" label="Danh sách đường nối" rules={[{ required: true, message: 'Danh sách đường nối là bắt buộc!' }]}>
                    <Upload
                        {...excelCheck}
                        maxCount={1}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        
                    >
                        <Button icon={<UploadOutlined />}>Tải lên danh sách đường nối</Button>
                    </Upload>
                </Form.Item>
            </Spin>
        </Form>
    );
}