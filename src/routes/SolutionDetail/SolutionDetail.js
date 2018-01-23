import React, {Component} from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import {connect} from 'dva';
import {Button, Row, Col, Steps, Card, Popover, Badge, List,Modal,Spin} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import {queryString,timeStampToDate} from "../../utils/tools";
import {getReqType,getReqStatus,getExceptCycle} from "../../utils/utils";
import styles from './solution-detail.less';

const {Step} = Steps;
const {Description} = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);





const tabList = [{
  key: 'detail',
  tab: '详情',
}, {
  key: 'rule',
  tab: '规则',
}];


const customDot = (dot, {status}) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);

const operationTabList = [{
  key: 'tab1',
  tab: '操作日志一',
}, {
  key: 'tab2',
  tab: '操作日志二',
}, {
  key: 'tab3',
  tab: '操作日志三',
}];

const columns = [{
  title: '操作类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '操作人',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '执行结果',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'agree' ? <Badge status="success" text="成功"/> : <Badge status="error" text="驳回"/>
  ),
}, {
  title: '操作时间',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
}, {
  title: '备注',
  dataIndex: 'memo',
  key: 'memo',
}];

@connect(state => ({
  solution:state.solution
}))
export default class SolutionDetail extends Component {
  constructor(props) {
    super(props);
    this.examineSolution = this.examineSolution.bind(this);
    this.editSolution = this.editSolution.bind(this);
    this.state = {
      operationkey: 'tab1',
      stepDirection: 'horizontal',
      args: queryString.parse(window.location.href)
    }
  }

  //审核方案：1,审核通过，2，审核不通
  examineSolution(solutionId,status){  //传入需求ID,以及要改变的状态
    const { dispatch } = this.props;
    dispatch({
      type: 'solution/setDetailStatus',
      solutionId:solutionId,
      status:status
    })
  }

  // 编辑需求
  editSolution(reqId){
    Modal.info({
       title: '提示',
       content: (
         <div>
           <p>编辑功能正在在开发中，即将上线...</p>
         </div>
       ),
       onOk() {},
     });
  }

  componentDidMount() {
    const {dispatch} = this.props;
    //获取方案详细信息
    dispatch({
      type: "solution/fetchSolutionDetail",
      solutionId: this.state.args.solution_id
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = (key) => {
    this.setState({operationkey: key});
  }

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const {stepDirection} = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const {stepDirection} = this.state;
    const { solution} = this.props;
    const {detail:{req:reqInfo,solution:solutionInfo},loading} = solution;
    if(!reqInfo){
      return <Spin spinning={loading}></Spin>;
    }
    //需求关键信息
    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="联系人">{reqInfo.link_man}</Description>
        <Description term="需求ID">{reqInfo.id}</Description>
        <Description term="需求类型">{getReqType(reqInfo.req_type)}</Description>
        <Description term="需求周期">{getExceptCycle(reqInfo.except_cycle)}</Description>
        <Description term="创建时间">{timeStampToDate(reqInfo.created_time*1000).timeStr}</Description>
        <Description term="操作人">不可追溯</Description>
      </DescriptionList>
    );

    //需求状态及金额
    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{getReqStatus(reqInfo.status)}</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>报价金额</div>
          <div className={styles.heading}>¥ {reqInfo.budget}</div>
        </Col>
      </Row>
    );

    let solutionId = this.state.args.solution_id;//方案ID

    let action = (solutionInfo.status !== 0) ? (
      <div>
        <ButtonGroup>
          <Button onClick={this.editSolution}>编辑</Button>
        <Button disabled>驳回</Button>
        </ButtonGroup>
        <Button type="primary" style={{marginLeft:"1.5rem"}} disabled>通过</Button>
      </div>
    ):(
      <div>
        <ButtonGroup>
          <Button onClick={this.editSolution}>编辑</Button>
        <Button onClick={this.examineSolution.bind(this,solutionId,2)}>驳回</Button>
        </ButtonGroup>
        <Button type="primary" style={{marginLeft:"1.5rem"}} onClick={this.examineSolution.bind(this,solutionId,1)} loading={loading}>审核通过</Button>
      </div>
    )

    // console.log("方案详情页props",this.props,solutionInfo);

    return (
      <PageHeaderLayout
        title={"需求名称："+reqInfo.title}
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"/>}
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        <Card
          title="方案详情"
          style={{marginBottom: 0}}
          extra={action}
          bordered={false}
        >
          <List
            itemLayout="vertical"
            size="large"
          >
            <List.Item
              key='title'
              actions={[<span>{getReqStatus(solutionInfo.status)}</span>]}
            >
              <List.Item.Meta
                title={solutionInfo.title}
              />
              {solutionInfo.desc}
            </List.Item>
          </List>
        </Card>
       {/* <Card title="供应方信息" style={{marginBottom: 24}} bordered={false}>
          <DescriptionList style={{marginBottom: 24}}>
            <Description term="用户姓名">{reqInfo.link_man}</Description>
            <Description term="联系方式">{reqInfo.mobile}</Description>
            <Description term="公司信息">{reqInfo.company}</Description>
          </DescriptionList>
        </Card>*/}
      </PageHeaderLayout>
    );
  }
}
