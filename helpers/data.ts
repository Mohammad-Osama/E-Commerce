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
            { label: 'Overview Users', route: 'overviewusers' },
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
            { label: 'Overview Products', route: 'overviewproducts' },
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


export const about ={ desc:`Its a E-commerce app with a simple ui, built from scratch using the Mern stack ,Redux toolkit , Typescript and Mantine liberary.
                            \nTwo types of users can interact with it (user and admin) and each has their own pages.` ,
                      features:`\u2022 Home page sorted by categories,with on-sale and featured at the top
                                \n\u2022 A full detailed page of the product when clicking the product picture
                                \n\u2022 Add/Decrease/Remove products from cart
                                \n\u2022 Notifications when interacting with the cart
                                \n\u2022 Search products by name
                                \n\u2022 View products by cateogry/brand
                                \n\u2022 A drawer that displays the cart
                                \n\u2022 Authentication
                                \n\u2022 Notification with failed login
                                \n\u2022 Add review/rating
                                \n\u2022 User profile
                                \n\u2022 Error page
                                \n\u2022 Add Products/Categories/Brands 
                                \n\u2022 Notifictions/Modal when adding 
                                \n\u2022 View all users
                                \n\u2022 Light/Dark mode`  ,    
                      user:`\u2013 Doesnt require a login :
                            \n\u2022 browse the application
                            \n\u2022 add/remove from cart 
                            \n\u2013 Requires a login :
                            \n\u2022 user profile
                            \n\u2022 checkout
                            \n\u2022 add review/rating`,

                      admin:`\u2022 Add Products/Categories/Brands
                             \n\u2022 View all users
                             \n\u2022 Code is required (contact me !)  `  ,
                      accounts:`Register with an email and password or use one of the saved accounts
                                \n\u2013  email  :  password
                                \n\u2022 a   :  a 
                                \n\u2022 b   :  b   
                                \n Only one account for the admin 
                                \n\u2022 admin@admin.com  :  admin `  ,
                      issues:`\u2022 error page apears for a split second after login ` ,
                      plans:`\u2022 migrate to Next.js
                             \n\u2022 user- checkout page
                             \n\u2022 user- responsive dashboard
                             \n\u2022 user- burgermenu items 
                             \n\u2022 admin- edit side navbar
                             \n\u2022 admin- search users
                             \n\u2022 admin- resposvie overview users ` ,  
                        
                        
                        }