<template>
    <div class="share-gift-box">
        <div class="giftAllocation">
            <zItem ref="zItem" :gifts="gifts" @deleteData="deleteData"></zItem>
            
        </div>

        <el-drawer title="礼物库" :visible.sync="drawer" :direction="direction" :before-close="handleClose" @closed="isDestroyComp = false">
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
								@click="handleSelect(scope.row)">使用{{scope.row.isSelect}}</el-button>
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

// 礼物组件
import zItem from './item/index.vue'
// 分页
import Pagination from '@/components/Pagination'

import { getActivetyGiftSource, getActivetyHasGiftList } from '@/api/videoRoom'
export default {
    components: {
        zItem,
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
            popForm: {
                'activity_type_id': "",
                'type': '',
                'start_time': 0,
                'end_time': 0,
                'start_timeText': '',
                'end_timeText': '',
                "gifts": [],
                "cost": 0,
                'typeName': 'Add'
            },
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
        handleClose(done) {
            this.$confirm('确认关闭礼物库？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        giftList() {
            var params = {
                'page': this.giftPage.page,
                'pagesize': this.giftPage.limit
            }
            this.giftListArr = [];
            getActivetyGiftSource(params).then(res => {
                this.giftTotal = res.data.count;

                res.data.list.map(re=>{
                    switch (re.gift_genre) {
                        case 1:
                        re.gift_genreText = '基本礼物'
                            break;
                        case 2:
                        re.gift_genreText = '抽奖礼物'
                            break;
                        case 3:
                        re.gift_genreText = '抽奖包裹内礼物'
                            break;
                        case 4:
                        re.gift_genreText = '普通礼物'
                            break;
                        case 5:
                        re.gift_genreText = '免费礼物'
                            break;
                        case 6:
                        re.gift_genreText = '动效礼物'
                            break;
                        case 7:
                        re.gift_genreText = '全屏礼物'
                            break;
                    }
                })
                this.giftListArr = res.data.list;
                this.giftSelectSource();
            }).catch(err => {})
        },
        handleSelect(row) {

            console.log(row, 'row-------------')
            let currentGift = {};
            this.giftListArr.map(res => {
                if (res.id == row.id) {
                    res.isSelect = true; // 默认当前礼物未被选中
                    // currentGift.activity_type_id = parseInt(row.id);
                    currentGift.id = row.id;
                    currentGift.activity_id = row.id;
                    currentGift.gift_name = row.gift_name;
                    currentGift.gift_photo = row.gift_photo;
                    currentGift.gift_diamond = row.gift_diamond;
                    currentGift.type = 1
                    currentGift.time_limit = 0
                    currentGift.status = 0 // 0可用1不可用
                    currentGift.inventory = 0
                    currentGift.probability = 0
                    this.popForm.gifts.push(currentGift)


                    this.gifts.push(row)
                }
            })
            
            this.popForm.gifts = JSON.parse(JSON.stringify(this.popForm.gifts));
            
            /* 多条勾选打印结算单会出现重复的结算单号 去重处理 */
            this.popForm.gifts = new Set(this.popForm.gifts);
            this.popForm.gifts = Array.from(this.popForm.gifts);
        },
        deleteData({ row, index }) {
            this.giftListArr.map(item => {
                if(item.id == row.id) {
                    console.log(item.isSelect, 'isSelect---------')
                    item.isSelect = false
                    // this.$set(item, 'isSelect', false)
                    // this.$forceUpdate();
                }
            })

            console.log(this.giftListArr, 'giftListArr--------')
            this.gifts.splice(index, 1)


            this.$forceUpdate();
        },
        handleAddGiftShow() {
            this.giftSelectSource();
            this.drawer = true
        },
        giftSelectSource() {
            this.giftListArr.map(re => {
                re.isSelect = false; // 默认当前礼物未被选中
                if (this.popForm.gifts.length > 0) {
                    this.popForm.gifts.map(item => {
                        if (item.id == re.id || item.id == re.id) {
                            re.isSelect = true;
                        }
                    })
                }
            })
        },
        handleDelSelect(row) {
            if (row.typeName == "Del") { // 删除礼物库中选中的礼物
                this.popForm.gifts.map((res, i) => {
                    if (res.activity_id == row.activity_id) {
                        this.popForm.gifts.splice(i, 1);
                    }
                })
                
                this.giftListArr.map(res => {
                    if (res.activity_id == row.activity_id) {
                        res.isSelect = false;
                    }
                })
                
            } else if (row.typeName == "inventoryAdd") { // 更新礼物库存
                this.activetyHasGiftList(row.activity_id);
            } else if(row.typeName == "Probability"){ // 监听概率
                this.probabilityMaxNum = row.probabilityMaxNum;
                this.smallSumNum = row.smallSumNum;
                this.maxSamllSum = row.maxSamllSum;
            }
        },
        activetyHasGiftList(id) {
            var params = {
                "activity_id": id
            }
            getActivetyHasGiftList(params).then(res => {
                res.data.list.map(re => {
                    re.probability = re.probability / 100000
                })
                this.popForm.gifts = res.data.list;
                this.$forceUpdate();
            }).catch(err => {})
        },
    },
    mounted() {
        this.giftList()
    }
}
</script>

<style lang="scss" scoped>
.share-gift-box {

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
