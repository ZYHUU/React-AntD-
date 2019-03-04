// 引入 createStore创建store
import { createStore } from "redux";
// 引入所有的reducer
import reducer from "./../reducer";

const initialState = {
  menuName: ""
};
const configureStore = () => createStore(reducer, initialState);
export default configureStore;
