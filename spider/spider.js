const request     = require('superagent-charset')
const superagent  = request(require('superagent'))
const cheerio     = require('cheerio')
const EventProxy  = require('eventproxy')
const _           = require('lodash')
const fs          = require('fs')

// 英雄头像地址前缀
const base_avatar = 'http://ossweb-img.qq.com/images/lol/img/champion/'
const base_skin   = 'http://ossweb-img.qq.com/images/lol/web201310/skin/'
// 英雄详情地址前缀
const base_detail = 'http://lol.qq.com/biz/hero/'

const fetchDetail = (url, cb) => {
	const PrefixInteger = (num, length) => {
		return (Array(length).join('0') + num).slice(-length);
	}

	superagent
		.get(url + '.js')
		.set('Content-Type', 'application/x-javascript')
		.buffer(true)
		.end((err, res) => {
			const detail = JSON.parse(res.text.slice(res.text.indexOf('{"data"'), -1)).data

			if (!detail || err) return cb(new Error('获取英雄详情数据错误'))

			cb(null, {
				// 皮肤
				skins: Array.from({length: detail.skins.length}, (v,k) => {
					return {
						name: detail.skins[k].name,
						big: base_skin + 'big'+ detail.id + PrefixInteger(k + 1, 3) + '.jpg',
						small: base_skin + 'small'+ detail.id + PrefixInteger(k + 1, 3) + '.jpg'
					}
				}),
				// 背景故事
				lore: detail.lore
			})
		})
}

const fetchData = (cb) => {
	superagent
		.get('http://lol.qq.com/biz/hero/champion.js')
		.set('Content-Type', 'application/x-javascript')
		.buffer(true)
		.end((err, res) => {
			const ep    = new EventProxy()
			ep.fail(cb)

			const heros = JSON.parse(res.text.slice(res.text.indexOf('{"keys"'), -1)).data
			const protoArr = Object.getOwnPropertyNames(heros)

			ep.after('fetch_detail', protoArr.length, list => {
				return cb(null, list)
			})

			protoArr.forEach((val, idx, obj) => {
				let hero    = _.pick(heros[val], ['id', 'key', 'name', 'title', 'tags'])
				// 头像
				hero.avatar = base_avatar + heros[val].image.full

				fetchDetail(base_detail + hero.id, ep.done(detail => {
					hero = _.assign(hero, detail)
					ep.emit('fetch_detail', hero)
				}))
			})
			
		})
}

console.time('fetch data')

fetchData((err, heros) => {
	err ? console.err(err) 
	: fs.writeFileSync('LOLHeros.js', 'if (!LOLHeros) { var LOLHeros = ' + JSON.stringify(heros) + '; }')
})

console.timeEnd('fetch data')