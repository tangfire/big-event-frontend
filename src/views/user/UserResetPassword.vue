<script setup>
import { ref } from "vue";
const passwordInfo = ref({
  old_pwd: "",
  new_pwd: "",
  re_pwd: "",
});

// 校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入新密码"));
  } else if (value != passwordInfo.value.new_pwd) {
    callback(new Error("请确保两次输入的密码一样"));
  } else {
    callback();
  }
};

// 定义表单校验规则
const rules = {
  old_pwd: [
    { required: true, message: "请输入原密码", trigger: "blur" },
    { min: 5, max: 16, message: "长度为5~16位非空字符", trigger: "blur" },
  ],
  new_pwd: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 5, max: 16, message: "长度为5~16位非空字符", trigger: "blur" },
  ],
  re_pwd: [{ required: true, validator: checkRePassword, trigger: "blur" }],
};

import { userUpdatePasswordService } from "@/api/user.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import useUserInfoStore from "@/stores/userInfo.js";
import { useTokenStore } from "@/stores/token.js";
const tokenStore = useTokenStore();

const userInfoStore = useUserInfoStore();
const router = useRouter();
const userUpdatePassword = async () => {
  let result = await userUpdatePasswordService(passwordInfo.value);

  // 1. 清空pinia中存储的token以及个人信息
  tokenStore.removeToken();
  userInfoStore.removeInfo();

  // 2.跳转到登录页面
  router.push("/login");

  ElMessage.success(
    result.msg ? result.msg + ",请重新登录" : "密码修改成功,请重新登录"
  );
};
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>重置密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form
          :model="passwordInfo"
          :rules="rules"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="passwordInfo.old_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="passwordInfo.new_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="passwordInfo.re_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userUpdatePassword"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>