<template>
    <div class="share-goodsBank-box">
        <el-drawer :append-to-body="true" title="礼物库" :visible.sync="drawer" :direction="direction" :before-close="handleClose" @closed="closed">
			<div class="giftListBox">
				<el-table ref="giftTable" v-loading="giftLoading" :data="giftListArr" element-loading-text="拼命加载中"
					border fit highlight-current-row>
					<el-table-column label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
					<el-table-column label="商品图片" prop="gift_genre" align="center" style="display:flex;justify-content: center;">
						<template slot-scope="scope">
							<div class="imgStyle" style="display:flex;justify-content:center;">
                                <el-image style="height: 50px; " v-if="scope.row.goods_image"
								:src="scope.row.goods_image" />
                                <svgComp v-if="scope.row.goods_animation_path" ref="svgComp" :src="scope.row.goods_animation_path" :styleObj="{ height: '50px' }"></svgComp>
                            </div>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="primary" v-if="scope.row.isSelect == false"
								@click.once="handleSelect(scope.row)">使用</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!--工具条-->
				<pagination v-show="giftTotal>0" :total="giftTotal" :page.sync="giftPage.page"
					:limit.sync="giftPage.limit" @pagination="giftList" />
			</div>
		</el-drawer>
    </div>
</template>

<script>
// 分页
import Pagination from '@/components/Pagination'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { goodsList } from '@/api/shopping'
// 引入svg组件
import svgComp from '@/components/svgComp/index.vue'

export default {
    components: {
        Pagination,
        svgComp
    },
    props: {
        list: {
            type: Array,
            default: []
        },
        activityType: { // 活动类型
            type: String,
            default: ''
        },
        status: { // 当前状态
            type: String,
            default: ''
        }
    },
    data() {
        return {
            drawer: false,
            direction: 'rtl',
            giftLoading: false,
            giftListArr: [],
            giftPage: {
                page: 1,
                limit: 10
            },
            giftTotal: 0,
            giftTypeList: MAPDATA.GIFTTYPE, // 礼物列表
            isDestroyComp: false, // 是否销毁组件
            activityList: MAPDATA.ACTIVITYLIST // 活动列表
        };
    },
    computed: {
        gifts: {
            get() {
                return this.list
            },
            set(v) {
                return this.$emit('update: list', v)
            }
        },
        
    },
    watch: {
        status: {
            handler(newVal, oldVal) {
                this.giftPage.page = 1
                this.giftList()
            },
            deep: true
        }
    },
    methods: {
        // 获取所有礼物
        giftList() {
            var params = {
                'page': this.giftPage.page,
            }
            this.giftListArr = [];
            goodsList(params).then(res => {
                this.giftTotal = res.data.count;
            
                // res.data.list.map(re=>{
                //     let params = this.giftTypeList.find(item => { return re.gift_genre === item.value })
                //     re.gift_genreText = params.name
                // })
                this.giftListArr = res.data.list;
                this.giftSelectSource();
                console.log(res, 'res------------')
            }).catch(err => {})
        },
        // 删除礼物
        deleteData({ row, index }) {
            this.giftListArr.forEach(item => {
                if(item.id === row.id) {
                    item.isSelect = false
                }
            })
        },
        // 关闭礼物库 - 需确认
        handleClose(done) {
            this.$confirm('确认关闭礼物库？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        // 选中礼物
        handleSelect(row) {
            // let params = this.activityList.find(item => { return item.name === this.activityType })
            // let num = this.gifts.length
            // if((num + 1) > params.max) {
            //     this.$message.error('当前活动已超过添加最大礼物数量')
            //     return false
            // }
            if(this.gifts.length < 1) {
                this.giftListArr.map(res => {
                    if (res.id == row.id) {
                        res.isSelect = true; // 当前礼物被选中
                        this.gifts.push(row)
                    }
                })
            } else {
                this.$message.error('最多只能赠送一个商品')
            }
            // this.$set(row, 'type', 1)
            this.$emit('validateField')
            
        },
        // 数据初始化 - 未选中
        giftSelectSource() {
            this.giftListArr.map(re => {
                re.isSelect = false; // 默认当前礼物未被选中
                if (this.gifts.length > 0) {
                    this.gifts.map(item => {
                        if (item.id == re.id || item.id == re.id) {
                            re.isSelect = true;
                        }
                    })
                }
            })
            this.$forceUpdate()
        },
        // 销毁组件
        closed() {
            this.$emit('distoryComp')
        }
    }
}
</script>

<style lang="scss">
.share-goodsBank-box {
    .imgStyle {
        display: flex !important;
        justify-content: center !important;
    }
    ::v-deep .el-drawer {
		width: 35% !important;
        padding-bottom: 100px;
        box-sizing: border-box;
		.giftListBox {
			width: 100%;
            
			.el-table {
				width: 90%;
				margin: auto;
			}
		}
	}
}
</style>