<template>
  <div>
      <login-layout v-if="page=='login'"/>
      <register-layout v-if="page=='register'"/>
  </div>
</template>
<style>
.login-text {
  color: #d5d5d5 !important;
}
.login-layout > * {
  background: #2e2f30 !important;
}
#login-footer {
  font-size: 90%;
}
#logo {
  font-size: 150%;
  color: white;
  margin-bottom: 16px;
}
#vers {
  font-size: 80%;
  color: white;
}
</style>
<script>
import LoginLayout from './LoginPage/loginLayout.vue'
import RegisterLayout from './LoginPage/registerLayout.vue'

export default {
  components: { LoginLayout, RegisterLayout },
  data: () => ({
    
  }),
  computed:{
    page:function(){
      return this.$store.state.login.loginPage;
    }
  },
  methods:{

  }
}
</script>