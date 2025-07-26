import {Atom} from "react-loading-indicators";
import {type JSX, Suspense} from "react";

const Loading = () => {
  return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Atom color="#000000" size="large" text="" textColor="#000000"/>
      </div>
  )
}

const ContentLoading = () => {
  return (
      <div className="w-full h-full flex justify-center items-center">
        <Atom color="#000000" size="large" text="" textColor="#000000"/>
      </div>
  )
}

const SuspenseElement = ({children}: { children: JSX.Element }) => {
  return (
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
  )
}

export {Loading, SuspenseElement, ContentLoading}