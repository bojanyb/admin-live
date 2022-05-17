<script>
  export default {
    props: {
      renderContent: Function,
      scope: Object,
      prop: String
    },
    render (h) {
      const prop = this.prop;
      const scope = this.scope;
      return this.renderContent ? this.renderContent.call(this._renderProxy, h, { row: scope.row }) : h('span', scope.row[prop]);
    }
  };
</script>
