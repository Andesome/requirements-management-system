export const dataSource = [{
  key: '1',
  name: '前端工程师',
  status: "未完成",
  view: '查看'
}, {
  key: '2',
  name: '后端工程师',
  status: "未完成",
  view: '查看'
},{
  key: '3',
  name: '前端工程师',
  status: "未完成",
  view: '查看'
}, {
  key: '4',
  name: '后端工程师',
  status: "未完成",
  view: '查看'
},{
  key: '5',
  name: '前端工程师',
  status: "未完成",
  view: '查看'
}, {
  key: '6',
  name: '后端工程师',
  status: "未完成",
  view: '查看'
}];

export const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '查看',
  // dataIndex: 'view',
  key: 'view',
  render: (text, record) => (
    <a href="http://localhost:8000/#/consultant/detail" onClick={()=>{window.sessionStorage.setItem('detail',JSON.stringify(record))}}>查看</a>
  )
}];
