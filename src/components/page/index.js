import WIcon from "../icon";
export default {
    name:"WPage",
    data(){
        return {
            isNext:false,
            isPre:true,
            totalCurrent:0
        };
    },
    components:{
        WIcon
    },
    props:{
        pagination:{
            type: Object,
            required: false,
            default: ()=>{
                return {
                    size:10,
                    current:1,
                    options: ["10", "20", "30"],
                    total: 0
                };
            }
        }
    },
    watch:{
        "pagination.current"(){
            this.isPre = this.pagination.current <= 1;
            this.isNext = this.pagination.current >= this.totalCurrent;
        }
    },
    render:function (h) {
        const pageMedian = 6;
        const totalRemainder = this.pagination.total % this.pagination.size;
        let totalCurrent =parseInt(this.pagination.total / this.pagination.size);

        if(totalRemainder){
            totalCurrent =  parseInt(this.pagination.total / this.pagination.size)+1;
        }
        this.totalCurrent = totalCurrent;

        const pageItems = [];
        const pageLayoutList = [];

        if(totalCurrent <= pageMedian){
            for(let i=0;i<totalCurrent;i++){
                pageItems.push(h(
                    "div",
                    {
                        class: {
                            "woo-table-page-item":true,
                            "woo-table-page-item-active":i+1 === this.pagination.current
                        },
                        on:{
                            click:()=>{
                                if(this.pagination.current === i+1){
                                    return;
                                }
                                this.pagination.current = i+1;
                                this.isPre = this.pagination.current <= 1;
                                this.isNext = this.pagination.current >= totalCurrent;
                                this.$emit("change", this.pagination.current);
                            }
                        },
                    },
                    i+1
                ));
            }
        }else{
            if(this.pagination.current < pageMedian){
                pageLayoutList.push(
                    ...Array.from(Array(pageMedian).keys()).map(item=>item+1),
                    "nextMore",
                    totalCurrent
                );
            }
            if(this.pagination.current >= pageMedian){
                if(totalCurrent - this.pagination.current >=pageMedian){
                    pageLayoutList.push(
                        1,
                        "preMore",
                        ...Array.from(Array(pageMedian-1).keys()).map(item=>item+this.pagination.current-2),
                        "nextMore",
                        totalCurrent
                    );
                }else{
                    pageLayoutList.push(
                        1,
                        "preMore",
                        ...Array.from(Array(pageMedian).keys()).map(item=>totalCurrent - item).reverse()
                    );
                }
            }
            for(const item of pageLayoutList){
                if(typeof item === "number"){
                    pageItems.push(h(
                        "div",
                        {
                            on:{
                                click:()=>{
                                    if(this.pagination.current === item){
                                        return;
                                    }
                                    this.pagination.current = item;
                                    this.$emit("change", this.pagination.current);
                                }
                            },
                            class: {
                                "woo-table-page-item":true,
                                "woo-table-page-item-active":item === this.pagination.current
                            }
                        },
                        item
                    ));
                }else{
                    if(item==="preMore"){
                        pageItems.push(h(
                            "div",
                            {
                                class: {
                                    "woo-table-page-more":true
                                }
                            },
                            [
                                h(
                                    "WIcon",
                                    {
                                        style:{
                                            fontSize:"16px"
                                        },
                                        on:{
                                            click:()=>{
                                                this.pagination.current -=pageMedian-1;
                                                this.$emit("change", this.pagination.current);
                                            },
                                            mouseenter:(e)=>{
                                                e.target.innerText = "keyboard_double_arrow_left";
                                            },
                                            mouseleave:(e)=>{
                                                e.target.innerText = "more_horiz";
                                            }
                                        }
                                    },
                                    "more_horiz"
                                )
                            ]
                        ));
                    }
                    if(item==="nextMore"){
                        pageItems.push(h(
                            "div",
                            {
                                class: {
                                    "woo-table-page-more":true
                                }
                            },
                            [
                                h(
                                    "WIcon",
                                    {
                                        style:{
                                            fontSize:"16px"
                                        },
                                        on:{
                                            click:()=>{
                                                this.pagination.current +=pageMedian-1;
                                                this.$emit("change", this.pagination.current);
                                            },
                                            mouseenter:(e)=>{
                                                e.target.innerText = "keyboard_double_arrow_right";
                                            },
                                            mouseleave:(e)=>{
                                                e.target.innerText = "more_horiz";
                                            }
                                        }
                                    },
                                    "more_horiz"
                                )
                            ]
                        ));
                    }
                }
            }
        }

        return h(
            "div",
            {
                class:{
                    "woo-table-page":true
                }
            },
            [
                h(
                    "div",
                    {
                        class:{
                            "woo-table-page-group":true
                        }
                    },
                    [
                        h(
                            "button",
                            {
                                class:{
                                    "woo-table-page-pre-btn":true,
                                    "woo-table-page-pre-btn-disabled":this.isPre || this.pagination.current <= 1,
                                },
                                attrs:{
                                    disabled: this.isPre || this.pagination.current <= 1,
                                },
                                on:{
                                    click:()=>{
                                        this.pagination.current--;
                                        this.$emit("change", this.pagination.current);
                                    }
                                }
                            },
                            "上一页"
                        ),
                        pageItems,
                        h(
                            "button",
                            {
                                class:{
                                    "woo-table-page-next-btn":true,
                                    "woo-table-page-pre-btn-disabled":this.isNext || this.pagination.current >= totalCurrent,
                                },
                                attrs:{
                                    disabled: this.isNext || this.pagination.current >= totalCurrent
                                },
                                on:{
                                    click:()=>{
                                        this.pagination.current++;
                                        this.$emit("change", this.pagination.current);
                                    }
                                }
                            },
                            "下一页"
                        ),
                    ]
                )
            ]
        );
    }
};
