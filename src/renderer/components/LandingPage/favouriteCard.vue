<template>
    <a-card
          :bordered="false"
          size="small"
          style="width: 100%; height: 115px"
        >
          <div slot="title">
            <!--<a-badge dot>-->
            <a-icon type="heart" />
            快捷操作
            <!--</a-badge>-->
          </div>
          <div id="features" style="display: flex; align-items: center">
            <a><a-icon type="usergroup-add" />发起会议</a>
            <a><a-icon type="desktop" />投屏</a>
            <a><a-icon type="search" />搜索</a>
          </div>
        </a-card>
</template>
<style>
#features {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 60px;
}
#features > a {
  padding: 10px;
}
</style>