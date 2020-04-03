<template>
  <footer>
      <div class="footer_content">
          {{$t("footer.title")}}
      </div>
      
  </footer>
</template>
<style lang="scss">
    footer{
        border-top:1px solid #ddd;
        flex: 0 0 auto;
        .footer_content{
            width: 340px;
            margin: 0 auto;
            text-align: center;
            line-height: 60px;
            height: 60px;
            color:#606266;
            .qq{
                font-size: 9px;
            }
        }
    }
</style>

