// 富文本组件
<template>
    <div class="vue-quill-editor-box">
        <quill-editor
            v-model="value"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange"
            @ready="onEditorReady($event)">
        </quill-editor>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    props: {
        validateFieldName: { // 需要重置验证的名称
            type: String,
            default: ''
        },
        value: { // 数据
            type: String,
            default: ''
        }
    },
    components: {
        quillEditor
    },
    data() {
        return {
            content: '',
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                        ['blockquote', 'code-block'], // 引用  代码块
                        [{ header: 1 }, { header: 2 }], // 1、2 级标题
                        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                        [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                        [{ indent: '-1' }, { indent: '+1' }], // 缩进
                        [{ direction: 'rtl' }], // 文本方向
                        [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
                        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                        // [{ font: ['songti'] }], // 字体种类
                        [{ align: [] }], // 对齐方式
                        ['clean'], // 清除文本格式
                        ['image', 'video'] // 链接、图片、视频
                    ]
                },
                placeholder: ''
            },
        };
    },
    methods: {
        // 更改数据
        onEditorChange(v) {
            console.log(v, 'v-----------1010')
            if(v && v.html) {
                this.$emit('input', v.html)
                this.$emit('validateField', this.validateFieldName)
            }
        },
        // 移出光标
        onEditorBlur() {},
        // 移入光标
        onEditorFocus() {},
        onEditorReady() {}
    }
}
</script>

<style lang="scss">
.vue-quill-editor-box {

    .quill-editor {
        .ql-toolbar {
            display: none;
        }
        .ql-container {
            border-radius: 4px;
        }
        .ql-container.ql-snow {
            border-top: 1px solid #DCDFE6 !important;
            .ql-editor {
                min-height: 150px;
            }
        }
    }
    // 这个是字号数字对应的显示的内容，vertical-align根据个人需要加不加，因为我页面那个字与其他对不齐
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12"]::before {
        content: '12px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14"]::before {
        content: '14px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16"]::before {
        content: '16px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18"]::before {
        content: '18px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20"]::before {
        content: '20px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="22"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22"]::before {
        content: '22px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24"]::before {
        content: '24px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28"]::before {
        content: '28px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32"]::before {
        content: '32px';
        vertical-align: top;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36"]::before {
        content: '36px';
        vertical-align: top;
    }
    
    
    
    // 这个是字号数字对应的px值
    .ql-editor .ql-size-12 {
        font-size: 12px;
    }
    .ql-editor .ql-size-14 {
        font-size: 14px;
    }
    .ql-editor .ql-size-16 {
        font-size: 16px;
    }
    .ql-editor .ql-size-18 {
        font-size: 18px;
    }
    .ql-editor .ql-size-20 {
        font-size: 20px;
    }
    .ql-editor .ql-size-22 {
        font-size: 22px;
    }
    .ql-editor .ql-size-24 {
        font-size: 24px;
    }
    .ql-editor .ql-size-28 {
        font-size: 28px;
    }
    .ql-editor .ql-size-32 {
        font-size: 32px;
    }
    .ql-editor .ql-size-36 {
        font-size: 36px;
    }
    
    // 选择字号富文本字的大小
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12"]::before {
        font-size: 12px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14"]::before {
        font-size: 14px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16"]::before {
        font-size: 16px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18"]::before {
        font-size: 18px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20"]::before {
        font-size: 20px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22"]::before {
        font-size: 22px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24"]::before {
        font-size: 24px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28"]::before {
        font-size: 28px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32"]::before {
        font-size: 32px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36"]::before {
        font-size: 36px;
    }

    /*加上height和滚动属性就可以，滚动条样式是系统默认样式，可能不同*/
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        border-color: #ccc;
        height: 125px;
        overflow: auto;
    }
}
</style>