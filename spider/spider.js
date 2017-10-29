const request    = require('superagent-charset')
const superagent = request(require('superagent'))
const cheerio    = require('cheerio')
const _          = require('lodash')
const fs         = require('fs')

const token      = ['39C21-9D271-D7745-29232', 'AD140-4E6BE-A0B01-D614D']
let datas        = []

const PrefixInteger = (num, length) => {
	return (Array(length).join('0') + num).slice(-length);
}

const fetchDetail = (url, cb) => {
	superagent
		.get(url)
		.set('DAIWAN-API-TOKEN', token[0])
		.end((err, res) => {
			const detail = JSON.parse(res.text)
			console.log(res.text)
			const skinBaseUrl = 'http://ossweb-img.qq.com/images/lol/web201310/skin/'
			return cb({
				// 英雄属性
				tags: detail.data.tags,
				// 皮肤
				skins: Array.from({length: detail.data.skins.length}, (v,k) => {
					return {
						name: detail.data.skins[k].name,
						big: skinBaseUrl + 'big'+ hero.id + PrefixInteger(k + 1, 3) + '.jpg',
						small: skinBaseUrl + 'small'+ hero.id + PrefixInteger(k + 1, 3) + '.jpg'
					}
				})
			})
		})
}

superagent
	.get('http://lolapi.games-cube.com/champion')
	.set('DAIWAN-API-TOKEN', token[0])
	.end((err, res) => {
		const heros = JSON.parse(res.text).data
		heros.forEach(hero => {
			let data = _.pick(hero, ['id', 'title', 'cname'])
			// 英雄头像
			data.avatar = 'http://ossweb-img.qq.com/images/lol/img/champion/' + hero.ename + '.png'

			fetchDetail('http://lolapi.games-cube.com/GetChampionDetail?champion_id=' + hero.id, detail => {
				data = _.assign(data, detail)
				datas.push(data)
			})

			fetchIrol() //获得背景说明 lol官网英雄英文名.js

		})
	})

fs.writeFileSync('datas.json', JSON.stringify(datas))
// while(true) {
// 	if(time === 0) {
// 		console.log('finnish')
// 		process.exit()
// 	}
// }
