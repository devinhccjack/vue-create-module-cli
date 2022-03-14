
const menu = ['系统概况', '运维监控', '物理网络', '虚拟网络', '网络服务', '系统管理']
export const menuList = [
    {
        name: '系统概况',
        path: '/wl',
        pid: 0,
        meta: {
            icon:''
        },
        childrens:[
            // $f0
        ]
    },

    {
        name: '运维监控',
        path: '/wl',
        pid: 1,
        meta: {
            icon:''
        },
        childrens:[
            // $f1
        ]
    },
    {
        name: '物理网络',
        path: '/wl',
        pid: 2,
        meta: {
            icon:''
        },
        childrens:[
            // $f2
        ]
    },
    {
        name: '虚拟网络',
        path: '/wl',
        pid: 3,
        meta: {
            icon:''
        },
        childrens:[
            // $f3
        ]
    },
    {
        name: '网络服务',
        path: '/wl',
        pid: 4,
        meta: {
            icon:''
        },
        childrens:[
                            {
                    name: '测试一',
                    link: '/home/test12',
                    meta: {
                        role: ['admin', 'user']
                    }
                },
                {
                    name: '测试一',
                    link: '/home/test13',
                    meta: {
                        role: ['admin', 'user']
                    }
                },
// $f4
        ]
    },
    {
        name: '系统管理',
        path: '/wl',
        pid: 5,
        meta: {
            icon:''
        },
        childrens:[
            // $f5
        ]
    }
]

