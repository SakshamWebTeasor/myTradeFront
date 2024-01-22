import { useThemeContext } from "../../../Providers/ThemeProvider";

type Props = {};

function ButtonUseContext({}: Props) {
  const { darkTheme, toggleTheme } = useThemeContext();
  return (
    <div>
      <div>ButtonUseContext</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div
        className={`flex mx-10 justify-center py-20 border-gray-600 border-2 ${
          darkTheme ? "bg-white" : "bg-black"
        }`}
      >
        {darkTheme ? (
          <button
            type="button"
            className="text-white bg-gray-800 border border-gray-600 focus:outline-none hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Dark Button
          </button>
        ) : (
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Light Button
          </button>
        )}
      </div>
    </div>
  );
}

export default ButtonUseContext;
