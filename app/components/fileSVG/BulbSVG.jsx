import React from "react"
import { Svg, Path } from "react-native-svg"
import { View } from "react-native"

const BulbSVG = ({ width = 60, height = 70 }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 4 }}>
      <Svg width={width} height={height} viewBox="0 0 72 72">
        <Path
          fill="#FFD542"
          d="M52.76 27.636a18.458 18.458 0 0 1-6.155 15.64c-1.924 1.702-3.09 4.098-3.09 6.667v.239H25.197v-.237c0-2.579-1.182-4.976-3.11-6.687a18.44 18.44 0 0 1-6.22-13.83c0-10.614 8.943-19.14 19.695-18.454 8.97.572 16.354 7.713 17.197 16.661z"
        />
        <Path
          fill="#F2C538"
          d="M51.76 23.173c-3.015-5.207-8.519-8.834-14.797-9.236-10.758-.68-19.697 7.848-19.697 18.462 0 2.22.393 4.364 1.12 6.336a18.297 18.297 0 0 1-2.517-9.303c0-10.614 8.939-19.142 19.697-18.462 7.417.479 13.753 5.436 16.193 12.203z"
        />
        <Path
          fill="#2DCEF6"
          d="M42.097 50.182v9.57a2.54 2.54 0 0 1-2.543 2.544H29.155a2.54 2.54 0 0 1-2.543-2.543v-9.571z"
        />
        <Path fill="#0E4A77" d="M29.868 62.295a4.568 4.568 0 0 0 8.973 0z" />
        <Path
          fill="#000033"
          d="M53.755 27.541c-.885-9.41-8.68-16.962-18.129-17.565a19.705 19.705 0 0 0-5.17.35 1 1 0 0 0 .398 1.96 17.686 17.686 0 0 1 4.646-.314c8.477.54 15.47 7.315 16.265 15.757.532 5.659-1.59 11.052-5.824 14.798-1.979 1.75-3.19 4.142-3.396 6.655h-4.788v-8.78a1 1 0 1 0-2 0v8.78h-2.805v-15.57h2.804v3.364a1 1 0 1 0 2 0v-3.364h1.525a3.464 3.464 0 0 0 2.448-5.917c-1.312-1.29-3.556-1.31-4.901.012a3.472 3.472 0 0 0-1.004 2.448v1.457h-2.936v-1.457c0-.92-.356-1.79-1.015-2.46-1.32-1.299-3.569-1.3-4.9.011a3.465 3.465 0 0 0 2.46 5.905h1.519v15.57h-4.785c-.207-2.509-1.426-4.906-3.415-6.671a17.504 17.504 0 0 1-5.884-13.082 17.512 17.512 0 0 1 10.436-16.012 1 1 0 0 0-.808-1.83 19.514 19.514 0 0 0-11.628 17.842c0 5.567 2.39 10.88 6.555 14.578 1.764 1.564 2.775 3.729 2.775 5.94v.236a1 1 0 0 0 1 1h.415v2.32h-1.11a1 1 0 1 0 0 2h1.11v2.118h-1.11a1 1 0 1 0 0 2h1.11v.133a3.544 3.544 0 0 0 3.504 3.538A5.568 5.568 0 0 0 34.355 67a5.57 5.57 0 0 0 5.238-3.709 3.545 3.545 0 0 0 3.504-3.538v-.133h1.11a1 1 0 1 0 0-2h-1.11V55.5h1.11a1 1 0 1 0 0-2h-1.11v-2.32h.417a1 1 0 0 0 1-1v-.238c0-2.214 1.003-4.37 2.753-5.918 4.717-4.174 7.082-10.182 6.488-16.484zm-15.931 2.614c0-.503.233-.846.418-1.034.568-.558 1.536-.539 2.073-.012.196.2.43.543.43 1.046 0 .803-.657 1.457-1.464 1.457h-1.457zm-6.936 1.457h-1.456a1.462 1.462 0 0 1-1.465-1.457c0-.503.235-.846.42-1.035a1.481 1.481 0 0 1 2.071-.011c.197.2.43.543.43 1.046zM34.355 65c-1.27 0-2.41-.672-3.044-1.705h6.087A3.574 3.574 0 0 1 34.355 65zm5.2-3.705h-10.4c-.85 0-1.542-.692-1.542-1.542v-.133h13.484c0 1.07-.734 1.675-1.543 1.675zm1.542-3.675H27.613V55.5h13.484zm0-4.118H27.613v-2.32h13.484zM10.172 16.745l3.5 2.02a1.001 1.001 0 0 0 1-1.732l-3.5-2.02a.999.999 0 1 0-1 1.732zM12.254 29.498a1 1 0 0 0-1-1h-4.04a1 1 0 1 0 0 2h4.04a1 1 0 0 0 1-1zM14.028 40.135l-3.5 2.02a1 1 0 1 0 1 1.733l3.5-2.02a1 1 0 1 0-1-1.733zM21.631 9.813c.278.481.892.64 1.366.367a.991.991 0 0 0 .394-1.286c-.027-.397-1.934-3.57-2.143-3.932a1 1 0 0 0-1.367-.366.991.991 0 0 0-.393 1.286c.027.397 1.934 3.569 2.143 3.931zM34 7.044a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0V6.044a1 1 0 0 0 1 1zM45.003 10.184a1.001 1.001 0 0 0 1.367-.367c.212-.368 2.118-3.534 2.142-3.938a.992.992 0 0 0-.392-1.287 1 1 0 0 0-1.367.367c-.212.368-2.118 3.534-2.142 3.938a.991.991 0 0 0 .392 1.287zM54.329 18.77l3.5-2.021a1 1 0 1 0-1-1.732l-3.5 2.02a1 1 0 1 0 1 1.733zM60.787 28.502h-4.041a1 1 0 1 0 0 2h4.04a1 1 0 1 0 0-2zM57.472 42.159l-3.499-2.02a1 1 0 1 0-1 1.732l3.5 2.02a1.001 1.001 0 0 0 1-1.732z"
        />
      </Svg>
    </View>
  )
}
export default BulbSVG
