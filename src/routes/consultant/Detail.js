import React from 'react';
import {
  Card, Button, Form, Input, DatePicker, Select, InputNumber, Radio, Icon, Tooltip,Upload
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Consultant.less';
import {connect} from 'dva';
import {message} from "antd/lib/index";

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

const fileArr = ['pdf','doc','xls','ppt','docx','xlsx','pptx'];
function checkFile(filename,fileArr){
  let postfix = filename.split(".")[1];
  for(let i=0,fileLen = fileArr.length;i<fileLen;i++){
    if(postfix === fileArr[i]){
      return true;
    }
  }
}


const props1 = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload(file){
    console.log("file",file);
    if(!checkFile(file.name,fileArr)){
      message.error(`${file.name} 暂不支持上传`);
      return false;
    }
  },
  onChange(info) {
    console.log(info.file.status);
    if (info.file.status !== 'uploading') {
      // console.log("--",info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },
};

@Form.create()
class Detail extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  handleClick(){
    this.props.history.push("/consultant/view");
  }

  render() {
    const {submitting} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    let detailData = window.sessionStorage.getItem("detail");
    detailData = JSON.parse(detailData);

    return (
      <PageHeaderLayout title="">
        <Button
          className={`${styles.right} ${styles["publish-btn"]}`}
          onClick={this.handleClick}
        >
          返回
        </Button>
        <div style={{clear: "both"}}> </div>
        <Card bordered={false}>
          <div className={styles.title}>详细信息</div>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="这是一条假数据" disabled />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="详细描述"
            >
              {getFieldDecorator('desc', {
                rules: [{
                  required: true, message: '请输入目标描述',
                }],
              })(
                <TextArea style={{minHeight: 32}} rows={6} disabled>
                  11111111111111111111111111111
                </TextArea>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>联系人<em className={styles.optional}></em></span>}
            >
              {getFieldDecorator('contact',{
                rules: [{
                  required: true, message: '请输入联系方式',
                }],
              })(
                <Input placeholder="13574488306" disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="附件"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                 <div>
                   <div style={{height:25}}>
                     <Icon type="paper-clip" />
                     文档.doc
                   </div>
                   <div style={{height:25}}>
                     <Icon type="paper-clip" />
                     文档2.doc
                   </div>

                 </div>
                )}
              </div>
            </FormItem>
          </Form>

        </Card>
      </PageHeaderLayout>
    );
  }
}

export default Detail;
