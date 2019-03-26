const stringMap = {
	'国内': 'gn',
	'国际': 'gj',
	'财经': 'cj',
	'娱乐': 'yl',
	'军事': 'js',
	'体育': 'ty',
	'其他': 'other'
}


Page({
  data: {
    hot: {},
    newsList: [],
    type: 'gn',
    typeMap: {
      'gn': '国内',
      'gj': '国际',
      'cj': '财经',
      'yl': '娱乐',
      'js': '军事',
      'ty': '体育',
      'other': '其他'
    }
  },
	// 下拉刷新
	onPullDownRefresh() {
		this.getNewsAPI(() => wx.stopPullDownRefresh());
	},

  onLoad() {
    this.getNewsAPI();
  },
  // 调用新闻API
  getNewsAPI(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },

      success: (res) => {
        const result = res.data.result;
				console.log(result);
        const hotNews = result[0];
        // 调用数据
        this.setHotNews(hotNews);
        this.setNewsList(result);
      },

			complete: () => {
				callback && callback();
			}
    })
  },
  // 将调用数据渲染到热门页面
  setHotNews(result) {
    let hot = {};
    hot.title = result.title || '未知来源';
    hot.date = result.date.slice(0, 10);
    hot.time = result.date.slice(14, 19);
    hot.source = result.source;
    hot.imgSrc = `${result.firstImage}`;
    hot.id = result.id;

    this.setData({
      hot: hot
    })
  },
  // 将调用数据渲染到新闻列表
  setNewsList(result) {
    let newsList = [];
    // 遍历数据
    for (let x = 0; x < result.length; x++) {
      newsList.push({
        id: result[x].id,
        title: result[x].title || '未知来源',
        date: result[x].date.slice(0, 10),
        source: result[x].source,
        imgSrc: `${result[x].firstImage}`
      })
    }
    this.setData({
      newsList: newsList
    })
  },
  // event.target.dataset.type'
	// 切换不同新闻类型
	onTapNews(event) {
		let type = stringMap[event.target.dataset.type];
		this.setData({type:type})
		this.getNewsAPI();
	},
	// 切换至新闻详情页面
	onTapNewsDetail(event) {
;
		let id = event.currentTarget.dataset.id;
		wx.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {},
		})
	}
})