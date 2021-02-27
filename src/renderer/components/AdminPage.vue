<template>
<div>{{currentPage}}</div>
    
</template>
<script>
export default {
    data:()=>({
        currentPage:'',
    }),
    mounted:function(){
      if(this.$route.name=='admin'){
          this.currentPage=this.$route.query.type;
      }
    },
    watch: {
    $route(to, from) {
      if(to.name=='admin'){
          this.currentPage=to.query.type;
      }
    }
  },
}
</script>