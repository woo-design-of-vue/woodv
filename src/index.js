import "./style/base.less";

import Input from "./components/input";
import Checkbox from "./components/checkbox";
import Icon from "./components/icon";
import Button from "./components/button";
import CheckboxGroup from "./components/checkbox-group";
import Rate from "./components/rate";
import Textarea from "./components/textarea";
import Table from "./components/table";
const components = [Input, Icon, Button, Checkbox, CheckboxGroup, Rate, Textarea, Table];

export default (Vue)=> {
    components.map(item=>{
        Vue.component(item.name, item);
    });
};
