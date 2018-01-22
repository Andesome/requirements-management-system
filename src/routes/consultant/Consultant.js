import React from 'react';
import {Card, Badge, Table, Divider, Button} from 'antd';
import {dataSource, columns} from "./dataSource";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Consultant.less';
import {connect} from 'dva';


class Consultant extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

  }

  handleClick(){
    this.props.history.push("/consultant/publish");
  }

  render() {
    return (

      <PageHeaderLayout title="">
        <Button
          type="primary"
          className={`${styles.right} ${styles["publish-btn"]}`}
          onClick={this.handleClick}
        >
          发布
        </Button>
        <div style={{clear: "both"}}> </div>
        <Card bordered={false}>
          <div className={styles.title}>我的发布</div>
          <Table
            dataSource={dataSource}
            columns={columns}
            // prefixCls={}
            // useFixedHeader={}
            // rowSelection={}
            // className={}
            // size={}
            // loading={}
            // bordered={}
            // onChange={}
            // locale={}
            // dropdownPrefixCls={}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}


export default Consultant;
