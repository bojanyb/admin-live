<template>
    <div class="share-gift-drawer-Box">
        <el-drawer title="礼物库" :visible="drawer" :direction="direction" :before-close="handleClose">
			<div class="giftListBox">
				<el-table ref="giftTable" v-loading="giftLoading" :data="giftListArr" element-loading-text="拼命加载中"
					border fit highlight-current-row>
					<el-table-column label="礼物名称" prop="gift_name" align="center" show-overflow-tooltip />
					<el-table-column label="礼物图片" prop="gift_genre" align="center">
						<template slot-scope="scope">
							<el-image style="width: 50px; " :lazy="true"
								:src="scope.row.gift_photo ? scope.row.gift_photo : ''" />
						</template>
					</el-table-column>
					<el-table-column label="礼物类型" prop="gift_genreText" align="center" />
					<el-table-column label="钻石价格" prop="gift_diamond" align="center" />
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="primary" v-if="scope.row.isSelect == false"
								@click="handleSelect(scope.row)">使用</el-button>
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

export default {
    components: {
        Pagination
    },
    props: {
        list: {
            type: Array,
            default: []
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
            isDestroyComp: false, // 是否销毁组件
            status: 'add' // 当前是新增/修改
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
        }
    },
    methods: {
        // 关闭礼物库 - 需确认
        handleClose(done) {
            this.$confirm('确认关闭礼物库？')
                .then(_ => {
                    // done();
                    this.drawer = false
                })
                .catch(_ => {});
        },
        // 选中礼物
        handleSelect(row) {
            this.giftListArr.map(res => {
                if (res.id == row.id) {
                    res.isSelect = true; // 默认当前礼物未被选中
                    this.gifts.push(row)
                }
            })
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
        },
    },
    
}
</script>

<style lang="scss">
.share-gift-drawer-Box {
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
