import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'

// 文章分类列表查询
export const articleCategoryListService = ()=>{
    // const tokenStore = useTokenStore()

    // // 在pinia中定义的响应式对象，都不需要value，可直接使用
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')

}

// 文章分类添加
export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category',categoryData)
}