export const Container = (props) => {
  const height = `${props.height ? props.height : 'h-full'}`;
  const width = `${props.width ? props.width : 'w-full'}`;
  const color = `bg-${props.color}`;
  const display = `${props.display ? props.display : 'flex'}`;
  return (
    <div
      className={`${display} ${height} ${width} ${color}  items-center justify-center  ${props.className} `}
    >
      {props.children}
    </div>
  );
};

/**
 * className="w-4/6 h-20 rounded-xl flex-col p-2"
        color="blue-300"
 */
