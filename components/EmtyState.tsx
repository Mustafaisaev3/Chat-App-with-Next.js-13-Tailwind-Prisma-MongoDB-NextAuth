const EmptyState = () => {
    return ( 
      <div 
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 h-full flex justify-center items-center bg-[#2a2a2a]
        "
      >
        <div className="text-center items-center flex flex-col">
          <h3 className="mt-2 text-2xl font-semibold text-[#367b71]">
            Select a chat or start a new conversation
          </h3>
        </div>
      </div>
    );
  }
   
  export default EmptyState;