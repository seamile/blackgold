const HOST = 'album.seamile.cn';

function makeURL(module, action) {
  return `https://${HOST}/wp-json/jiangqie/v1/${module}/${action}`;
}

function makeRes(res, name) {
  return `https://${HOST}/wp-content/plugins/jiangqie-api/public/${res}/${name}`;
}

// 获取首页配置
export const JIANGQIE_SETTING_HOMEBZ = makeURL('setting', 'homebz');
// 获取热门配置
export const JIANGQIE_SETTING_HOT = makeURL('setting', 'hot');
// 获取分类配置
export const JIANGQIE_SETTING_CATEGORY = makeURL('setting', 'category');
// 获取我的配置
export const JIANGQIE_SETTING_UCENTER = makeURL('setting', 'ucenter');
// 获取分类 只获取一级分类
export const JIANGQIE_CATEGORY_INDEX = makeURL('category', 'index');
// 获取流量主配置
export const JIANGQIE_SETTING_AD = makeURL('setting', 'advertisement');
// 获取分享配置
export const JIANGQIE_SETTING_SHARE = makeURL('setting', 'share');
// 获取最新文章列表
export const JIANGQIE_POSTS_LAST = makeURL('posts', 'last');
// 获取某个分类下文章
export const JIANGQIE_POSTS_CATEGORY = makeURL('posts', 'category');
// 获取某个TAG下文章
export const JIANGQIE_POSTS_TAG = makeURL('posts', 'tag');
// 获取热门文章列表
export const JIANGQIE_POSTS_HOT = makeURL('posts', 'hot');
// 搜索文章
export const JIANGQIE_POSTS_SEARCH = makeURL('posts', 'search');
// 热门搜索
export const JIANGQIE_POSTS_SEARCH_HOT = makeURL('posts', 'search/hot');
// [我的]文章
export const JIANGQIE_POSTS_MY = makeURL('posts', 'my');
// 获取文章详情
export const JIANGQIE_POST_DETAIL = makeURL('posts', 'detail');
// 获取页面详情
export const JIANGQIE_POST_PAGE = makeURL('posts', 'page');
// 获取小程序码
export const JIANGQIE_POST_WXACODE = makeURL('posts', 'wxacode');
// 用户登录
export const JIANGQIE_USER_LOGIN = makeURL('user', 'login2');
// 用户数据
export const JIANGQIE_USER_INDEX = makeURL('user', 'index')
// 用户 点赞文章
export const JIANGQIE_USER_LIKE = makeURL('user', 'like');
// 用户 收藏文章
export const JIANGQIE_USER_FAVORITE = makeURL('user', 'favorite');
export const JIANGQIE_BG_MY = makeRes('images', 'my_bg.png');
export const JIANGQIE_BG_CATEGORY = makeRes('images', 'cat_bg.png');
export const JIANGQIE_CAT_COVER = makeRes('images', 'cat_cover.png');