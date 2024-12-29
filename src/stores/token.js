// 定义store
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 1 param: 名字，唯一性
 * 2 param: 函数，函数的内部可以定义状态的所有内容
 * 
 * return js对象
 */

export const useTokenStore = defineStore('token',()=>{
    // 定义状态的内容

    const token = ref('')

    const setToken = (newToken)=>{
        token.value = newToken
    }

    const removeToken = ()=>{
        token.value = ''
    }

    return {
        token,setToken,removeToken
    }
},{
    persist: true // 持久化存储
})
