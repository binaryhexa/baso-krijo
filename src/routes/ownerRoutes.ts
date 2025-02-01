export const ownerRoute = [
    {
        name: 'Dashboard',
        path: '/'
    },
    {
        name: 'Menu',
        subItems: [
            { name: 'Daftar Menu', path: '/admin/menu' },
            { name: 'Pesanan', path: '/admin/pesanan' },
            { name: 'Manajemen Menu', path: '/admin/manajemen_menu' },
        ]
    },
    {
        name: 'Stok',
        subItems: [
            { name: 'Stok Menu', path: '/admin/stok/menu' },
            { name: 'Stok Bahan', path: '/admin/stok/bahan' },
        ]
    },
]