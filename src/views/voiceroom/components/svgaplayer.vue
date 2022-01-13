<template>
  <div id="demoCanvas" ref="canvas" :style="{width: width,height:height}" class="svga" />
</template>
<script>
import SVGA from 'svgaplayerweb'
export default {
  name: 'Svgaplayer',
  props: {
    showImg: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 178
    },
    width: {
      type: Number,
      default: 178
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    var mycanvas = document.getElementById('demoCanvas')
    this.$nextTick(res => {
      mycanvas.style.width = this.width + 'px'
      mycanvas.style.height = this.height + 'px'
      var player = new SVGA.Player('#demoCanvas')
      var parser = new SVGA.Parser('#demoCanvas')
      parser.load(this.showImg, function(videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
    })
  }
}
</script>
<style>
	#demoCanvas {
		margin: auto;
		padding-bottom: 1rem;
	}

	.svga {
		width: 100%;
		height: 100%;
	}
</style>
