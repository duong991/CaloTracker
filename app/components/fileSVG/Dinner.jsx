import React from "react"
import { Svg, Circle, Path, G } from "react-native-svg"

export const Dinner = ({ size }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Circle cx={31.995} cy={32.196} r={28.482} fill="#E76F51" />
      <Path
        fill="#F4A261"
        d="M53.328 13.335A28.479 28.479 0 1 0 23.883 59.5a60.273 60.273 0 0 0 29.445-46.165z"
      />
      <Path fill="#BFC0C0" d="M47.043 16.671v27.823h-10.5V27.173a10.5 10.5 0 0 1 10.5-10.502z" />
      <Path
        fill="#2A9D8F"
        d="M19.356 57.721a28.255 28.255 0 0 0 5.865 2.14V33.219h-5.865zM41.178 59.157a28.371 28.371 0 0 0 5.865-2.781V44.494h-5.865z"
      />
      <Path
        fill="#D9DBDB"
        d="M47.043 26.312v-9.641a10.5 10.5 0 0 0-10.5 10.5v13.9a27.113 27.113 0 0 0 10.5-14.759z"
      />
      <Path
        fill="#40BCAA"
        d="M44.111 44.494h-2.933v14.663a28.5 28.5 0 0 0 2.933-1.188zM22.286 33.219h-2.929v24.5a28.231 28.231 0 0 0 2.929 1.251z"
      />
      <G fill="#FAFFF8">
        <Path
          d="M47.043 16.872v-.2a10.5 10.5 0 0 0-10.5 10.5v17.322h2.036V27.173a10.5 10.5 0 0 1 8.464-10.301z"
          fill="#FAFFF8"
        />
        <Circle cx={41.018} cy={24.672} r={1.292} fill="#FAFFF8" />
        <Circle cx={40.624} cy={27.486} r={0.782} fill="#FAFFF8" />
      </G>
      <Path
        fill="#264653"
        d="M31.96 2.732a29.483 29.483 0 1 0 29.481 29.482A29.516 29.516 0 0 0 31.96 2.732zM20.321 34.238h3.864V58.57a27.36 27.36 0 0 1-3.864-1.47zm25.687 9.273h-8.5v-16.32a9.516 9.516 0 0 1 8.5-9.45zm0 2v10.312a27.369 27.369 0 0 1-3.865 1.909V45.511zm2 8.992V16.689a1 1 0 0 0-1-1 11.515 11.515 0 0 0-11.5 11.5v17.32a1 1 0 0 0 1 1h3.637v12.943a27.458 27.458 0 0 1-13.958.629V34.212a5.427 5.427 0 0 0 4.91-5.4V16.689h-2v12.127a3.425 3.425 0 0 1-3.42 3.422h-2.423V16.689h-2v15.549h-2.422a3.425 3.425 0 0 1-3.421-3.422V16.689h-2v12.127a5.428 5.428 0 0 0 4.91 5.4v21.843A27.487 27.487 0 1 1 48.008 54.5z"
      />
    </Svg>
  )
}