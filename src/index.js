import "./style/base.less";

import Input from "./components/input";
import Checkbox from "./components/checkbox";
import Icon from "./components/icon";
import Button from "./components/button";
import CheckboxGroup from "./components/checkbox-group";
const components = [Input, Icon, Button, Checkbox, CheckboxGroup];

export default (Vue)=> {
    components.map(item=>{
        Vue.component(item.name, item);
    });
};
