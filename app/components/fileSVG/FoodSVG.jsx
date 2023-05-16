import React from "react"
import { Svg, Path } from "react-native-svg"
import { View } from "react-native"

export const FoodSVG = ({ size, isPick = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 4 }}>
      <Svg width={size} height={size} viewBox="0 0 512 512">
        <Path
          fill={isPick ? "#b09645" : "#153d54"}
          d="M256 114c-78.299 0-142 63.701-142 142s63.701 142 142 142 142-63.701 142-142-63.701-142-142-142zm0 264c-67.271 0-122-54.729-122-122s54.729-122 122-122 122 54.729 122 122-54.729 122-122 122zM506.691 1.168a10.006 10.006 0 0 0-10.29.545C447.309 34.884 418 90.06 418 149.309v129.752c0 13.917 5.42 27.001 15.26 36.842l18.74 18.74V482c0 16.542 13.458 30 30 30s30-13.458 30-30V10c0-3.699-2.042-7.096-5.309-8.832zM492 482c0 5.514-4.486 10-10 10s-10-4.486-10-10V330.5c0-2.652-1.054-5.195-2.929-7.071l-21.669-21.669c-6.063-6.063-9.402-14.124-9.402-22.699V149.309c0-45.98 19.881-89.194 54-119.012V482z"
        />
        <Path
          fill={isPick ? "#b09645" : "#153d54"}
          d="M233.058 176.693c-2.168-5.079-8.046-7.438-13.124-5.271A91.841 91.841 0 0 0 164.075 256c0 5.522 4.477 10 10 10s10-4.478 10-10a71.866 71.866 0 0 1 43.712-66.183c5.079-2.168 7.439-8.044 5.271-13.124zM256 164.075l-.505.001c-5.523.037-9.97 4.544-9.933 10.067.037 5.5 4.507 9.933 9.999 9.933h.068l.371-.001c5.523 0 10-4.477 10-10s-4.477-10-10-10zM394.623 124.479c-17.668-18.616-38.494-33.264-61.899-43.536-24.236-10.636-50.05-16.029-76.724-16.029-30.48 0-59.616 6.966-86.598 20.706-4.921 2.506-6.88 8.527-4.374 13.449 2.507 4.92 8.528 6.878 13.45 4.373C202.622 91.148 228.704 84.914 256 84.914c47.396 0 91.475 18.94 124.116 53.333a9.97 9.97 0 0 0 7.255 3.116 9.964 9.964 0 0 0 6.882-2.747c4.006-3.802 4.171-10.131.37-14.137zM404.331 360.379c-4.333-3.424-10.621-2.689-14.046 1.643-32.693 41.35-81.638 65.064-134.285 65.064-32.95 0-64.937-9.384-92.503-27.138-4.642-2.991-10.832-1.65-13.822 2.992-2.99 4.644-1.65 10.832 2.993 13.822C183.47 436.6 219.202 447.085 256 447.085c58.8 0 113.463-26.483 149.973-72.66 3.425-4.331 2.691-10.62-1.642-14.046zM135.958 377.924l-.147-.169c-.053-.065-.106-.131-.161-.195-3.557-4.226-9.865-4.766-14.09-1.21-4.225 3.558-4.767 9.865-1.209 14.091l.097.115.005-.004c.106.134.216.268.33.4a9.976 9.976 0 0 0 7.592 3.486 9.961 9.961 0 0 0 6.509-2.412c4.19-3.598 4.671-9.911 1.074-14.102zM124 0c-5.523 0-10 4.477-10 10v108H95.992c.001-.056.008-.11.008-.167V10c0-5.523-4.477-10-10-10S76 4.477 76 10v107.833c0 .056.008.111.008.167H57.992c.001-.056.008-.11.008-.167V10c0-5.523-4.477-10-10-10S38 4.477 38 10v107.833c0 .056.008.111.008.167H20V10c0-5.523-4.477-10-10-10S0 4.477 0 10v122c0 24.53 14.884 46.669 37 56.239V482c0 16.542 13.458 30 30 30s30-13.458 30-30V188.239c22.116-9.57 37-31.709 37-56.239V10c0-5.523-4.477-10-10-10zM84.224 171.62A10 10 0 0 0 77 181.227V482c0 5.514-4.486 10-10 10s-10-4.486-10-10V181.227a10 10 0 0 0-7.224-9.607c-15.583-4.503-26.981-17.879-29.324-33.62h93.095c-2.342 15.741-13.74 29.117-29.323 33.62z"
        />
      </Svg>
    </View>
  )
}
