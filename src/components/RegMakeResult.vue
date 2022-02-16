<!--
 * @Descripttion: 动态生成正则结果
 * @Author: ITLDG
 * @Date: 2022-02-12 21:56:14
 * @LastEditors: ITLDG
 * @LastEditTime: 2022-02-13 16:10:48
-->
<template >
	<div ref="reg-make-result"><div class="make-result">等待执行数据生成</div></div>
</template>

<script>
	import Vue from 'vue/dist/vue.esm.js'
	export default {
		name: 'RegMakeResult',
		props: ['tpl', 'matches'],
		mounted() {
		},
		methods: {

			make() {
				const Component = Vue.extend({
					props: ['matches'],
					template: `<div class="make-result"><template v-for="(item,index) in matches">${this.tpl}</template></div>`,


					methods: {

					},
					mounted(){
						//console.log(this.matches);
					}
				})
				const make_result = new Component({propsData:{matches:this.matches}}).$mount()

				let child = this.$refs['reg-make-result'].querySelector("*")
				if (child != null) {
					this.$refs['reg-make-result'].removeChild(this.$refs['reg-make-result'].querySelector("*"))

				}
				this.$refs['reg-make-result'].appendChild(make_result.$el)
			}
		}
	}
</script>
<style>
.make-result{
	height: 100%;
	border: 1px solid #eee;
	border-radius: 0.25rem;
}
</style>