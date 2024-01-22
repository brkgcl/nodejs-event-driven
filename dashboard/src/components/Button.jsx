export const Button = (props) => {
  const textColor = `text-${props.textColor}`;
  const height = `${props.height ? props.height : 'h-full'}`;
  const width = `${props.width ? props.width : 'w-full'}`;
  const color = `${props.color ? props.color : 'bg-white/20'} `;
  return (
    <div
      onClick={props.onClick}
      className={`${height} ${width} ${color} ${textColor} ${props.className} flex items-center justify-center rounded-lg cursor-pointer drop-shadow-2xl shadow-lg  backdrop-blur-md `}
    >
      {props.children}
    </div>
  );
};
