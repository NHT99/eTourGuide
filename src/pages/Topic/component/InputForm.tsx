import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, DatePicker, Upload, Button } from "antd";
import React, { useState } from "react";
import { storage } from '@/firebase/firebase';
import { sendNotification } from "@/utils/utils";
let imageUrl = ""

export const InputForm = (props: any) => {
    
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} là bắt buộc!',
        string :{range: '${label} nằm trong khoảng ${min} đến ${max} kí tự '} ,
    };
    function disabledDate(current: any) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    }
    function checkJpeg(file: any) {
        return (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
            && (file.size / 1024 / 1024 < 2)
    }


    const [fileList, updateFileList] = useState([]);


    const normFile = (e : any) => {
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

    return (

        <Form {...layout} name="nest-messages"
            id={'inputTopicForm'}
            form={form}
            onFinish={(value) => {              
                value.image = imageUrl;
                value.username = props.currentUser.Username;            
                props.onFinish(value);
            }}
            validateMessages={validateMessages}
        >
            <Form.Item name='name' label="Tên chủ đề tiếng Việt" rules={[{ required: true, type: 'string' ,min:3, max:50}]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả tiếng Việt"  rules={[{ required: true , type: 'string' ,min:45, max:2047 }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name='nameEng' label="Tên chủ đề tiếng Anh"  rules={[{ required: true, type: 'string' ,min:3, max:50}]}>
                <Input />
            </Form.Item>
            <Form.Item name="descriptionEng" label="Mô tả tiếng Anh"  rules={[{ required: true , type: 'string' ,min:45, max:2047 }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name="image"
                label="Hình ảnh chủ đề"
                getValueFromEvent={normFile}
                rules={[{ required : true}]}
            >
                <Upload
                    {...propss}
                    accept="image/*"
                    
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </Form.Item>
            <Form.Item label="Ngày bắt đầu" name="startDate"  rules={[{ required: true }]}>
                <DatePicker disabledDate={disabledDate} />
            </Form.Item>
            
        </Form>
    );
}