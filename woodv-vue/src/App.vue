<template>
  <div id="app">
    <div class="form">
      <w-input v-model="value" placeholder="Input" @appendClick="appendClick" @prependClick="prependClick" @change="change" @search="search">
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
        <w-btn type="danger" disabled  @click="search">
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
        <w-btn icon link @click="search">
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
        <w-checkbox-group disabled color="pink" v-model="checkboxGroup" @change="checkboxGroupChange">
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
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      value:"",
      checkbox:false,
      checkboxGroup:[1]
    }
  },
  watch:{
    value(value){
      console.log(value,99999)
    }
  },
  methods:{
    change(e){
      console.log(e,this.value,9527)
    },
    search(e){
      console.log("search",e)
    },
    appendClick(e){
      console.log(e,"appendClick")
    },
    prependClick(e){
      console.log(e,"prependClick")
    },
    checkboxChange(e){
      console.log(e,"checkbox")
      this.checkboxGroup = [1,2,3]
    },
    checkboxGroupChange(e){
      console.log(e,"checkboxGroup")
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
.form{
  width: 1200px;
  margin: 0 auto;
}
  .btn{
    margin-top: 12px;
  }
  .btn>*{
    margin-top: 12px;
  }
  .checkbox{
    margin-top: 12px;
  }
</style>
