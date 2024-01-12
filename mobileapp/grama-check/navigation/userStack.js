// import React from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useFonts } from 'expo-font';
// import { UserContext, user } from '../context/UserContext';
// import * as Screens from '../screens';
// import { auth } from '../utils/firebase';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import ENV from '../constants/env';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (
//       await Notifications.getExpoPushTokenAsync({
//         projectId: '588dd011-7de9-4aa4-be5b-1e6d216ec6d8',
//       })
//     ).data;
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#10AB68CC',
//     });
//   }

//   return token;
// }

// const Stack = createNativeStackNavigator();

// export default function App(props) {
//   const [expoPushToken, setExpoPushToken] = React.useState('');
//   const [notification, setNotification] = React.useState(false);
//   const notificationListener = React.useRef();
//   const responseListener = React.useRef();
//   React.useEffect(() => {
//     registerForPushNotificationsAsync()
//       .then((token) => {
//         console.log(token);
//         if (token) {
//           return fetch(ENV.backend + '/customer/update-push-token', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: props.user.accessToken,
//             },
//             body: JSON.stringify({
//               pushToken: token,
//             }),
//           }).then((res) =>
//             res
//               .json()
//               .then((res) => console.log(res))
//               .catch((err) => console.log(err))
//           );
//         }
//         return null;
//       })
//       .catch((err) => console.log(err));

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);
//   const [fonts] = useFonts({
//     Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
//     PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
//     PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
//   });
//   if (!fonts) return null;
//   const defaultParams = {
//     auth: props.user.accessToken,
//     userEmail: props.user.email,
//   };
//   return (
//     <UserContext.Provider value={null}>
//       <NavigationContainer>
//         <StatusBar barStyle='dark-content' />
//         <Stack.Navigator
//           screenOptions={{ headerShown: false, animation: 'none' }}
//         >
//           <Stack.Screen
//             name='Location'
//             component={Screens.LocationScreen}
//             options={{ headerShown: false }}
//             initialParams={{
//               ...defaultParams,
//               orderId: '648017f45ed6e07fdd85bb5c',
//               purl: 'sri_lankan_mango_640f50d7c36e0ee998dcbca9',
//             }}
//           />
//           <Stack.Screen
//             name='Product Home Page'
//             component={Screens.ProductHomePageScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Delete Product'
//             component={Screens.DeleteProductScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Farmer Report'
//             component={Screens.FarmerReportScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Social Corner'
//             component={Screens.SocialCornerScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />

//           <Stack.Screen
//             name='Farmer Dashboard'
//             component={Screens.FarmerDashboardScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Customer Dashboard'
//             component={Screens.CustomerDashboardScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Payment'
//             component={Screens.PaymentScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Other Payment'
//             component={Screens.OtherPaymentScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Farmer Balance'
//             component={Screens.FarmerBalancesScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Configure Bank'
//             component={Screens.AddBankAccountScreen}
//             initialParams={defaultParams}
//           />

//           <Stack.Screen
//             name='Confirm Pickup'
//             component={Screens.ConfirmPickupScreen}
//             initialParams={defaultParams}
//             options={{
//               animation: 'slide_from_bottom',
//             }}
//           />
//           <Stack.Screen
//             name='Orders List'
//             component={Screens.OrderListScreen}
//             initialParams={{ ...defaultParams, initialTab: 'all' }}
//           />
//           <Stack.Screen
//             name='Order Status Update'
//             component={Screens.OrderStatusUpdateScreen}
//             initialParams={{
//               ...defaultParams,
//               orderId: '6480039d9a0f5ec665018986',
//             }}
//           />
//           <Stack.Screen
//             name='Farmer Payout Requests'
//             component={Screens.PayoutRequestListScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Farmer Invoices'
//             component={Screens.FarmerInvoicesScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Farmer Invoice'
//             component={Screens.FarmerInvoiceScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Order Details'
//             component={Screens.OrderStatusScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Notifications'
//             component={Screens.NotificationScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Card Management'
//             component={Screens.CardScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Add Card'
//             component={Screens.AddCardScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Add New Card'
//             component={Screens.OtherPaymentScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Insert Product'
//             component={Screens.InsertProductScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Manage Product'
//             component={Screens.EorDProductScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Edit Product'
//             component={Screens.EditProductScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='productupdated'
//             component={Screens.ProductUpdatedScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='productAddedSuccessfully'
//             component={Screens.ProductAddedScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Order Cancel Screen'
//             component={Screens.OrderCancelScreen}
//             initialParams={defaultParams}
//             options={{
//               animation: 'slide_from_bottom',
//             }}
//           />
//           <Stack.Screen
//             name='Payout Request Screen'
//             component={Screens.ConfirmRequestWithdrawalScreen}
//             initialParams={defaultParams}
//             options={{
//               animation: 'slide_from_bottom',
//             }}
//           />
//           <Stack.Screen
//             name='Help Center'
//             component={Screens.HelpCenterScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Cant sign in'
//             component={Screens.CantSignInScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Food Damaged'
//             component={Screens.FoodDamagedScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Select the Order'
//             component={Screens.SelectOrderScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Help with an order'
//             component={Screens.HelpWithAnOrderScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Order Naver Arrived'
//             component={Screens.OrderNeverArrivedScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Order is Wrong'
//             component={Screens.OrderIsWrong}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Order Details Help Center'
//             component={Screens.HelpWithAnOrderScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Create Coupon'
//             component={Screens.CreateCouponScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Contact Us'
//             component={Screens.ContactUsScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Ticket Details'
//             component={Screens.TicketDetailsScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Ticket Status'
//             component={Screens.TicketStatusScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Cart'
//             component={Screens.MyCartScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Chat'
//             component={Screens.Chat}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Checkout'
//             component={Screens.CheckoutScreen}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Wishlist'
//             component={Screens.WishListScreen}
//             initialParams={defaultParams}
//           />

