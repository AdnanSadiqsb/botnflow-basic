import React, { useContext } from 'react'
import {
    CreditCard as CreditCardIcon,
    Comment as CommentIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

function Billing() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)

    return (
        <div>
            <div className="space-y-6">
                {/* Billing Overview */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="md:flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Billing & Usage</h2>
                                <p className="text-gray-600 dark:text-gray-300">Manage your subscription and billing information</p>
                            </div>
                            <div className="flex items-center space-x-3 mt-3 md:mt-0">
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full dark:bg-green-900 dark:text-green-200">
                                    Pro Plan
                                </span>
                                <button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    style={{ backgroundColor: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = themeColor;
                                    }}>
                                    <CreditCardIcon className="mr-2" />
                                    Add Credits
                                </button>
                            </div>
                        </div>

                        {/* Current Usage */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">SMS Messages</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">8,542</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">of 10,000 used</p>
                                    </div>
                                    <div className="text-blue-600 dark:text-blue-400">
                                        <CommentIcon className="text-2xl" />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">WhatsApp Messages</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">2,156</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">of 5,000 used</p>
                                    </div>
                                    <div className="text-green-600 dark:text-green-400">
                                        <CommentIcon className="text-2xl" />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '43%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Email Messages</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">12,847</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">of 25,000 used</p>
                                    </div>
                                    <div className="text-blue-600 dark:text-blue-400">
                                        <EmailIcon className="text-2xl" />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '51%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Plans */}
                <div class="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-800 mb-6">Choose Your Plan</h3>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="border-2 border-gray-200 rounded-lg p-6 relative">
                                <div class="text-center">
                                    <h4 class="text-lg font-semibold text-gray-900">Starter</h4>
                                    <div class="mt-4">
                                        <span class="text-4xl font-bold text-gray-900">$29</span>
                                        <span class="text-gray-500">/month</span>
                                    </div>
                                    <p class="mt-2 text-sm text-gray-500">Perfect for small businesses</p>
                                </div>

                                <ul class="mt-6 space-y-3">
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">5,000 SMS messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">2,000 WhatsApp messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">10,000 Email messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">Basic integrations</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">Email support</span>
                                    </li>
                                </ul>

                                <button class="w-full mt-6 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    Select Plan
                                </button>
                            </div>

                            <div class="border-2 border-primary-600 rounded-lg p-6 relative">
                                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span class="bg-primary-600 text-white px-3 py-1 text-xs font-medium rounded-full">Current Plan</span>
                                </div>

                                <div class="text-center">
                                    <h4 class="text-lg font-semibold text-gray-900">Pro</h4>
                                    <div class="mt-4">
                                        <span class="text-4xl font-bold text-gray-900">$99</span>
                                        <span class="text-gray-500">/month</span>
                                    </div>
                                    <p class="mt-2 text-sm text-gray-500">Best for growing businesses</p>
                                </div>

                                <ul class="mt-6 space-y-3">
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">10,000 SMS messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">5,000 WhatsApp messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">25,000 Email messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">All integrations</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">Priority support</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">Advanced analytics</span>
                                    </li>
                                </ul>

                                <button class="w-full mt-6 py-2 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    style={{ backgroundColor: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = themeColor;
                                    }}>
                                    Current Plan
                                </button>
                            </div>

                            <div class="border-2 border-gray-200 rounded-lg p-6 relative">
                                <div class="text-center">
                                    <h4 class="text-lg font-semibold text-gray-900">Enterprise</h4>
                                    <div class="mt-4">
                                        <span class="text-4xl font-bold text-gray-900">$299</span>
                                        <span class="text-gray-500">/month</span>
                                    </div>
                                    <p class="mt-2 text-sm text-gray-500">For large organizations</p>
                                </div>

                                <ul class="mt-6 space-y-3">
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">50,000 SMS messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">25,000 WhatsApp messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">100,000 Email messages</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">Custom integrations</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">24/7 phone support</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fa-solid fa-check text-green-500 mr-3"></i>
                                        <span class="text-sm text-gray-700">Dedicated account manager</span>
                                    </li>
                                </ul>

                                <button class="w-full mt-6 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method & Invoices */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-medium text-gray-800">Payment Method</h3>
                                <button class=" text-sm font-medium"
                                    style={{ color: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = themeColor;
                                    }}>
                                    Update
                                </button>
                            </div>

                            <div class="flex items-center p-4 border rounded-lg">
                                <div class="flex-shrink-0">
                                    <i class="fa-brands fa-cc-visa text-2xl text-blue-600"></i>
                                </div>
                                <div class="ml-4">
                                    <p class="font-medium text-gray-900">•••• •••• •••• 4242</p>
                                    <p class="text-sm text-gray-500">Expires 12/25</p>
                                </div>
                                <div class="ml-auto">
                                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                        Default
                                    </span>
                                </div>
                            </div>

                            <div class="mt-4">
                                <p class="text-sm text-gray-600">Next billing date: <span class="font-medium">January 15, 2024</span></p>
                                <p class="text-sm text-gray-600">Amount: <span class="font-medium">$99.00</span></p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-medium text-gray-800">Recent Invoices</h3>
                                <button class="text-sm font-medium"
                                    style={{ color: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = themeColor;
                                    }}>
                                    View All
                                </button>
                            </div>

                            <div class="space-y-3">
                                <div class="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p class="font-medium text-gray-900">
                                            <span class="text-sm text-gray-500">Jan 15, 2024</span>
                                        </p>
                                        <p class="text-sm text-gray-500">Pro Plan - $99.00</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-gray-500">Paid</p>
                                        <p class="text-sm text-gray-500">Status: <span class="font-medium">Paid</span></p>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p class="font-medium text-gray-900">
                                            <span class="text-sm text-gray-500">Dec 15, 2023</span>
                                        </p>
                                        <p class="text-sm text-gray-500">Pro Plan - $99.00</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-gray-500">Paid</p>
                                        <p class="text-sm text-gray-500">Status: <span class="font-medium">Paid</span></p>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p class="font-medium text-gray-900">
                                            <span class="text-sm text-gray-500">Nov 15, 2023</span>
                                        </p>
                                        <p class="text-sm text-gray-500">Pro Plan - $99.00</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-gray-500">Paid</p>
                                        <p class="text-sm text-gray-500">Status: <span class="font-medium">Paid</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing
