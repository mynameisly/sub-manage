import Axios from "axios";
/**
 * 提供登录、注册、登出接口
 */
export default {
    loginIn:function({username,password}){
      var param={
        username: username,
        password: password       
      };
      return Axios.get('/sub/userInfo/login', param);
    },
    copy({ip,addid}){
      var param={
        ip:ip,
        addid:addid
      }
      return Axios.post('/api/mayirecord-api/add', param);
    }
}