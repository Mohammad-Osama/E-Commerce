import {
    Notes,
    CalendarStats,
    Gauge,
    PresentationAnalytics,
    FileAnalytics,
    Adjustments,
    Lock,
    ShoppingCart,
    Logout,
} from 'tabler-icons-react';



export const navbarAdminData = [
    { label: 'Dashboard', icon: Gauge,
  //   type: 'dashboard'
     },
    {
        label: 'Products',
        icon: ShoppingCart,
        initiallyOpened: false,
        links: [
            { label: 'Overview', route: 'overviewproducts' },
            { label: 'Add Product', route: 'addproducts' },
            { label: 'Edit Product', route: 'editproducts' },
            { label: 'Remove Product', route: 'removeproducts' },
        ],
    },
    {
        label: 'Brands',
        icon: CalendarStats,
        links: [
            { label: 'Overview', route: 'overviewbrands' },
            { label: 'Add Brand', route: 'addbrands' },
            { label: 'Edit Brand', route: 'editbrands' },
            { label: 'Remove Brand', route: 'removebrands' },
        ],
    },
    { label: 'Analytics', icon: PresentationAnalytics },
    { label: 'Contracts', icon: FileAnalytics },
    { label: 'Settings', icon: Adjustments },
    {
        label: 'Security',
        icon: Lock,
        links: [
            { label: 'Enable 2FA', route: 'Enable 2FA' },
            { label: 'Change password', route: 'Change password' },
            { label: 'Recovery codes', route: 'Recovery codes' },
        ],
    },
];