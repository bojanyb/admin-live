<script>
import moment from "moment";
export default {
  props: ["row"],
  data() {
    return {
      formData: {
        slumber_time: this.row?.slumber_time || 1,
        push_time_range: [
          moment(
            `1970-01-01 ${this.row?.push_start_time || "00:00:00"}`
          ).toDate(),
          moment(
            `1970-01-01 ${this.row?.push_end_time || "23:59:59"}`
          ).toDate(),
        ],
        push_nums: this.row?.push_nums || 1,
        push_time_interval: this.row?.push_time_interval || 10,
      },
      rules: {
        slumber_time: [{ required: true, message: "请输入沉睡时间" }],
        push_time_range: [{ required: true, message: "请输入推送时间" }],
        push_nums: [{ required: true, message: "请输入推送次数" }],
        push_time_interval: [{ required: true, message: "请输入推送间隔" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = {
            id: this.row?.id || undefined,
            slumber_time: this.formData.slumber_time,
            push_nums: this.formData.push_nums,
            push_time_interval: this.formData.push_time_interval,
            push_start_time: moment(
              _.get(this.formData, "push_time_range[0]")
            ).format("HH:mm:ss"),
            push_end_time: moment(
              _.get(this.formData, "push_time_range[1]")
            ).format("HH:mm:ss"),
          };
          this.$emit("submit", data);
        }
      });
    },
  },
};
</script>
<template>
  <el-form ref="form" :rules="rules" :model="formData" label-width="80px">
    <el-form-item label="沉睡时间" prop="slumber_time">
      <el-input-number
        v-model="formData.slumber_time"
        :precision="0"
        :min="1"
        controls-position="right"
      >
      </el-input-number>
      小时
    </el-form-item>

    <el-form-item label="推送时间" prop="push_time_range">
      <el-time-picker
        is-range
        v-model="formData.push_time_range"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      >
      </el-time-picker>
    </el-form-item>

    <el-form-item label="推送次数" prop="push_nums">
      <el-input-number
        v-model="formData.push_nums"
        :precision="0"
        :min="1"
        controls-position="right"
      >
      </el-input-number>
      次
    </el-form-item>

    <el-form-item label="推送间隔" prop="push_time_interval">
      <el-input-number
        v-model="formData.push_time_interval"
        :precision="0"
        :min="1"
        controls-position="right"
      >
      </el-input-number>
      分钟
    </el-form-item>

    <el-form-item>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>
