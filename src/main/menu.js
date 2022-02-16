/*
 * @Descripttion: 菜单文件
 * @Author: ITLDG
 * @Date: 2022-02-14 18:36:11
 * @LastEditors: ITLDG
 * @LastEditTime: 2022-02-14 19:20:49
 */

const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
	...(isMac
		? [
				{
					label: app.name,
					submenu: [{ label: '关于 ' + app.name, role: 'about' }, { type: 'separator' }, { label: '服务', role: 'services' }, { type: 'separator' }, { label: '隐藏 ' + app.name, role: 'hide' }, { label: '隐藏其他', role: 'hideOthers' }, { label: '全部显示', role: 'unhide' }, { type: 'separator' }, { label: '退出 ' + app.name, role: 'quit' }],
				},
		]
		: []),
	{
		label: '文件',
		submenu: [{ label: '关闭 ' + app.name, role: isMac ? 'quit' : 'close' }],
	},
	{
		label: '编辑',
		submenu: [{ label: '撤销', role: 'undo' }, { label: '恢复', role: 'redo' }, { type: 'separator' }, { label: '剪切', role: 'cut' }, { label: '复制', role: 'copy' }, { label: '粘贴', role: 'paste' }, ...(isMac ? [{ label: '粘贴并匹配样式', role: 'pasteAndMatchStyle' }] : []), { label: '删除', role: 'delete' }, { type: 'separator' }, { label: '全选', role: 'selectAll' }],
	},
	// { role: 'viewMenu' }
	{
		label: '视图',
		submenu: [{ label: '重新加载此页', role: 'reload' }, { label: '强制重新加载', role: 'forceReload' }, { label: '开发人员工具', role: 'toggleDevTools' }, { type: 'separator' }, { label: '重置缩放', role: 'resetZoom' }, { label: '放大', role: 'zoomIn' }, { label: '缩小', role: 'zoomOut' }, { type: 'separator' }, { label: '切换全屏', role: 'togglefullscreen' }],
	},
	// { role: 'windowMenu' }
	{
		label: '窗口',
		submenu: [{ label: '最小化', role: 'minimize' }, { label: '缩放', role: 'zoom' }, ...(isMac ? [{ type: 'separator' }, { label: '全部置于顶层', role: 'front' }, { type: 'separator' }, { role: 'window' }] : [{ label: '关闭', role: 'close' }])],
	},
	{
		label: '帮助',
		role: 'help',
		submenu: [
			{ label: '关于 ' + app.name, role: 'about' },
			{
				label: '开源网址',
				click: async () => {
					const { shell } = require('electron')
					await shell.openExternal('https://github.com/wanglong126/ldgtools')
				},
			},
		],
	},
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
