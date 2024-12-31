// eslint-disable-next-line react/prop-types
const FormRow= ({type,name , id ,defaultValue,onChange,onClick,placeholder,className,min,max,accept}) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            min={min}
            max={max}
            accept={accept}
            className={className}
            placeholder={placeholder}
            defaultValue={defaultValue || ''}
            onChange={onChange}
            onClick={onClick}
            required
        />
    )
  }
  
  export default FormRow
  