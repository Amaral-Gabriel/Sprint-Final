
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Sprint-Final/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Sprint-Final/home-site",
    "route": "/Sprint-Final"
  },
  {
    "renderMode": 2,
    "route": "/Sprint-Final/home-site"
  },
  {
    "renderMode": 2,
    "route": "/Sprint-Final/login"
  },
  {
    "renderMode": 2,
    "route": "/Sprint-Final/home"
  },
  {
    "renderMode": 2,
    "route": "/Sprint-Final/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/Sprint-Final/lancamentos"
  },
  {
    "renderMode": 2,
    "route": "/Sprint-Final/contato"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23746, hash: '0319745b8bd982fd1a1aeb0b4509b1a1d8a517be6468f62a099a30c08685d320', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1142, hash: '83f9d57f82f876e0595e9a634705a1f19f50bd6f6caa997ae1ffd5034a963cd6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home-site/index.html': {size: 39455, hash: '2393fe984db11e6413ef47f41e5c9b28ffebe2f0dcdc32b2137d0c16beb5c48e', text: () => import('./assets-chunks/home-site_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 38933, hash: 'a60a0c2bc792c764ffc3ea4594b75189d9e445ee0c48ff412da3b48821c4d751', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'lancamentos/index.html': {size: 49705, hash: '0a21c861bc7954adf10a8b5b065add20c1600fb6de740e1c8de7dedb4fb513ef', text: () => import('./assets-chunks/lancamentos_index_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 54304, hash: '610342c8dd339aec33a67549939b5d653a40ee4867f6f111bb891997df153ae0', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 39983, hash: 'be2d5c9b6ce66178584fa975f356e0e9f91c176a718610453e227da8c219a762', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 47635, hash: '4b1c5dcc39b999ed72a22db94f9cb10a5ab2357baad85ea99f0f9c5bc4fe11f7', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-EHUMQJKX.css': {size: 250753, hash: 'jOWDZBz5GwI', text: () => import('./assets-chunks/styles-EHUMQJKX_css.mjs').then(m => m.default)}
  },
};
