
const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-orange-400',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    return(
        <button className={`px-4 py-2 rounded-lg duration-200 ease-in hover:bg-orange-500 ${className} ${bgColor} ${textColor}`} {...props}>
            {children}
        </button>
    )
}

export default Button;