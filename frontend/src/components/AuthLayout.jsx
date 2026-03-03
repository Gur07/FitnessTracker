
const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Centered Auth Card */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md /90 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;