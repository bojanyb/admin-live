import { mapState } from 'vuex'
const mixins = {
    data() {
        return {
            tabIndex: '0', // 菜单下标
            page: 1, // 分页
            size: 10, // 页码
            limit: 10, // 页码
            searchParams: {}, // form表单参数
            dataParams: {}, // 时间参数
        };
    },
  computed: {
    ...mapState({
      curBtnArr: state => state.permission.curBtnArr,
      cachedViews: state => state.tagsView.cachedViews
    }),
  },
  mounted() {
    const { fullPath, name } = this.$route;
    if (this.cachedViews.includes(name)) {
      this.$store.commit('permission/SET_CUR_BTN', fullPath)
      console.log(this.curBtnArr, 'curBtnArr');
    }

    console.log(fullPath, this.cachedViews, 'fullPath');
  },
}

export default mixins
