export {login,getMenuByToken,logout}   from './login'
export {getWeather,getModules,getEquStatus,getRaceProject,getTableVal,getChartVal} from './home'
export  { editOrg,getOrgByParentId,getStudentByOrgId,syncStudentGradeInfo}  from './organization'
export { editRole, getRoleById, getAllRoles, getRolesByOrgId, editRoleOrgLinkInfo } from './roleManage'
export { getMenuListByParentId, editMenuInfo, menuLinkRole, getRoleByMenuId } from './menu'
export {getAccountByPage,editAccountInfo,accountLinkRoleOrg,getAccountDetail } from './account'
export {editStudentInfo, checkStudentInfo, queryStudentByPage, getSutdentById,
       editTeacherInfo, checkTeacherInfo, queryTeacherByPage, getTeacherById,
    editVistorInfo, queryVistorByPage, getVistroById, checkVistorInfo, getOrgsBySchoolId
} from './user'
export { editScoreLevInfo, getScoreLevByPage, editScoreRuleInfo, getScoreRuleByPage } from './levelAndScore'
export { editWristbandInfo, queryWristbandByPage, getWristBandById } from '@/api/run/wristband'
export * from '@/api/run/game'
export * from '@/api/run/event'