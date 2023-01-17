import React from "react"
import ContentLoader from "react-content-loader";


export const PizzaBlockSkeleton = () => (
    <ContentLoader
        className={"pizza-block"}
        speed={2}
        width={280}
        height={467}
        viewBox="0 0 280 467"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="2" y="275" rx="10" ry="10" width="278" height="26" />
        <rect x="2" y="316" rx="10" ry="10" width="274" height="82" />
        <rect x="0" y="427" rx="15" ry="15" width="91" height="30" />
        <rect x="124" y="417" rx="25" ry="25" width="153" height="47" />
        <circle cx="139" cy="138" r="120" />
    </ContentLoader>
)

