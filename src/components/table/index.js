import {strToLength, strToNum} from "../../util/tool";
import {buildRowAndColSpan, getColumnsLevel, sortDataSource} from "../../util/function/build-table";
import WTableColgroup from "./component/table-colgroup";
import WTableHeaderTr from "./component/table-header-tr";
import WTableBodyGroup from "./component/table-body-group";
import WPage from "../page";
export default {
    name: "WTable",
    data(){
        return{
            localDataSource:[],
            initialDataSource:[],
            localColumns:[],
            columnsLayout:{
                colgroup:[],
                colsSize: 0,
                columns:[],
                tableTrGroup:[]
            },
            checkedMap:{},
            isHeaderChecked:false,

        };
    },
    props: {
        columns: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        dataSource: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        width: {
            type: [String, Number],
            required: false,
            default: ""
        },
        height: {
            type: [String, Number],
            required: false,
            default: "600"
        },
        rowKey: {
            type: String,
            required: false,
            default: ""
        },
        targetClass: {
            type: String,
            required: false,
            default: ""
        },
        children:{
            type: Boolean,
            required: false,
            default: false
        },
        selection:{
            type: Boolean,
            required: false,
            default: false
        },
        pagination:{
            type: [Boolean, Object],
            required: false,
            default: false
        }
    },
    components:{
        WTableColgroup,
        WTableHeaderTr,
        WTableBodyGroup,
        WPage
    },
    watch:{
        dataSource(value){
            this.initialDataSource = sortDataSource(this.children,  JSON.parse(JSON.stringify(value)));
            this.filterDataSourceByPage();
        },
        columns(){
            this.loadColumnsLayout();
        }
    },
    beforeCreate(){
        this.$nextTick(()=>{
            this.initialDataSource = sortDataSource(this.children, JSON.parse(JSON.stringify(this.dataSource)));
            this.filterDataSourceByPage();
            this.loadColumnsLayout();
        });
    },
    methods:{
        loadColumnsLayout(){
            this.localColumns = JSON.parse(JSON.stringify(this.columns));
            if(this.selection){
                const selectionMap = {
                    wooTableType:"checkbox",
                    width:"60px",
                    align:"center"
                };

                if(this.localColumns[0].fixed){
                    selectionMap.fixed = "start";
                }
                this.localColumns.unshift(selectionMap);
            }
            const columnsMaxLv = getColumnsLevel(this.localColumns);

            this.columnsLayout = buildRowAndColSpan(columnsMaxLv, 0, this.localColumns);
        },
        changeHeaderChecked(e){
            this.isHeaderChecked = e;
            this.checkedMap = {};
            for(const item of this.localDataSource){
                if(e){
                    item.wooTableChecked = true;
                    this.checkedMap[item.wooTableIndex] = item;
                }else{
                    item.wooTableChecked = false;
                }
            }
            this.selectionFilter();
        },
        changeBodyChecked(e){
            if(this.checkedMap[e.wooTableIndex]){
                delete this.checkedMap[e.wooTableIndex];
            }else{
                this.checkedMap[e.wooTableIndex] = e;
            }
            if(Object.keys(this.checkedMap).length === this.localDataSource.length){
                this.isHeaderChecked = true;
            }else{
                this.isHeaderChecked = false;
            }
            this.selectionFilter();
        },
        selectionFilter(){
            const checkedRowKeyList =[];
            const checkedMap = JSON.parse(JSON.stringify(this.checkedMap));

            for(const key in checkedMap){
                const item = checkedMap[key];
                const index = item.wooTableIndex;

                delete  item.wooTableIndex;
                delete  item.wooTableTargetIndex;
                delete  item.wooTableIsChildren;
                delete  item.wooTableIsShow;
                delete  item.wooTableTargetIsShow;
                delete  item.wooTablelevel;
                delete  item.wooTableChecked;
                checkedRowKeyList.push(item[this.rowKey] || index);
            }
            this.$emit("selection", Object.values(checkedMap), checkedRowKeyList);
        },
        changeSorter(e){
            const localDataSource = sortDataSource(this.children,  JSON.parse(JSON.stringify(this.dataSource)));

            if(e.wooTableSorterStatus === 1){
                e.wooTableSorterStatus = 2;
                this.localDataSource = localDataSource.sort((f, l)=>{
                    return strToLength(f[e.sorter])- strToLength(l[e.sorter]);
                });
            }else
            if(e.wooTableSorterStatus === 2){
                e.wooTableSorterStatus = 3;
                this.localDataSource = localDataSource.sort((f, l)=>{
                    return strToLength(l[e.sorter]) - strToLength(f[e.sorter]);
                });

            }else
            if(e.wooTableSorterStatus === 3){
                e.wooTableSorterStatus = 1;
                this.localDataSource = localDataSource;
            }
        },
        filterDataSourceByPage(){
            if((this.pagination.total > this.initialDataSource.length) && this.pagination.size === this.initialDataSource.length){
                this.localDataSource = JSON.parse(JSON.stringify(this.initialDataSource));
            }else{
                if(this.pagination){
                    this.localDataSource =  JSON.parse(JSON.stringify(this.initialDataSource)).slice((this.pagination.current-1) * this.pagination.size, this.pagination.current * this.pagination.size);
                }else{
                    this.localDataSource = JSON.parse(JSON.stringify(this.initialDataSource));
                }
            }
            this.isHeaderChecked =  false;
            this.checkedMap = {};
        }
    },
    mounted() {
        const tableGroupNode = this.$refs["woo-table-group"];

        if (tableGroupNode.scrollLeft > 0) {
            tableGroupNode.classList.add("woo-table-group-fixed-start");
        }
        if (tableGroupNode.scrollLeft <= 0) {
            tableGroupNode.classList.remove("woo-table-group-fixed-start");
        }
        if (tableGroupNode.scrollWidth - tableGroupNode.scrollLeft - tableGroupNode.offsetWidth) {
            tableGroupNode.classList.add("woo-table-group-fixed-end");
        }
        if (tableGroupNode.scrollWidth - tableGroupNode.scrollLeft - tableGroupNode.offsetWidth <= 0) {
            tableGroupNode.classList.remove("woo-table-group-fixed-end");
        }
    },
    render: function (h) {
        return h(
            "div",
            {
                class:{
                    "woo-table":true
                }
            },
            [
                h(
                    "div",
                    {
                        class: {
                            "woo-table-group": true,
                            [this.targetClass]: true
                        },
                        style: {
                            maxWidth: this.width?strToNum(this.width)+"px":"",
                            maxHeight: strToNum(this.height)+"px",
                        },
                        ref: "woo-table-group",
                        on: {
                            scroll: (e) => {
                                if (e.target.scrollLeft > 0) {
                                    e.target.classList.add("woo-table-group-fixed-start");
                                }
                                if (e.target.scrollLeft <= 0) {
                                    e.target.classList.remove("woo-table-group-fixed-start");
                                }
                                if (e.target.scrollWidth - e.target.scrollLeft - e.target.offsetWidth) {
                                    e.target.classList.add("woo-table-group-fixed-end");
                                }
                                if (e.target.scrollWidth - e.target.scrollLeft - e.target.offsetWidth <= 1) {
                                    e.target.classList.remove("woo-table-group-fixed-end");
                                }
                            }
                        }
                    },
                    [
                        h(
                            "div",
                            {
                                class: {
                                    "woo-table-header": true
                                }
                            },
                            [
                                h(
                                    "table",
                                    {
                                        class: {
                                            "woo-table": true
                                        },
                                        attrs: {
                                            cellspacing: 0,
                                            cellpadding: 0,
                                            border: 0
                                        }
                                    },
                                    [
                                        h(
                                            "w-table-colgroup",
                                            {
                                                attrs:{
                                                    columns:this.columnsLayout.colgroup
                                                }
                                            }
                                        ),
                                        h(
                                            "WTableHeaderTr",
                                            {
                                                attrs:{
                                                    tableTrGroup:this.columnsLayout.tableTrGroup,
                                                    rowKey: this.rowKey,
                                                    selection:this.selection,
                                                    isHeaderChecked:this.isHeaderChecked
                                                }
                                            }
                                        )
                                    ]
                                )
                            ]
                        ),
                        h(
                            "div",
                            {
                                class: {
                                    "woo-table-body": true
                                }
                            },
                            [
                                h(
                                    "table",
                                    {
                                        class: {
                                            "woo-table": true
                                        },
                                        attrs: {
                                            cellspacing: 0,
                                            cellpadding: 0,
                                            border: 0
                                        }
                                    },
                                    [
                                        h(
                                            "w-table-colgroup",
                                            {
                                                attrs:{
                                                    columns:this.columnsLayout.colgroup
                                                }
                                            }
                                        ),
                                        h(
                                            "WTableBodyGroup",
                                            {
                                                attrs:{
                                                    dataSource:this.localDataSource,
                                                    columns:this.columnsLayout.colgroup,
                                                    rowKey: this.rowKey,
                                                    selection:this.selection
                                                }
                                            }
                                        )
                                    ]
                                )
                            ]
                        )
                    ]
                ),
                this.pagination?h(
                    "WPage",
                    {
                        on:{
                            change:(e)=>{
                                this.filterDataSourceByPage();
                                this.$emit("pageChange", e);
                            }
                        },
                        attrs: {
                            pagination: this.pagination
                        }
                    }
                ):[]
            ]
        );
    }
};
