import "./style/base.less";
import Input from "./components/input";
import Checkbox from "./components/checkbox";
import Icon from "./components/icon";
import Button from "./components/button";
import CheckboxGroup from "./components/checkbox-group";
import Rate from "./components/rate";
import Textarea from "./components/textarea";
import Table from "./components/table";
import Page from "./components/page";
import Select from "./components/select";
import SelectOption from "./components/select-option";
const components = [
    Input,
    Icon,
    Button,
    Checkbox,
    CheckboxGroup,
    Rate,
    Textarea,
    Table,
    Page,
    Select,
    SelectOption
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component, Vue);
    });
};

// eslint-disable-next-line no-undef
if (typeof window !== "undefined" && window.Vue) {
    // eslint-disable-next-line no-undef
    install(window.Vue);
}

export default (Vue)=> {
    components.map(item=>{
        Vue.component(item.name, item);
    });
};
