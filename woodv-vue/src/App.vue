<template>
    <div id="app">
        <div class="form">
            <w-input v-model="value" placeholder="Input" @appendClick="appendClick" @prependClick="prependClick"
                     @change="change" @search="search">
                <template #prepend>
                    <w-icon size="20">
                        http
                    </w-icon>
                </template>
                <template #append>
                    <w-icon>
                        search
                    </w-icon>
                </template>
            </w-input>

            <div class="btn">
                <w-btn>
                    123456
                </w-btn>
                <w-btn type="primary" size="large" color="pink" fontSize="63">
                    按钮
                </w-btn>
                <w-btn type="warn" size="small">
                    123456
                </w-btn>
                <w-btn type="danger" size="mini">
                    123456
                </w-btn>
                <w-btn type="danger" round>
                    123456
                </w-btn>
                <w-btn type="danger" disabled @click="search">
                    disabled
                </w-btn>
                <w-btn type="danger" block>
                    123456
                </w-btn>
                <w-btn color="#eee" icon @click="search">
                    <w-icon>
                        search
                    </w-icon>
                    搜索
                </w-btn>
            </div>
            <div class="btn">
                <w-btn link>
                    123456
                </w-btn>
                <w-btn type="primary" size="large" link>
                    123456
                </w-btn>
                <w-btn type="warn" size="small" round link>
                    123456
                </w-btn>
                <w-btn type="danger" size="mini" block link>
                    123456
                </w-btn>
                <w-btn icon link @click="checkbox = true">
                    <w-icon>
                        search
                    </w-icon>
                    搜索
                </w-btn>
            </div>

            <div class="checkbox">
                <w-checkbox v-model="checkbox" color="red" @change="checkboxChange">
                    Checkbox
                </w-checkbox>
            </div>
            <div class="checkbox-group" style="margin-top: 24px;">
                <w-checkbox-group color="pink" v-model="checkboxGroup" @change="checkboxGroupChange">
                    <w-checkbox color="blue" :value="1">
                        1
                    </w-checkbox>
                    <w-checkbox color="red" :value="2">
                        2
                    </w-checkbox>
                    <w-checkbox color="red" :value="3">
                        3
                    </w-checkbox>
                    <w-checkbox :value="4">
                        4
                    </w-checkbox>
                    <w-checkbox :value="5">
                        5
                    </w-checkbox>
                    <w-checkbox color="red" :value="6">
                        6
                    </w-checkbox>
                </w-checkbox-group>
            </div>
            <div class="rate" style="margin-top: 16px;">
                <w-rate v-model="rate" color="pink" text="menu" size="32" allowHalf></w-rate>
            </div>

            <div class="textarea" style="margin-top: 16px;">
                <w-textarea v-model="textarea" rows="10"></w-textarea>
            </div>
        </div>
        <div class="table" style="margin-top: 16px;">
            <w-table
                    :data-source="dataSource"
                    targetClass="xl-table"
                    :columns="columns"
                    selection
                    children
                    @selection="selectionChange"
                    height="500px"
            >
                <template #age="{text,row}">
                    <a href="">{{row.age}}</a>
                </template>
                <template #action="{row}">
                    <w-btn size="mini" type="danger">
                        删除
                    </w-btn>
                    <w-btn size="mini" type="primary">
                        修改
                    </w-btn>
                </template>
            </w-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                value: "d1as23d1sa32d",
                checkbox: false,
                checkboxGroup: [1],
                rate: 0,
                textarea: "123456",
                dataSource: Array.from(Array(50).keys()).map((item)=>{
                    return {
                        id: 1,
                        name: "小鹿1"+item,
                        firstName:"小",
                        lastName:"鹿1"+item,
                        age: item,
                        sex: "男",
                        children:[
                            {
                                id: 1,
                                name: "小鹿"+item,
                                firstName:"小",
                                lastName:"鹿2"+item,
                                age: 27,
                                sex: "男",
                                children:[
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    },
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    },
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    }
                                ]
                            },
                            {
                                id: 1,
                                name: "小鹿"+item,
                                firstName:"小",
                                lastName:"鹿2"+item,
                                age: 27,
                                sex: "男",
                                children:[
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    },
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    },
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    }
                                ]
                            },
                            {
                                id: 1,
                                name: "小鹿"+item,
                                firstName:"小",
                                lastName:"鹿2"+item,
                                age: 27,
                                sex: "男",
                                children:[
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    },
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    },
                                    {
                                        id: 1,
                                        name: "小鹿"+item,
                                        firstName:"小",
                                        lastName:"鹿3"+item,
                                        age: 27,
                                        sex: "男",
                                    }
                                ]
                            }
                        ]
                    }
                }),
                columns: [
                    {
                        title: "姓名",
                        dataIndex: "lastName",
                        width: "200px",
                        align: "left",
                        fixed:"start",
                        sorter:"firstName",
                    },
                    {
                        dataIndex: "age",
                        title: "年龄",
                        width: "200px",
                        slots: "age",
                        fixed:"start",
                        sorter:"age",
                        children:[
                            {
                                dataIndex: "age",
                                title: "年龄",
                                width: "200px",
                                slots: "age",
                                fixed:"start"
                            },
                            {
                                dataIndex: "age",
                                title: "年龄",
                                width: "200px",
                                slots: "age",
                                fixed:"start"
                            }
                        ]
                    },
                    {
                        dataIndex: "age",
                        title: "年龄",
                        width: "200px",
                        slots: "age",
                        fixed:"start"
                    },
                    {
                        dataIndex: "age",
                        title: "年龄",
                        width: "200px",
                        slots: "age"
                    },
                    {
                        dataIndex: "sex",
                        title: "性别",
                        width:"500px"
                    },
                    {
                        dataIndex: "action",
                        title: "操作",
                        width:"200px",
                        slots: "action",
                        fixed:"end"
                    },
                ]
            }
        },
        watch: {
            rate(value) {
                console.log(value, "rate")
            },
            value(value) {
                console.log(value, "input")
            },
            textarea(value) {
                console.log(value, "textarea")
            },
            dataSource(){
                console.log("dataSource update")
            }
        },
        methods: {
            change(e) {
                console.log(e, this.value, 9527)
            },
            search(e) {
                console.log("search", e)
            },
            appendClick(e) {
                console.log(e, "appendClick")
            },
            prependClick(e) {
                console.log(e, "prependClick")
            },
            checkboxChange(e) {
                console.log(e, "checkbox");
                this.value = "as1d3sa2d1";
                this.checkboxGroup = [1, 2, 3];
                this.rate = 4;
                this.textarea = "951357";

            },
            checkboxGroupChange(e) {
                console.log(e, "checkboxGroup")
            },
            selectionChange(v,k) {
                console.log(v,k)
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .form {
        width: 1200px;
        margin: 0 auto;
    }

    .btn {
        margin-top: 12px;
    }

    .btn > * {
        margin-top: 12px;
    }

    .checkbox {
        margin-top: 12px;
    }
</style>
