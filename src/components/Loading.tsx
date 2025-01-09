const Loading = () => {
  return (
    <div className="flex text-center justify-center gap-3">
      <div className="border-primary100 rounded-full w-6 h-6 border-2 border-r-primary50 animate-spin"></div>
      <div className="text-center">Mohon Tunggu...</div>
    </div>
  );
};

export default Loading;
