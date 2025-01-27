const LoadingScreen = () => {
    return (
      <div className="flex h-screen text-center m-auto justify-center gap-3 bg-primary50">
        <div className="m-auto">
          <div className="border-primary90 m-auto rounded-full w-10 h-10 border-[6px] mb-2 border-r-primary60 animate-spin"></div>
          <div className="text-center text-white text-xl font-medium">
            Mohon Tunggu...
          </div>
        </div>
      </div>
    );
  };
  
  export default LoadingScreen;
  