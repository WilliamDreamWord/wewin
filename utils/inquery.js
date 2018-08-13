
var region_department={
  "廊坊分公司": ["资管部", "硬件耗材部", "开发部", "市场部", "市场部", "廊坊"],
}
var type_name = ["类型1", "类型2", "类型3", "类型4", "类型5", "类型6", "类型7", "类型8", "类型9", "类型10"]

var status_name = ["状态1", "状态2", "状态3", "状态4", "状态5", "状态6", "状态7", "状态8", "状态9", "状态10"]


//获取部门/区县列表
function getRegion(){
  return region_department;
}
////获取类型列表
function getType() {
  return type_name;
}

//获取名称列表
function getStatus() {
  return status_name;
}
module.exports.getRegion=getRegion
module.exports.getType = getType
module.exports.getStatus = getStatus