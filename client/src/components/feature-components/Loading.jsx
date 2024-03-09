const Loading = () => {
    return (
      <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50`}>
        <div className="loader"></div>
      </div>
    );
  };
  
  export default Loading;