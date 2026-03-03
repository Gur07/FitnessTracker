const InputField = ({ label, type, value, onChange, name }) => {
  return (
    <div className="mb-5">
      <label className="block text-gray-600 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value.replace(/^./, char => char.toUpperCase())}
        onChange={onChange}
        className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2 transition"
      />
    </div>
  );
};

export default InputField;