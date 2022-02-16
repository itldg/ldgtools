<template>
	<div id="app">
		<div id="reg-main">
			<div id="reg-head">
				<div id="reg-flags">
					<label>正则修饰符：</label>
					<div class="mb-3 form-check form-check-inline" v-for="(flag) in reg_flags" v-bind:key="flag.flag" v-show="reg_show_more||!flag.more">
						<input class="form-check-input" type="checkbox" :id="'reg_flag_'+flag.flag" v-model="flag.checked">
						<label class="form-check-label" :for="'reg_flag_'+flag.flag" v-text="flag.name_cn"></label>
					</div>
					<a href="javascript:void(0)" class="btn btn-secondary btn-sm" v-html="reg_show_more?'<i class=\'bi bi-chevron-compact-up\'></i> 收起':'<i class=\'bi bi-chevron-compact-down\'></i> 更多'" @click="reg_show_more=!reg_show_more"></a>
				</div>

				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="regex" placeholder="在此输入正则语句...">
					<button class="btn btn-outline-secondary" type="button" @click="reg_match">匹配</button>
				</div>

			</div>
			<div id="reg-body" class="block block-rounded main-full">
				<ul class="nav nav-tabs nav-tabs-block main-head" id="reg-table" role="tablist">
					<li class="nav-item" role="presentation">
						<button class="nav-link active" data-bs-toggle="tab" data-bs-target="#reg-str" type="button" role="tab">测试文本</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" data-bs-toggle="tab" data-bs-target="#reg-matches" type="button" role="tab">匹配结果[{{reg_matches.length}}]</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" data-bs-toggle="tab" data-bs-target="#reg-replace" type="button" role="tab">内容替换</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" data-bs-toggle="tab" data-bs-target="#reg-make" type="button" role="tab">数据生成</button>
					</li>
				</ul>
				<div class="tab-content main-body">
					<textarea id="reg-str" class="tab-pane fade show active full form-control" role="tabpanel" v-model="reg_text_sour" placeholder="请输入要测试的文本..."></textarea>
					<div class="tab-pane fade main-full" id="reg-matches" role="tabpanel">
						<div class="main-head">
							显示字段：<div class="mb-2 form-check form-check-inline">
								<input class="form-check-input" type="checkbox" id="reg_match_field_index" v-model="reg_match_field.index">
								<label class="form-check-label" for="reg_match_field_index">序号</label>
							</div>
							<div class="mb-2 form-check form-check-inline">
								<input class="form-check-input" type="checkbox" id="reg_match_field_start" v-model="reg_match_field.start">
								<label class="form-check-label" for="reg_match_field_start">开始位置</label>
							</div>
							<div class="mb-2 form-check form-check-inline">
								<input class="form-check-input" type="checkbox" id="reg_match_field_end" v-model="reg_match_field.end">
								<label class="form-check-label" for="reg_match_field_end">结束位置</label>
							</div>
							<div class="mb-2 form-check form-check-inline">
								<input class="form-check-input" type="checkbox" id="reg_match_field_length" v-model="reg_match_field.length">
								<label class="form-check-label" for="reg_match_field_length">长度</label>
							</div>
							<div class="mb-2 form-check form-check-inline" v-for="(field,index) in reg_match_field.matches" v-bind:key="'match_field_'+index">
								<input class="form-check-input" type="checkbox" :id="'reg_match_field_'+index" v-model="reg_match_field.matches[index]">
								<label class="form-check-label" :for="'reg_match_field_'+index">{{index==0?'匹配文本':"子匹配文本"+index}}</label>
							</div>
							<a href="javascript:void(0)" class="btn btn-secondary btn-sm" @click="reg_match_copy">复制</a>
						</div>
						<div class="main-body">
							<table class="table table-container">
								<thead>
									<tr>
										<th scope="col" v-show="reg_match_field.index">序号</th>
										<th scope="col" v-show="reg_match_field.start">开始位置</th>
										<th scope="col" v-show="reg_match_field.end">结束位置</th>
										<th scope="col" v-show="reg_match_field.length">长度</th>
										<th scope="col" v-for="(match,index) in reg_matches[0]" v-bind:key="'match_head_'+index" v-show="reg_match_field.matches[index]">{{index==0?'匹配文本':"子匹配文本"+index}}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="reg_matches.length==0">
										<td colspan="5" style="text-align: center;">尚未进行匹配</td>
									</tr>
									<tr v-for="(match,index) in reg_matches" v-bind:key="'match_'+match.index">
										<td scope="row" v-show="reg_match_field.index">{{index+1}}</td>
										<td scope="row" v-show="reg_match_field.start">{{match.index}}</td>
										<td scope="row" v-show="reg_match_field.end">{{match.end}}</td>
										<td scope="row" v-show="reg_match_field.length">{{match[0].length}}</td>
										<td v-for="(group,group_index) in match" v-bind:key="'group_'+group_index" v-show="reg_match_field.matches[group_index]">{{group}}</td>
									</tr>

								</tbody>
							</table>
						</div>

					</div>
					<div class="tab-pane fade main-full" id="reg-replace" role="tabpanel">
						<div class="input-group mb-3 main-head">
							<input type="text" class="form-control" v-model="reg_replace_txt" placeholder="要替换为..." title="$n - 第n组匹配内容
