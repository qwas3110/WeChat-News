Page({
  data: {
    hot: {},
		newsList: []
  },
  onLoad() {
    this.getNewsAPI();
  },
  // 调用新闻API
  getNewsAPI() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },

      success: (res) => {
        console.log(res);
        const result = res.data.result;
        const hotNews = result[8];
        // 调用数据
        this.setHotNews(hotNews);
				this.setNewsList(result);
      }
    })
  },
  // 将调用数据渲染到热门页面
  setHotNews(result) {
    let hot = {};
    hot.title = result.title;
    hot.date = result.date.slice(0, 10),
    hot.time = result.date.slice(14, 19),
    hot.source = result.source,
    hot.imgSrc = `https:${result.firstImage}`,
    hot.id = result.id
    console.log(hot);
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
				title: result[x].title,
				time: result[x].date.slice(14,19),
				source: result[x].source,
				imgSrc: `https:${result[x].firstImage}`
			})
		}
		this.setData({
			newsList: newsList
		})
	}
})