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
     },{
        label: 'Users',
        icon: ShoppingCart,
        initiallyOpened: false,
        links: [
            { label: 'Overview', route: 'overviewusers' },
            { label: 'Add User', route: 'adduser' },
            { label: 'Edit User', route: 'edituser' },
            { label: 'Remove User', route: 'removeuser' },
        ],
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
    },{
        label: 'Categories',
        icon: CalendarStats,
        links: [
            { label: 'Overview', route: 'overviewcategories' },
            { label: 'Add Category', route: 'addcategory' },
            { label: 'Edit Category', route: 'editcategory' },
            { label: 'Remove Category', route: 'removecategory' },
        ],
    },{
        label: 'Coupons',
        icon: CalendarStats,
        links: [
            { label: 'Overview', route: 'overviewcoupons' },
            { label: 'Add Coupon', route: 'addcoupon' },
            { label: 'Edit Coupon', route: 'editcoupon' },
            { label: 'Remove Coupon', route: 'removecoupon' },
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