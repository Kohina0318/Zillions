import FA from 'react-native-vector-icons/FontAwesome';
import EP from 'react-native-vector-icons/Entypo';
import SLI from 'react-native-vector-icons/SimpleLineIcons';
import FE from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

export const data = [
  {
    name: 'Edit Profile',
    icon: <MCI name="account-edit-outline" size={23} />,
    onpress: "EditProfile"
  },
  {
    name: 'Change Password',
    icon: <FA name="edit" size={21} />,
    onpress: "ChangePassword"
  },
  {
    name: 'Manage Address',
    icon: <EP name="location" size={20} />,
    onpress: "Address"
  },
  {
    name: 'My Wishlist',
    icon: <FA name="heart-o" size={20} />,
    onpress: 'WishList'
  },
  {
    name: 'My Order',
    icon: <SLI name="handbag" size={20} />,
    onpress: 'Order'
  },
  // {
  //   name: 'Return Order',
  //   icon: <MCI name="cart-arrow-up" size={22} />,
  //   onpress: ""
  // },
  {
    name: 'Support Ticket',
    icon: <FA name="file-text-o" size={19} />,
    onpress: "SupportTicket"
  },
  {
    name: 'RFQ Upload',
    icon: <FE name="upload" size={20} />,
    onpress: 'RFQUpload'
  },
  {
    name: 'FeedBack',
    icon: <MI name="info-outline" size={20} />,
    onpress: 'Feedback'
  },
  {
    name: 'Bulk Order Enquiry',
    icon: <MCI name="message-question-outline" size={20} />,
    onpress: 'BulkOrderEnquiry'
  },
];

export const data1 = [

  {
    name: 'RFQ Upload',
    onpress: 'RFQUpload'
  },
  {
    name: 'FeedBack',
    onpress: 'Feedback',
  },
  {
    name: 'Bulk Order Enquiry',
    onpress: 'BulkOrderEnquiry'
  },
  {
    name: 'Blog',
    Link: 'https://www.zillionsbuyer.com/blog/',
  },
  {
    name: 'About us',
    Link: 'https://www.zillionsbuyer.com/home/about_Us',
  },
  {
    name: 'FAQ',
    Link: 'https://www.zillionsbuyer.com/home/faq',
  },
  {
    name: 'Terms & Conditions',
    Link: 'https://www.zillionsbuyer.com/home/legal/terms_conditions',
  },
  {
    name: 'Privacy policy',
    Link:'https://www.zillionsbuyer.com/home/legal/privacy_policy',
  },
  {
    name: 'Return policy',
    Link:'https://www.zillionsbuyer.com/home/page/return-exchange-policy',
  },
  {
    name: 'Sitemap',
    Link: 'https://www.zillionsbuyer.com/#',
  },
];