//           <Stack.Screen
//             name='Message'
//             component={Screens.MessageScreen}
//             options={{
//               animation: 'slide_from_bottom',
//             }}
//           />

//           <Stack.Screen
//             name='Phone Verification'
//             component={Screens.PhoneVerificationScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Product Detail'
//             component={Screens.ProductDetailScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Farmer Detail'
//             component={Screens.FarmerDetailScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Farmer Follower Page'
//             component={Screens.FarmerFollowerScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Location Screen'
//             component={Screens.LocationScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Settle Account'
//             component={Screens.SettleAccountScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Other Farmer Payment'
//             component={Screens.OtherFarmerPaymentScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Add Location Screen'
//             component={Screens.LocationAddScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Order Review page'
//             component={Screens.OrderReviewScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Report Farmer page'
//             component={Screens.ReportFarmerScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           <Stack.Screen
//             name='Reviewed Order page'
//             component={Screens.ReviewedOrderScreen}
//             options={{
//               headerShown: false,
//             }}
//             initialParams={defaultParams}
//           />
//           {/* <Stack.Screen
//             name='login'
//             component={Screens.LoginScreen}
//             options={{
//               headerShown: false,
//             }}
//           /> */}

//           {/* <Stack.Screen
//             name='Email Verification'
//             component={Screens.EmailVerificationScreen}
//             options={{
//               headerShown: false,
//             }}
//           /> */}
//           {/* <Stack.Screen
//             name='EmailVerify'
//             component={Screens.VerifyEmailScreen}
//             options={{
//               headerShown: false,
//             }}
//           /> */}

//           {/* <Stack.Screen
//             name='GetStartedScreen'
//             component={Screens.GetStartedScreen}
//             initialParams={{
//               userEmail: userEmail,
//             }}
//           /> */}

//           {/* <Stack.Screen
//             name='Checkout'
//             component={Screens.LoginScreen}
//             initialParams={{
//               // purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
//               // purl: 'nuwara_eliya_strawberries_63b6b7b160d78bea22456aa8',
//               purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
//               userEmail: userEmail,
//               initialTab: 'toPay',
//             }}
//           /> */}

//           {/* <Stack.Screen name='Payment' component={Screens.PaymentScreen} />
//           <Stack.Screen
//             name='Farmer Dashboard'
//             component={Screens.FarmerDashboardScreen}
//             initialParams={{
//               userEmail: userEmail,
//             }}
//           /> */}

//           {/* <Stack.Screen
//             name='Sign Up'
//             component={Screens.SignUpScreen}
//             options={{
//               headerShown: false,
//             }}
//           /> */}
//           {/* <Stack.Screen
//             name='createPassword'
//             component={Screens.PasswordCreationScreen}
//             options={{
//               headerShown: false,
//             }}
//           /> */}
//           {/* <Stack.Screen
//             name='beFarmer'
//             component={Screens.BeFarmerScreen}
//             options={{
//               headerShown: false,
//             }}
//           /> */}
//           {/* <Stack.Screen
//             name='FarmerCreateAccount'
//             component={Screens.FarmerCreateAccountScreen}
//             options={{
//               headerShown: false,
//             }}
//           /> */}
//           {/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </UserContext.Provider>
//   );
// }
