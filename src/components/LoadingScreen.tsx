const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-2xl font-bold text-white mb-2">Loading ProcureQuest</h2>
      <p className="text-blue-300">Preparing your procurement challenge...</p>
    </div>
  );
};

export default LoadingScreen;