
Page({
	data: {
		id: '',
		newsDetail: {},
		newsContent: []
		
	},
	onLoad(options) {
		this.setData({ id: options.id });
		this.getNewsDetail();
		
	},
	getNewsDetail() {
		wx.request({
			url: 'https://test-miniprogram.com/api/news/detail',
			data: {
				id: this.data.id
			},

			success: (res) => {
				const result = res.data.result;
				console.log(result);
				this.setBasicInfomation(result);
				this.setNewsBasicText(result);
			}
		})
	},
	// 新闻详情基本信息
	setBasicInfomation(result) {
		let newsDetail = {};
		newsDetail.title = result.title,
		newsDetail.source = result.source,
		newsDetail.id = result.id,
		newsDetail.readCount = result.readCount,
		newsDetail.firstImage = result.firstImage,
		newsDetail.date = result.date.slice(0, 9)
		
		this.setData({newsDetail:newsDetail})
	},
	// 新闻详细文本
	setNewsBasicText(result) {
		let content = result.content;
		let newsContent = content;
		this.setData({newsContent:newsContent});
	}
})