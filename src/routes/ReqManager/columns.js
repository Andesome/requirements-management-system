export const status = ['未审核', '已审核','未通过'];
export const types = {
  "si": '系统集成',
  "purchase": '产品购买',
  "tech": '技术支持',
  "other": '其他'
};
export const columns = [
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '类型',
    dataIndex: 'req_type',
    key:'req_type',
    filters: [
      {
        text: types["si"],
        value: "si",
      },
      {
        text: types["purchase"],
        value: "purchase",
      },
      {
        text: types["tech"],
        value: "tech",
      },
      {
        text: types["other"],
        value: "other",
      },
    ],
    filteredValue: filteredInfo.req_type || null,
    onFilter: (value, record) => (record.req_type.includes(value)),
    sortOrder: sortedInfo.columnKey === 'req_type' && sortedInfo.order,
    render(val) {
      return <span> {types[val]} </span>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key:'status',
    filters: [
      {
        text: status[0],
        value: 0,
      },
      {
        text: status[1],
        value: 1,
      },
      {
        text: status[2],
        value: 2,
      }
    ],
    filteredValue: filteredInfo.status || null,
    onFilter: (value, record) => (record.status === value>>0),
    sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]}/>;
    },
  },
  {
    title: '报价',
    'dataIndex': "budget",
    key: 'budget',
    sorter: (a, b) => a.budget - b.budget,
    sortOrder: sortedInfo.columnKey === 'budget' && sortedInfo.order,
  },
  {
    title: '查看',
    render: (val) => <a onClick={this.props.jumpFunc.bind(this,val.id)}>查看</a>,
  },
  {
    title: '发布时间',
    dataIndex: 'created_time',
    key: 'created_time',
    sorter: (a, b) => a.created_time - b.created_time,
    sortOrder: sortedInfo.columnKey === 'created_time' && sortedInfo.order,
    render: val => <span>{moment(val*1000).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '审核',
    render: (val,record) => (
      <div>
        <a onClick={this.props.examine.bind(this,val.id,1)}>通过</a>
        <Divider type="vertical"/>
        <a onClick={this.props.examine.bind(this,val.id,2)}>驳回</a>
      </div>
    ),
  },
];
