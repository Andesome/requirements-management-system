import React, {Component} from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import {connect} from 'dva';
import {Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider,Spin,Modal} from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import SolutionList from "../../components/SolutionList/SolutionList";
import {queryString,timeStampToDate} from "../../utils/tools";
import {getReqType,getReqStatus,getExceptCycle} from "../../utils/utils";
import styles from './req-detail.less';

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


@connect(state => ({
  demand: state.demand
}))
export default class ReqDetail extends Component {
  constructor(props) {
    super(props);
    this.examineDemand = this.examineDemand.bind(this);
    this.editReq = this.editReq.bind(this);
    this.state = {
      operationkey: 'tab1',
      stepDirection: 'horizontal',
      args: queryString.parse(window.location.href)
    }
  }

  //审核需求：1,审核通过，2，审核不通过
  examineDemand(reqId,status){  //传入需求ID,以及要改变的状态
    console.log("详情页审核需求：",reqId,status);
    const { dispatch } = this.props;
    dispatch({
      type: 'demand/setDetailStatus',
      reqId:reqId,
      status:status
    })
  }

  // 编辑需求
  editReq(reqId){
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

    //获取需求详细信息
    dispatch({
      type: "demand/fetchDemandDetail",
      reqId: this.state.args.req_id
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
    const { demand} = this.props;
    const {detail:{req:reqInfo,solutions:solutionsList},loading: reqDetailLoading} = demand;
    // console.log("detail页面props:",this.props);
    if(!reqInfo){
      return <Spin spinning={true} />;
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

    //操作
    // console.log("需求的状态",reqInfo.status);
    let reqId =  this.state.args.req_id;

    let action = (reqInfo.status !== 0) ? (
      <div>
        <ButtonGroup>
          <Button onClick={this.editReq}>编辑</Button>
        <Button disabled>驳回</Button>
        </ButtonGroup>
        <Button type="primary" disabled>通过</Button>
      </div>
    ):(
      <div>
        <ButtonGroup>
          <Button onClick={this.editReq}>编辑</Button>
        <Button onClick={this.examineDemand.bind(this,reqId,2)}>驳回</Button>
        </ButtonGroup>
        <Button type="primary" onClick={this.examineDemand.bind(this,reqId,1)} loading={reqDetailLoading}>审核通过</Button>
      </div>
    )

    return (
        <PageHeaderLayout
          title={"需求名称："+reqInfo.title}
          logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"/>}
          action={action}
          content={description}
          extraContent={extra}
          tabList={tabList}
        >
          <Card title="已提方案列表" style={{marginBottom: 24}} bordered={false}>
              <SolutionList data={solutionsList}/>
          </Card>
          <Card title="需求方信息" style={{marginBottom: 24}} bordered={false}>
            <DescriptionList style={{marginBottom: 24}}>
              <Description term="用户姓名">{reqInfo.link_man}</Description>
              <Description term="联系方式">{reqInfo.mobile}</Description>
              <Description term="公司信息">{reqInfo.company}</Description>
            </DescriptionList>
          </Card>
        </PageHeaderLayout>
    );
  }
}
