import {
    CalendarStats,
    Gauge,
    PresentationAnalytics,
    FileAnalytics,
    Adjustments,
    Lock,
    ShoppingCart,
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
            { label: 'Add Product', route: 'addproduct' },
            { label: 'Edit Product', route: 'editproduct' },
            { label: 'Remove Product', route: 'removeproduct' },
        ],
    },
    {
        label: 'Brands',
        icon: CalendarStats,
        links: [
            { label: 'Overview', route: 'overviewbrands' },
            { label: 'Add Brand', route: 'addbrand' },
            { label: 'Edit Brand', route: 'editbrand' },
            { label: 'Remove Brand', route: 'removebrand' },
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