$&amp; - 完整匹配内容
$` - 匹配前的内容
$' - 匹配后的内容
$$ - '$' 字符">
							<button class="btn btn-outline-secondary" type="button" @click="reg_replace">替换</button>
							<button class="btn btn-outline-secondary" type="button" @click="reg_replace_copy">复制结果</button>

						</div>
						<textarea class="form-control main-body" v-model="reg_replace_result" placeholder="此处展示替换结果"></textarea>
					</div>
					<div class="tab-pane fade main-full" id="reg-make" role="tabpanel">
						<div class="input-group mb-3 main-head">
							<input type="text" class="form-control" v-model="reg_make_text" placeholder="要生成的格式..." title="{ {变量名} } ,html标签，可以写vue语法
index - 第n个匹配，从0开始
item - 匹配信息
item.start - 字符开始索引
item.end - 字符结束索引
item.len - 匹配字符长度
item[0] - 匹配内容
item[n] - 子匹配内容">
							<button class="btn btn-outline-secondary" type="button" @click="reg_make">生成</button>
							<button class="btn btn-outline-secondary" type="button" @click="reg_make_copy">复制文本</button>
							<button class="btn btn-outline-secondary" type="button" @click="reg_make_copy_html">复制HTML</button>

						</div>
						<!-- <textarea class="form-control" v-model="" placeholder=""></textarea> -->
						<!-- <div ref="reg_make_result">此处展示替换结果</div> -->
						<RegMakeResult ref="reg_make_result" :matches="reg_matches" :tpl="reg_make_text" class="main-body" />
					</div>

				</div>
			</div>
		</div>
		<!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
	</div>
</template>

<script type="text/ecmascript-6">
	// import Vue from 'vue'
	const { dialog } = require('electron').remote

	const remote = require('electron');

	import RegMakeResult from './components/RegMakeResult'
	import 'bootstrap/dist/css/bootstrap.css'
	import 'bootstrap/dist/js/bootstrap.bundle'
	import 'bootstrap-icons/font/bootstrap-icons.css'
	const _CodeMirror = require('codemirror');
	// 核心样式
	import 'codemirror/lib/codemirror.css'
	// 引入主题后还需要在 options 中指定主题才会生效
	import 'codemirror/theme/dracula.css'

	import 'codemirror/addon/hint/show-hint.css';
	require('codemirror/addon/edit/matchbrackets');
	require('codemirror/addon/selection/active-line');


	// 需要引入具体的语法高亮库才会有对应的语法高亮效果
	// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
	// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
	import 'codemirror/mode/javascript/javascript.js'
	import 'codemirror/mode/css/css.js'
	import 'codemirror/mode/xml/xml.js'
	import 'codemirror/mode/clike/clike.js'
	import 'codemirror/mode/markdown/markdown.js'
	import 'codemirror/mode/python/python.js'
	import 'codemirror/mode/r/r.js'
	import 'codemirror/mode/shell/shell.js'
	import 'codemirror/mode/sql/sql.js'
	import 'codemirror/mode/swift/swift.js'
	import 'codemirror/mode/vue/vue.js'


	// 尝试获取全局实例
	const CodeMirror = window.CodeMirror || _CodeMirror

	export default {
		name: 'App',
		components: {
			RegMakeResult
		}, data: () => {
			return {
				regex: '(\\d)',
				reg_text_sour: '123456789',
				reg_replace_txt: '',
				reg_replace_result: '',
				reg_make_text: '{{index}} {{index*2}} {{item[0]}}<br>',
				reg_make_result: '',
				reg_show_more: false,
				reg_matches: [],
				reg_flags: [

					{
						flag: 'm',
						name_en: 'multi line',
						name_cn: '多行模式',
						description: '此模式下^和$可以分别匹配行首和行尾',
						checked: true
					},
					{
						flag: 'i',
						name_en: 'insensitive',
						name_cn: '不区分大小写',
						description: '此模式字母不区分大小写'
					},
					{
						flag: 'x',
						name_en: 'extended',
						name_cn: '忽略空白字符',
						description: '可以多行书写，并使用#进行注释说明'
					},
					{
						flag: 's',
						name_en: 'single line',
						name_cn: '单行模式',
						description: '此模式下.能匹配任意字符，包括换行符'
					},
					{
						flag: 'g',
						name_en: 'global',
						name_cn: '全局匹配',
						description: '匹配全部可匹配结果',
						checked: true
					},
					{
						flag: 'u',
						name_en: 'unicode',
						name_cn: 'unicode模式',
						description: 'unicode模式字符串被当成UTF-8',
						more: true
					},
					{
						flag: 'U',
						name_en: 'Ungreedy',
						name_cn: 'Ungreedy',
						description: '使量词默认为非贪婪模式',
						more: true
					}, {
						flag: 'A',
						name_en: 'Anchored',
						name_cn: 'Anchored',
						description: 'Anchor to start of pattern, or at the end of the most recent match',
						more: true
					}, {
						flag: 'J',
						name_en: 'Jchanged',
						name_cn: 'Jchanged',
						description: '允许子模式重复命名，如：(?&lt;name&gt;N1)(?&lt;name&gt;N2)',
						more: true

					}, {
						flag: 'D',
						name_en: 'Dollar end only',
						name_cn: 'ollar end only',
						description: '$字符仅匹配目标字符串的结尾；没有此选项时，如果最后一个字符是换行符的话$字符也能匹配。',
						more: true
					},

				],
				reg_match_field: { index: true, start: false, end: false, length: false, matches: [] },
				replace_result: '',
				// 默认的语法类型
				mode: 'javascript',
				// 编辑器实例
				coder: null,
				// 默认配置
				// 默认配置
				options: {
					// 缩进格式
					//tabSize: 2,
					// 主题，对应主题库 JS 需要提前引入
					theme: 'dracula',
					// 显示行号
					//lineNumbers: true,
					line: true
				},
				// 支持切换的语法高亮类型，对应 JS 已经提前引入
				// 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
				modes: [{
					value: 'css',
					label: 'CSS'
				}, {
					value: 'javascript',
					label: 'Javascript'
				}, {
					value: 'html',
					label: 'XML/HTML'
				}, {
					value: 'x-java',
					label: 'Java'
				}, {
					value: 'x-objectivec',
					label: 'Objective-C'
				}, {
					value: 'x-python',
					label: 'Python'
				}, {
					value: 'x-rsrc',
					label: 'R'
				}, {
					value: 'x-sh',
					label: 'Shell'
				}, {
					value: 'x-sql',
					label: 'SQL'
				}, {
					value: 'x-swift',
					label: 'Swift'
				}, {
					value: 'x-vue',
					label: 'Vue'
				}, {
					value: 'markdown',
					label: 'Markdown'
				}]
			}
		},
		methods: {
			reg_match() {
				let regex = this.buildRegex();
				if (regex === undefined) {
					dialog.showErrorBox('正则语句错误', '正则表达式错误，请检查')
					return false;
				}
				var result = this.reg_text_sour.match(regex);
				if (null == result || 0 == result.length) {
					dialog.showErrorBox('无匹配结果', '没有匹配到相关内容')
					return false;
				}
				var arr = [];
				let match = false;
				let regglobal = regex.flags.indexOf('g') != -1
				while ((match = regex.exec(this.reg_text_sour)) != null) {
					// 这对于避免零宽度匹配的无限循环是必要的
					if (match.index === regex.lastIndex) {
						regex.lastIndex++;
					}
					match.end = match.index + match[0].length
					arr.push(match)
					if (!regglobal) { break }
				}
				this.reg_matches = arr;
				let match_field = []
				if (arr.length > 0) {
					for (let index = 0; index < arr[0].length; index++) {
						let isshow = this.reg_match_field.matches.length > index ? this.reg_match_field.matches[index] : true
						match_field.push(isshow)
					}
				}
				this.reg_match_field.matches = match_field;
				document.querySelector("#reg-table li  button[data-bs-target='#reg-matches']").click()
			},
			reg_replace() {
				this.check_mactches()
				this.reg_replace_result = this.reg_text_sour.replace(this.buildRegex(), this.reg_replace_txt)
			},
			reg_make() {
				this.check_mactches()
				this.$refs.reg_make_result.make();
			},
			buildRegex() {
				try {
					let flags_checked = '';
					this.reg_flags.forEach((item) => {
						if (item.checked) {
							flags_checked += item.flag;
						}
					})
					return new RegExp(this.regex, flags_checked);
				} catch (err) {
					//错误
				}

			},
			check_mactches() {
				if (this.reg_matches == null || this.reg_matches.length == 0) {
					dialog.showErrorBox('无匹配结果', '请先执行匹配再执行该操作')

				}
			},
			reg_match_copy() {
				let copy_result = ""
				this.reg_matches.forEach((match, index) => {
					if (this.reg_match_field.index) {
						copy_result += (index + 1) + "\t"
					}
					if (this.reg_match_field.start) {
						copy_result += match.index + "\t"
					}
					if (this.reg_match_field.end) {
						copy_result += match.end + "\t"
					}

					if (this.reg_match_field.length) {
						copy_result += match[0].length + "\t"
					}
					match.forEach((group, group_index) => {
						if (this.reg_match_field.matches[group_index]) {
							copy_result += group + "\t"
						}
					})
					copy_result += "\r\n"
				})
				remote.clipboard.writeText(copy_result)

				dialog.showMessageBox({ type: 'info', buttons: ['我知道了'], title: '提示', message: '复制成功' });


			},
			reg_replace_copy() {
				remote.clipboard.writeText(this.replace_result)
				dialog.showMessageBox({ type: 'info', buttons: ['我知道了'], title: '提示', message: '复制成功' });
			},
			reg_make_copy() {
				remote.clipboard.writeText(this.$refs.reg_make_result.$el.children[0].innerText)
				dialog.showMessageBox({ type: 'info', buttons: ['我知道了'], title: '提示', message: '复制成功' });
			},
			reg_make_copy_html() {

				remote.clipboard.writeText(this.$refs.reg_make_result.$el.children[0].innerHTML)
				dialog.showMessageBox({ type: 'info', buttons: ['我知道了'], title: '提示', message: '复制成功' });
			},
			// 初始化
			_initialize() {
				// 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
				this.coder = CodeMirror.fromTextArea(this.$refs.regex, this.options)
				// 编辑器赋值
				this.coder.setValue(this.value || this.regex)

				// 支持双向绑定
				this.coder.on('change', (coder) => {
					this.code = coder.getValue()

					if (this.$emit) {
						this.$emit('input', this.regex)
					}
				})

				// 尝试从父容器获取语法类型
				if (this.language) {
					// 获取具体的语法类型对象
					let modeObj = this._getLanguage(this.language)

					// 判断父容器传入的语法是否被支持
					if (modeObj) {
						this.mode = modeObj.label
					}
				}
			},
			// 获取当前语法类型
			_getLanguage(language) {
				// 在支持的语法类型列表中寻找传入的语法类型
				return this.modes.find((mode) => {
					// 所有的值都忽略大小写，方便比较
					let currentLanguage = language.toLowerCase()
					let currentLabel = mode.label.toLowerCase()
					let currentValue = mode.value.toLowerCase()

					// 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
					return currentLabel === currentLanguage || currentValue === currentLanguage
				})
			},
			// 更改模式
			changeMode(val) {
				// 修改编辑器的语法配置
				this.coder.setOption('mode', `text/${val}`)

				// 获取修改后的语法
				let label = this._getLanguage(val).label.toLowerCase()

				// 允许父容器通过以下函数监听当前的语法值
				this.$emit('language-change', label)
			}
		},
		computed: {

		}, mounted() {
			// 初始化
			//this._initialize()
		},
	}
</script>

<style>
	body,
	html,
	.full {
		height: 100%;
		width: 100%;
	}
	.block {
		background-color: #fff;
		box-shadow: 0 1px 3px rgb(214 221 237 / 50%),
			0 1px 2px rgb(214 221 237 / 50%);
	}
	.block.block-rounded {
		border-radius: 0.25rem;
	}

	.nav-tabs-block {
		background-color: #ebecec;
		border-bottom: none;
	}

	.nav-tabs-block .nav-link {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		border-color: transparent;
		border-radius: 0;
		margin-bottom: 0;
	}

	.nav-tabs-block .nav-link:focus,
	.nav-tabs-block .nav-link:hover {
		color: #0665d0;
		background-color: #edf0f7;
		border-color: transparent;
	}

	.nav-tabs-block .nav-item.show .nav-link,
	.nav-tabs-block .nav-link.active {
		color: #343a40;
		background-color: #fff;
		border-color: transparent;
	}
	.CodeMirror {
		height: auto;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		width: 100%;
		height: 100%;
	}
	.nav-tabs-block {
		background-color: #f8f9fc;
		border-bottom: none;
	}
	#reg-main {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		padding: 10px;
		position: relative;
	}
	#reg-head {
		flex: 0 0 auto;
	}
	#reg-body {
		flex: 1 1 auto;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	#reg-body.block {
		border: 1px solid #eee;
		border-top: none;
	}
	#reg-body .tab-content,
	#reg-bode #reg-txt {
		width: 100%;
		height: 100%;
	}
	#reg-body > .tab-content {
		padding: 0.3rem;
		overflow-y: auto;
	}
	#reg-body > .tab-content > * {
		height: 100%;
	}
	.reg-mode {
		line-height: 100%;
	}
	.tab-content > .active.main-full,
	.main-full {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.main-head {
		flex: 0 0 auto;
	}
	.main-body {
		flex: 1 1 auto;
		overflow-y: auto;
	}

	.table-container {
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	/* 首列固定 */
	.table-container thead tr > th:first-child,
	.table-container tbody tr > td:first-child {
		position: sticky;
		left: 0;
		z-index: 1;
	}

	/* 表头固定 */
	.table-container thead tr > th {
		position: sticky;
		top: 0;
		z-index: 2;
		background: #fff;
	}

	/* 表头首列强制最顶层 */
	.table-container thead tr > th:first-child {
		z-index: 3;
	}
</style>
