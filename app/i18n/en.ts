const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
    signUp: "Sign Up", // @demo remove-current-line
    signIn: "Sign In", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "Track your daily calorie intake and ensure nutritional balance for a healthy lifestyle.",
    readyForLaunch: "Welcome To Calo Tracker",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!", // @demo remove-current-line
  },
  updateInfoUserScreen: {
    title: "Chỉ số trao đổi chất (BMR)",
    minuteLabel: "Số phút/ngày",
    dayLabel: "Số ngày/tuần",
  },

  targetScreen: {
    title: "Mục tiêu của bạn là gì?",
    losing_weight_title: "Giảm cân",
    losing_weight_detail: "Quản lí cân nặng của bạn bằng cách ăn uống thông minh hơn",
    weight_gain_title: "Tăng cân",
    weight_gain_detail: "Tăng cân với eat clean",
    keep_stableg_weight_title: "Giữ nguyên cân nặng",
    keep_stableg_weight_detail: "Tối ưu cho sức khỏe của bạn"
  },

  statisticalScreen: {
    title: "Thống kê các chỉ số",
    losing_weight_title: "Năng lượng nạp vào để giảm cân (calo thâm hụt = TDEE - 500)"

  },

  addFoodScreen: {
    title: "Tạo thực phẩm mới",
    basicInfo: "Thông tin cơ bản",
    nutritionalInfo: "Thông tin dinh dưỡng",
  },
  addMealScreen: {
    title: "Tạo mới món ăn",
    basicInfo: "Nhập thông tin về món ăn",
    ingredientMeal: "Thành phần thực phẩm trong món ăn",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science .",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password ",
    tapToSignIn: "Tap to sign in!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  registerScreen: {
    signUp: "Sign Up",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    passwordConfirmFieldLabel: "Password Confirm",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password ",
    passwordConfirmFieldPlaceholder: "Super secret password confirm ",
    tapToSignUp: "Tap to sign up!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're  to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  settingScreen: {
    title: "Setting",
  },
  homeScreen: {
    title: "Hôm nay",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  // @demo remove-block-end
}

export default en
export type Translations = typeof en
