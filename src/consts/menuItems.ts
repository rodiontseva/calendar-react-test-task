interface MenuItem {
  page: string;
  url: string;
  icon: string;
}

export const menuItems: { [key: string]: MenuItem } = {
  home: {
    page: "Home",
    url: "/",
    icon: "../src/icons/home.svg",
  },
  dashboard: {
    page: "Dashboard",
    url: "/dashboard",
    icon: "../src/icons/dashboard.svg",
  },
  inbox: {
    page: "Inbox",
    url: "/inbox",
    icon: "../src/icons/inbox.svg",
  },
  products: {
    page: "Products",
    url: "/products",
    icon: "../src/icons/products.svg",
  },
  // {
  //   page: "Invoices",
  //   url: "/invoices",
  //   icon: "../src/icons/invoices.svg",
  //   file: React.createElement(InvoicesPage),
  // },
  // {
  //   page: "Customers",
  //   url: "/customers",
  //   icon: "../src/icons/customers.svg",
  //   file: React.createElement(CustomersPage),
  // },
  // {
  //   page: "Chat Room",
  //   url: "/chat-room",
  //   icon: "../src/icons/chat-room.svg",
  //   file: React.createElement(ChatRoomPage),
  // },
  calendar: {
    page: "Calendar",
    url: "/calendar",
    icon: "../src/icons/calendar.svg",
  },
  // {
  //   page: "Help Center",
  //   url: "/help-center",
  //   icon: "../src/icons/help-center.svg",
  //   file: React.createElement(HelpCenterPage),
  // },
  // {
  //   page: "Settings",
  //   url: "/settings",
  //   icon: "../src/icons/settings.svg",
  //   file: React.createElement(SettingsPage),
  // },
};
